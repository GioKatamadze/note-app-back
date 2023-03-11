import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

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
    throw Error("There is no note with this id");
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
  const { title, content, user_id } = req.body;
  const user = await User.findOne({ _id: user_id });
  if (!user) {
    throw Error("There is no note with this id");
    return res.status(401).json({ message: "There is no note with this id" });
  }

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
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findOne({ id: +id });
  if (!note) {
    throw Error("There is no note with this id");
    return res.status(401).json({ message: "There is no note with this id" });
  }

  await Note.findOneAndUpdate(
    { id: +id },
    {
      title,
      content,
    }
  );

  return res.status(200).json({ message: "note updated successfully" });
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ id: +id });
  if (!note) {
    throw Error("There is no note with this id");
    return res.status(401).json({ message: "There is no note with this id" });
  }

  await Note.findOneAndRemove({ id: +id });
  return res.status(200).json({ message: "note deleted successfully" });
};
