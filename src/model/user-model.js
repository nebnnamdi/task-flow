import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
    unique: true,
  },

  password: {
    required: true,
    type: String,
  },
});

const projectSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: String,
  },
  endDate: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  members: {
    required: true,
    type: Array,
  },
  createdBy: {
    required: true,
    type: String,
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export const Project =
  mongoose.models.Project ?? mongoose.model("Project", projectSchema);
