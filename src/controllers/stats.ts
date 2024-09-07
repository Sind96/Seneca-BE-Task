import { Request, Response } from "express";
import { Stats } from "../models/stats";

// Provides persistence of stats
export const persistStudySession = async (req: Request, res: Response) => {
  const { xuserid } = req.headers;
  const { courseId } = req.params;
  const { sessionId, totalModulesStudied, averageScore, timeStudied } =
    req.body;

  try {
    const stats = await Stats.findOneAndUpdate(
      { xuserid, courseId, sessionId },
      { totalModulesStudied, averageScore, timeStudied },
      { upsert: true, new: true }
    );
    res.status(201).send(stats);
  } catch (error) {
    console.log(`Error with persistStudySession:`, error);
    res.status(500).send(`Internal Server Error`);
  }
};

// Fetches course lifetime statistics
export const fetchCourseLifetimeStats = async (req: Request, res: Response) => {
  const { xuserid } = req.headers;
  const { courseId } = req.params;

  try {
    const stats = await Stats.aggregate([
      { $match: { xuserid, courseId } },
      {
        $group: {
          _id: "$courseId",
          totalModulesStudied: { $sum: "$totalModulesStudied" },
          averageScore: { $avg: "$averageScore" },
          timeStudied: { $sum: "$timeStudied" },
        },
      },
    ]);
    res.status(200).send(stats);
  } catch (error) {
    console.log(`Error with fetchCourseLifetimeStats:`, error);
    res.status(500).send(`Internal Server Error`);
  }
};

// Fetches a single study session
export const getStudySession = async (req: Request, res: Response) => {
  const { xuserid } = req.headers;
  const { courseId, sessionId } = req.params;

  try {
    const sessionStat = await Stats.findOne({ xuserid, courseId, sessionId });
    if (!sessionStat) {
      return res.status(404).send("This study session does not exist");
    }
    res.status(200).send(sessionStat);
  } catch (error) {
    console.log(`Error with getStudySession:`, error);
    res.status(500).send(`Internal Server Error`);
  }
};
