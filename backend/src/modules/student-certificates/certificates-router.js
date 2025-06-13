const express = require("express");
const router = express.Router();
const certificateController = require("./certificates-controller");
const { checkApiAccess } = require("../../middlewares");


router.get("", checkApiAccess, certificateController.handleGetAllCertificates);
// router.post("", checkApiAccess, studentController.handleAddStudent);
// router.get("/:id", checkApiAccess, studentController.handleGetStudentDetail);
// router.post("/:id/status", checkApiAccess, studentController.handleStudentStatus);
// router.put("/:id", checkApiAccess, studentController.handleUpdateStudent);

module.exports = { certificatesRoutes: router };