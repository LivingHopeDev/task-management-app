const { Router } = require("express");
const router = Router();
const {
  createTask,
  getUserTask,
  updateTask,
  deleteTask,
  status,
} = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

router.route("/").post(verifyToken, createTask).get(verifyToken, getUserTask);
router
  .route("/:id")
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);
router.route("/:id/set-completed").put(verifyToken, status);

module.exports = router;
