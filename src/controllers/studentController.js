const mongoose = require("mongoose");
const Student = require("../models/Student");

const sendError = (res, statusCode, message) =>
  res.status(statusCode).json({ success: false, message });

// POST /create
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age, course, department } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return sendError(res, 409, `A student with email ${email} already exists`);
    }

    const student = await Student.create({ name, email, age, course, department });

    return res
      .status(201)
      .json({ success: true, message: "Student created successfully", data: student });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return sendError(res, 400, messages.join(", "));
    }
    if (error.code === 11000) {
      return sendError(res, 409, "A student with that email already exists");
    }
    console.error("createStudent error:", error);
    return sendError(res, 500, "Server error while creating student");
  }
};

// GET /get-all
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("getAllStudents error:", error);
    return sendError(res, 500, "Server error while fetching students");
  }
};

// GET /get-one/:id
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student id");
    }

    const student = await Student.findById(id);
    if (!student) {
      return sendError(res, 404, `Student with id ${id} not found`);
    }

    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    console.error("getStudentById error:", error);
    return sendError(res, 500, "Server error while fetching student");
  }
};

// PUT /update/:id
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student id");
    }

    const student = await Student.findById(id);
    if (!student) {
      return sendError(res, 404, `Student with id ${id} not found`);
    }

    if (req.body.email) {
      const duplicate = await Student.findOne({
        email: req.body.email.toLowerCase(),
        _id: { $ne: id },
      });
      if (duplicate) {
        return sendError(res, 409, `A student with email ${req.body.email} already exists`);
      }
    }

    const updated = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return sendError(res, 400, messages.join(", "));
    }
    if (error.code === 11000) {
      return sendError(res, 409, "A student with that email already exists");
    }
    console.error("updateStudent error:", error);
    return sendError(res, 500, "Server error while updating student");
  }
};

// DELETE /delete/:id
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student id");
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return sendError(res, 404, `Student with id ${id} not found`);
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    console.error("deleteStudent error:", error);
    return sendError(res, 500, "Server error while deleting student");
  }
};
