import addNoteSchema from "../validators/add-note-validator.js";
import editNoteSchema from "../validators/edit-note-validator.js";
import Note from "../models/noteModel.js";

export const getAllNotes = async (_, res) => {
  const data = await Note.find();
  const newData = data.map((note) => {
    return {
      id: note.id,
      user_id: note.user_id,
      title: note.title,
      content: note.content,
    };
  });
  return res.json(newData);
};

export const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ id: +id });
  if (!note) {
    return res.status(401).json({ message: "There is no note with this id" });
  }
  const newNote = {
    title: note.title,
    content: note.content,
    user_id: note.user_id,
    id: note.id,
  };

  return res.status(200).json(newNote);
};

export const addNote = async (req, res) => {
  const { body } = req;
  const validator = await addNoteSchema(body);
  const { value, error } = validator.validate(body);
  if (error) {
    return res.status(401).json(error.details);
  }

  const { title, content, user_id } = value;
  const lastNote = await Note.find().sort({ _id: -1 }).limit(1);
  const id = lastNote.length > 0 ? lastNote[0].id + 1 : 1;
  const newNote = {
    title,
    content,
    user_id,
    id,
  };

  await Note.create({ ...newNote });
  return res.status(201).json({ ...newNote });
};

export const updateNote = async (req, res) => {
  const { body } = req;
  const validator = await editNoteSchema(body);
  const { value, error } = validator.validate(body);
  if (error) {
    return res.status(401).json(error.details);
  }

  const { title, content, user_id, id } = value;
  await Note.findOneAndUpdate(
    { id },
    {
      title,
      content,
      user_id,
    }
  );

  return res.status(200).json({ message: "note updated successfully" });
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ id: +id });
  if (!note) {
    return res.status(401).json({ message: "there is no note with this id" });
  }

  await note.delete();

  return res.status(200).json({ message: "note deleted successfully" });
};
