const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;
