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
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createTask,
};
