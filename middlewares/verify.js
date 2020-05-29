const jwt = require("jsonwebtoken");
const db = require("../database/config");

module.exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.get("authorization")) {
      throw new Error("401:invalidCred");
    }
    const authToken = req.get("authorization").split(" ")[1];
    const authDetails = await new Promise((data) =>
      jwt.verify(
        authToken,
        process.env.JWT_SECRET_KEY,
        {
          issuer: "gitaalekhyapaul",
        },
        (err, decoded) => {
          if (err) {
            throw new Error("401:invalidCred");
          }
          return data(decoded);
        }
      )
    );
    const user = await db.execute(
      `
    SELECT id, username
    FROM users
    WHERE username = ?
    `,
      [authDetails.username]
    );
    res.locals.user = user[0][0];
    next();
  } catch (err) {
    if (err.message === "401:invalidCred") {
      res.status(401).json({
        status: "ERROR",
        error: "Invalid Credentials. Please Login.",
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
