require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database/config");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "maintainance") {
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "503.html"));
  });
} else if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("*", (req, res) => {
  res.sendStatus(405);
});

db.getConnection()
  .then((result) => {
    console.log("Connected to MySQL");
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
