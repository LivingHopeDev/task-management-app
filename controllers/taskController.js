const db = require("../db");

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user.id;
  if (!title || !description || !dueDate) {
    res.status(200).json({ message: "All fields are required" });
  }
  try {
    const response = await db.query("INSERT INTO task SET ?", {
      title,
      description,
      dueDate,
      user_id: userId,
    });
    const insertId = response[0].insertId;

    // Fetch the newly created task based on the insertId
    const [newTask] = await db.query("SELECT * FROM task WHERE id = ?", [
      insertId,
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Task created", newTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const [userTask] = await db.query("SELECT * FROM task WHERE user_id = ?", [
      userId,
    ]);
    if (userTask.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No task yet:create one now!" });
    }

    return res.status(200).json({ success: true, message: userTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate } = req.body;

  try {
    const userId = req.user.id;
    const [userTask] = await db.query("SELECT * FROM task WHERE id = ?", [
      taskId,
    ]);
    if (userTask.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "Task not found!" });
    }
    const result = await db.query(
      "UPDATE task SET title = ?, description = ?, dueDate = ? WHERE id = ? AND user_id = ?",
      [title, description, dueDate, taskId, userId]
    );
    if (result[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized to access this task" });
    }

    return res.status(200).json({ success: true, message: "Task updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const userId = req.user.id;
    const [userTask] = await db.query("SELECT * FROM task WHERE id = ?", [
      taskId,
    ]);
    if (userTask.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "Task not found!" });
    }
    const result = await db.query(
      "DELETE FROM task WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (result[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized to access this task" });
    }

    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  createTask,
  getUserTask,
  updateTask,
  deleteTask,
};
