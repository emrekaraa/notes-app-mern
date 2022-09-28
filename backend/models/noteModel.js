const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;
