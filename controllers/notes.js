const db = require("../database/config");

exports.postAddNote = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    if (!title || !content) {
      return res.status(400).json({
        status: "ERROR",
        error: "Bad Request. Invalid Parameters.",
      });
    }
    const result = await db.execute(
      `
    INSERT INTO notes (user_id, title, content)
    VALUES (?, ?, ?)
    `,
      [res.locals.user.id, title, content]
    );
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const query = await db.execute(
      `
    SELECT id,
          ? AS author,
          title,
          content,
          create_time,
          edited,
          update_time
    FROM notes
    WHERE notes.user_id = ?
    `,
      [res.locals.user.username, res.locals.user.id]
    );
    const data = query[0];
    if (data.length === 0) {
      return res.status(404).json({
        status: "ERROR",
        error: "No Notes Found.",
      });
    }
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const noteId = req.query.id;
    if (!noteId) {
      return res.status(400).json({
        status: "ERROR",
        error: "Note ID Missing",
      });
    }
    const query = await db.execute(
      `
    SELECT id,
          ? AS author,
          title,
          content,
          create_time,
          edited,
          update_time
    FROM notes
    WHERE notes.user_id = ? AND id = ?
    `,
      [res.locals.user.username, res.locals.user.id, noteId]
    );
    const data = query[0];
    if (data.length === 0) {
      return res.status(404).json({
        status: "ERROR",
        error: "No Notes Found.",
      });
    }
    res.status(200).json({
      status: "OK",
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};
