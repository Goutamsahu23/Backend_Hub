const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String, // e.g. "note_created", "note_updated"
  details: Object
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
