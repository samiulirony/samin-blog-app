import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { createBlog } from "../controllers/blog.controller.js"

const router = express.Router()

router.route("/").post(isAuthenticated, createBlog)


export default router