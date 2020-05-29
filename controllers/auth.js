const bcrypt = require("bcryptjs");
const db = require("../database/config");

exports.postSignup = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).json({
        status: "ERROR",
        error: "Bad Request. Invalid Parameters.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    console.log(result);
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};
