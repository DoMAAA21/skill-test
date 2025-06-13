const { ApiError, sendAccountVerificationEmail } = require("../../utils");
const { findAllStudents, findStudentDetail, findStudentToSetStatus, addStudent, updateUser, updateStudentProfile } = require("./students-repository");
const { findUserById } = require("../../shared/repository");

const checkStudentId = async (id) => {
    const isStudentFound = await findUserById(id);
    if (!isStudentFound) {
        throw new ApiError(404, "Student not found");
    }
}

const getAllStudents = async (payload) => {
    const students = await findAllStudents(payload);
    if (students.length <= 0) {
        throw new ApiError(404, "Students not found");
    }

    return students;
}

const getStudentDetail = async (id) => {
    await checkStudentId(id);

    const student = await findStudentDetail(id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return student;
}

const addNewStudent = async (payload) => {
    const ADD_STUDENT_AND_EMAIL_SEND_SUCCESS = "Student added and verification email sent successfully.";
    const ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL = "Student added, but failed to send verification email.";
    try {
        const result = await addStudent(payload);
        console.log("Add student result:", result);
        if (!result.status) {
            throw new ApiError(500, result.message);
        }
        try {
            await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
            return { message: ADD_STUDENT_AND_EMAIL_SEND_SUCCESS };
        } catch (error) {
            return { message: ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL }
        }
    } catch (error) {
        console.error("Error adding student:", error);
        throw new ApiError(500, "Unable to add student");
    }
}

const updateStudent = async (payload) => {
    const {
        id,
        name,
        email,
        system_access,
        gender,
        dob,
        phone,
        className,
        section,
        roll,
        admission_date,
        current_address,
        permanent_address,
        father_name,
        father_phone,
        mother_name,
        mother_phone,
        guardian_name,
        guardian_phone,
        relation_of_guardian
    } = payload;

    await updateUser({ id, name, email, system_access });

    await updateStudentProfile({
        user_id: id,
        gender,
        dob,
        phone,
        className,
        section,
        roll,
        admission_date,
        current_address,
        permanent_address,
        father_name,
        father_phone,
        mother_name,
        mother_phone,
        guardian_name,
        guardian_phone,
        relation_of_guardian
    });

    return { message: 'Student updated successfully.' };
};

const setStudentStatus = async ({ userId, reviewerId, status }) => {
    await checkStudentId(userId);

    const affectedRow = await findStudentToSetStatus({ userId, reviewerId, status });
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to disable student");
    }

    return { message: "Student status changed successfully" };
}

module.exports = {
    getAllStudents,
    getStudentDetail,
    addNewStudent,
    setStudentStatus,
    updateStudent,
};
