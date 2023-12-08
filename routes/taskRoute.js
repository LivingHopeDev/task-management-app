const { Router } = require("express");
const router = Router();
const { createTask, getUserTask } = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

router.route("/").post(verifyToken, createTask).get(verifyToken, getUserTask);

module.exports = router;
