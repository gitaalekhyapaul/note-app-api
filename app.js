require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database/config");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

db.getConnection()
  .then((result) => {
    console.log("Connected to MySQL");
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
