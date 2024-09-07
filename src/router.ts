import express from "express";
import {
  fetchCourseLifetimeStats,
  getStudySession,
  persistStudySession,
} from "./controllers/stats";
const router = express.Router();

router.post("/courses/:courseId", persistStudySession);
router.get("/courses/:courseId", fetchCourseLifetimeStats);
router.get("/courses/:courseId/sessions/:sessionId", getStudySession);

export default router;
