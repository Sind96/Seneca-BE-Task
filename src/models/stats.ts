import mongoose from "mongoose";
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  XUserId: { type: String, required: true },
  courseId: { type: String, required: true },
  sessionId: { type: String, required: true },
  totalModulesStudied: { type: Number, required: true },
  averageScore: { type: Number, required: true },
  timeStudied: { type: Number, required: true },
});

export const Stats = mongoose.model("Stats", statsSchema);
