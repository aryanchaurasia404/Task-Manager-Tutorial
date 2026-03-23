import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { exportTaskReport } from "../controller/report.controller.js"

const router = express.Router()
router.get("/export/tasks", verifyToken , adminOnly, exportTaskReport)
export default router