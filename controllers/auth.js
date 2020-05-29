const bcrypt = require("bcryptjs");
const db = require("../database/config");
const jwt = require("jsonwebtoken");

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
      `
      INSERT INTO users (username, password)
      VALUES (?, ?)
      `,
      [username, hashedPassword]
    );
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        status: "ERROR",
        error: "Username exists.",
      });
    } else {
      console.log(err);
      res.status(500).json({
        status: "ERROR",
        error: "Internal Server Error.",
      });
    }
  }
};

exports.postLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).json({
        status: "ERROR",
        error: "Bad Request. Invalid Parameters.",
      });
    }
    const result = await db.execute(
      `
    SELECT * 
    FROM users
    WHERE username = ?
    `,
      [username]
    );
    if (!result[0].length) {
      throw new Error("403:invalidAuth");
    }
    const user = result[0][0];
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new Error("403:invalidAuth");
    }
    const authToken = await jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        issuer: "gitaalekhyapaul",
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      status: "OK",
      authToken: authToken,
    });
  } catch (err) {
    if (err.message === "403:invalidAuth") {
      res.status(403).json({
        status: "ERROR",
        error: "Username or Password Wrong.",
      });
    } else {
      console.log(err);
      res.status(500).json({
        status: "ERROR",
        error: "Internal Server Error",
      });
    }
  }
};
