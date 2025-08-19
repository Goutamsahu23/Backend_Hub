const Board = require('../models/Board');
const User = require('../models/User');

// Create board
async function createBoard(req, res) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const board = await Board.create({
    title,
    owner: req.user._id,
    members: [req.user._id]
  });

  res.json(board);
}

// Get my boards
async function getMyBoards(req, res) {
  const boards = await Board.find({
    members: req.user._id
  }).populate('owner', 'name email');

  res.json(boards);
}

// Get board details
async function getBoardById(req, res) {
  const board = await Board.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('members', 'name email');

  if (!board) return res.status(404).json({ error: "Board not found" });

  if (!board.members.includes(req.user._id)) {
    return res.status(403).json({ error: "Not a member of this board" });
  }

  res.json(board);
}

// Invite user
async function inviteUser(req, res) {
  const { email } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (!board.owner.equals(req.user._id)) {
    return res.status(403).json({ error: "Only owner can invite" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (!board.members.includes(user._id)) {
    board.members.push(user._id);
    await board.save();
  }

  res.json({ message: "User invited", board });
}

module.exports = { createBoard, getMyBoards, getBoardById, inviteUser };
