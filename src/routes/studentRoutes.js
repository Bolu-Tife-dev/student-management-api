const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/create", createStudent);
router.get("/get-all", getAllStudents);
router.get("/get-one/:id", getStudentById);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

module.exports = router;
