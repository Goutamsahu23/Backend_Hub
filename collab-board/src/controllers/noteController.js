const Note = require('../models/Note');
const Board = require('../models/Board');
const { logActivity } = require('./activityController');

// Get all notes in a board
async function getNotes(req, res) {
  const notes = await Note.find({ boardId: req.params.boardId });
  res.json(notes);
}

// Create note
async function createNote(req, res) {
  const { text, x, y, color } = req.body;

  const note = await Note.create({
    boardId: req.params.boardId,
    text,
    position: { x: x || 0, y: y || 0 },
    color: color || '#FFD700',
    createdBy: req.user._id
  });

  await logActivity({
    boardId: note.boardId,
    userId: req.user._id,
    action: "note_created",
    details: { noteId: note._id, text: note.text }
  });

  res.json(note);
}

// Update note
async function updateNote(req, res) {
  const { text, x, y, color } = req.body;
  const note = await Note.findById(req.params.noteId);

  if (!note) return res.status(404).json({ error: "Note not found" });

  note.text = text ?? note.text;
  note.position.x = x ?? note.position.x;
  note.position.y = y ?? note.position.y;
  note.color = color ?? note.color;
  note.version += 1;

  await note.save();

  await logActivity({
    boardId: note.boardId,
    userId: req.user._id,
    action: "note_updated",
    details: { noteId: note._id, text: note.text }
  });


  res.json(note);
}

// Delete note
async function deleteNote(req, res) {
  const note = await Note.findById(req.params.noteId);
  if (!note) return res.status(404).json({ error: "Note not found" });

  await note.deleteOne();

  await logActivity({
    boardId: note.boardId,
    userId: req.user._id,
    action: "note_deleted",
    details: { noteId: note._id, text: note.text }
  });
  res.json({ message: "Note deleted" });
}

module.exports = { getNotes, createNote, updateNote, deleteNote };
