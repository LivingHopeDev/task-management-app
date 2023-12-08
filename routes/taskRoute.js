const { Router } = require("express");
const router = Router();
const {
  createTask,
  getUserTask,
  updateTask,
} = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

router.route("/").post(verifyToken, createTask).get(verifyToken, getUserTask);
router.route("/:id").put(verifyToken, updateTask);

module.exports = router;
