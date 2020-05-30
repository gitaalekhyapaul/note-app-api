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

exports.postUpdateNote = async (req, res) => {
  try {
    const noteId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    if (!noteId || !updatedTitle || !updatedContent) {
      return res.status(400).json({
        status: "ERROR",
        error: "Bad Request. Invalid Parameters.",
      });
    }
    const query = await db.execute(
      `
    UPDATE notes
    SET title = ?,
      content = ?,
      edited = 1
    WHERE id = ? AND user_id = ?
    `,
      [updatedTitle, updatedContent, noteId, res.locals.user.id]
    );
    const result = query[0].affectedRows;
    if (!result) {
      return res.status(404).json({
        status: "ERROR",
        error: "No Notes Found.",
      });
    }
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

exports.postDeleteNote = (req, res) => {
  try {
    res.send("OK BRO");
  } catch (err) {
    console.log(err);
  }
};
