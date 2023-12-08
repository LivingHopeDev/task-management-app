const { Router } = require("express");
const router = Router();
const { createTask } = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

router.route("/").post(verifyToken, createTask);

module.exports = router;
