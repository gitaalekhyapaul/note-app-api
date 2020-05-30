const router = require("express").Router();
const notesController = require("../controllers/notes");
const verifyUser = require("../middlewares/verify").verifyUser;

router.post("/add", verifyUser, notesController.postAddNote);
router.get("/getAll", verifyUser, notesController.getAllNotes);
router.get("/get", verifyUser, notesController.getNote);
router.post("/update", verifyUser, notesController.postUpdateNote);
router.post("/delete", verifyUser, notesController.postDeleteNote);

module.exports = router;
