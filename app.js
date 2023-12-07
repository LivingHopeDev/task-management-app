const express = require("express");
const app = express();
const db = require("./db");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoute);

const startServer = async () => {
  try {
    await db.query("SELECT * from task");
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log("server started on port " + process.env.PORT);
    });
  } catch (err) {
    console.log("db connection failed" + err);
  }
};

startServer();
