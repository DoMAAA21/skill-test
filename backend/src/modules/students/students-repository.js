const { processDBRequest } = require("../../utils");

const getRoleId = async (roleName) => {
    const query = "SELECT id FROM roles WHERE name ILIKE $1";
    const queryParams = [roleName];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0].id;
}

const findAllStudents = async (payload) => {
    const { name, className, section, roll } = payload;
    let query = `
        SELECT
            t1.id,
            t1.name,
            t1.email,
            t1.last_login AS "lastLogin",
            t1.is_active AS "systemAccess"
        FROM users t1
        LEFT JOIN user_profiles t3 ON t1.id = t3.user_id
        WHERE t1.role_id = 3`;
    let queryParams = [];
    if (name) {
        query += ` AND t1.name = $${queryParams.length + 1}`;
        queryParams.push(name);
    }
    if (className) {
        query += ` AND t3.class_name = $${queryParams.length + 1}`;
        queryParams.push(className);
    }
    if (section) {
        query += ` AND t3.section_name = $${queryParams.length + 1}`;
        queryParams.push(section);
    }
    if (roll) {
        query += ` AND t3.roll = $${queryParams.length + 1}`;
        queryParams.push(roll);
    }

    query += ' ORDER BY t1.id';

    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

const addOrUpdateStudent = async (payload) => {
    const query = "SELECT * FROM student_add_update($1)";
    const queryParams = [payload];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const addStudent = async (payload) => {
  const {
    name,
    gender,
    phone,
    email,
    className,
    section,
    roll,
    current_address,
    permanent_address,
    father_name,
    father_phone,
    guardian_name,
    guardian_phone,
    relation_of_guardian,
  } = payload;

  // Insert into users table
  const userQuery = `
    INSERT INTO users (name, email, is_active, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
  const userParams = [name, email, true, 3];
  const { rows: userRows } = await processDBRequest({ query: userQuery, queryParams: userParams });

  const user_id = userRows[0]?.id;
  if (!user_id) {
    return { status: false, message: "Failed to create user record." };
  }

  // Insert into students table
  const studentQuery = `
    INSERT INTO students (
      user_id,
      gender,
      phone,
      class,
      section,
      roll,
      current_address,
      permanent_address,
      father_name,
      father_phone,
      guardian_name,
      guardian_phone,
      relation_of_guardian
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id;
  `;
  const studentParams = [
    user_id,
    gender,
    phone,
    className,
    section,
    roll,
    current_address,
    permanent_address,
    father_name,
    father_phone,
    guardian_name,
    guardian_phone,
    relation_of_guardian
  ];

  const { rows: studentRows } = await processDBRequest({ query: studentQuery, queryParams: studentParams });
  const student_id = studentRows[0]?.id;

  if (!student_id) {
    return { status: false, message: "Failed to create student record." };
  }

  return {
    status: true,
    userId: user_id,
    studentId: student_id
  };
};




const findStudentDetail = async (id) => {
    const query = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.is_active AS "systemAccess",
            p.phone,
            p.gender,
            p.dob,
            p.class_name AS "class",
            p.section_name AS "section",
            p.roll,
            p.father_name AS "fatherName",
            p.father_phone AS "fatherPhone",
            p.mother_name AS "motherName",
            p.mother_phone AS "motherPhone",
            p.guardian_name AS "guardianName",
            p.guardian_phone AS "guardianPhone",
            p.relation_of_guardian as "relationOfGuardian",
            p.current_address AS "currentAddress",
            p.permanent_address AS "permanentAddress",
            p.admission_dt AS "admissionDate",
            r.name as "reporterName"
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        LEFT JOIN users r ON u.reporter_id = r.id
        WHERE u.id = $1`;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const findStudentToSetStatus = async ({ userId, reviewerId, status }) => {
    const now = new Date();
    const query = `
        UPDATE users
        SET
            is_active = $1,
            status_last_reviewed_dt = $2,
            status_last_reviewer_id = $3
        WHERE id = $4
    `;
    const queryParams = [status, now, reviewerId, userId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount
}

const findStudentToUpdate = async (paylaod) => {
    const { basicDetails: { name, email }, id } = paylaod;
    const currentDate = new Date();
    const query = `
        UPDATE users
        SET name = $1, email = $2, updated_dt = $3
        WHERE id = $4;
    `;
    const queryParams = [name, email, currentDate, id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

module.exports = {
    getRoleId,
    findAllStudents,
    addOrUpdateStudent,
    addStudent,
    findStudentDetail,
    findStudentToSetStatus,
    findStudentToUpdate
};
