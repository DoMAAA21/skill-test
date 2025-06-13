const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query); // or req.body, depending on what payload you're passing
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const {
        class: className,
        admissionDate,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        ...rest
    } = req.body;

    const payload = {
        ...rest,
        className,
        admission_date: admissionDate,
        current_address: currentAddress,
        permanent_address: permanentAddress,
        father_name: fatherName,
        father_phone: fatherPhone,
        mother_name: motherName,
        mother_phone: motherPhone,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        relation_of_guardian: relationOfGuardian
    };

    const message = await addNewStudent(payload);
    res.json(message);
});


const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
