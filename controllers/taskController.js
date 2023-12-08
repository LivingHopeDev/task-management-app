const db = require("../db");

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    res.status(200).json({ message: "All fields are required" });
  }
  try {
    const newTask = await db.query("INSERT INTO task SET ?", {
      title,
      description,
      dueDate,
    });
    return res
      .status(200)
      .json({ success: true, message: "Task created", newTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createTask,
};
