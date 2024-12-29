import express from "express";
import connect from "./config/database.config.js";
const app = express();
connect();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
