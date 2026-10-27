const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    age: {
      type: Number,
      required: [true, "Student age is required"],
      min: [16, "Student must be at least 16 years old"],
      max: [100, "Student age cannot exceed 100 years"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      maxlength: [100, "Course cannot exceed 100 characters"],
    },
    department: {
      type: String,
      trim: true,
      default: "General",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Student", studentSchema);
