import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  user_id: {
    type: String,
  },
  id: {
    type: Number,
  },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
