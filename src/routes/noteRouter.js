import Express from "express";
import {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const noteRouter = Express.Router();

noteRouter.get("/notes", getAllNotes);
noteRouter.post("/notes", addNote);
noteRouter.get("/notes/:id", getSingleNote);
noteRouter.put("/notes/:id", updateNote);
noteRouter.delete("/notes/:id", deleteNote);

export default noteRouter;
