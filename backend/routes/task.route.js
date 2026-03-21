import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { createTask, getTask } from "../controller/task.controller.js"

const router = express.Router()

router.post("/create" , verifyToken , adminOnly, createTask)
router.get("/" , verifyToken , getTask)

export default router