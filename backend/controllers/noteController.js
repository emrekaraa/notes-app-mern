const NoteModel = require("../models/noteModel");
const mongoose = require("mongoose");

const getAllNotes = async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createNote = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const newNote = await NoteModel.create({ title, description, userId });
    res.status(201).json({
      message: "New note created",
      newNote: newNote,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }

    const deletedNote = await NoteModel.findById(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note Not Found!",
      });
    }

    await NoteModel.findByIdAndDelete({ _id: deletedNote._id });

    res.status(200).json({
      message: "Note with id: " + req.params.id + " deleted",
      deletedNote,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }

    const note = await NoteModel.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note Not Found!",
      });
    }

    const filter = { _id: note._id };
    const update = {
      title: req.body.title ? req.body.title : note.title,
      description: req.body.description
        ? req.body.description
        : note.description,
    };

    const updatedNote = await NoteModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json({
      updatedNote,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
};
