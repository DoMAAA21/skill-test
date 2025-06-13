const express = require("express");
const router = express.Router();
const multer = require('multer');
const certificateController = require("./certificates-controller");
const { checkApiAccess } = require("../../middlewares");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("", checkApiAccess, certificateController.handleGetAllCertificates);
router.post("", checkApiAccess, upload.single('file'), certificateController.handleAddCertificate);
// router.get("/:id", checkApiAccess, studentController.handleGetStudentDetail);
// router.post("/:id/status", checkApiAccess, studentController.handleStudentStatus);
// router.put("/:id", checkApiAccess, studentController.handleUpdateStudent);

module.exports = { certificatesRoutes: router };