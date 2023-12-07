const { Router } = require("express");
const router = Router();
const { createTask } = require("../controllers/taskController");

router.route("/").post(createTask);

module.exports = router;
