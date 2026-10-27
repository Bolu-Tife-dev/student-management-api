require("dotenv").config();

const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
    endpoints: {
      createStudent: "POST /create",
      getAllStudents: "GET /get-all",
      getStudentById: "GET /get-one/:id",
      updateStudent: "PUT /update/:id",
      deleteStudent: "DELETE /delete/:id",
    },
  });
});

app.use("/", studentRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;
