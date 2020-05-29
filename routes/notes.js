const router = require("express").Router();
const notesController = require("../controllers/notes");
const verifyUser = require("../middlewares/verify").verifyUser;

router.post("/add", verifyUser, notesController.postAddNote);
router.get("/getAll", verifyUser, notesController.getAllNotes);
router.get("/get", verifyUser, notesController.getNote);

module.exports = router;
