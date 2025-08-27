const Activity = require('../models/Activity');

/**
 * Utility: log an activity
 * This will be called from other controllers (like noteController, boardController)
 */
async function logActivity({ boardId, userId, action, details }) {
  try {
    await Activity.create({
      boardId,
      userId,
      action,
      details
    });
  } catch (err) {
    console.error("❌ Failed to log activity:", err.message);
  }
}

/**
 * Get activity log for a board
 * GET /api/boards/:id/activity
 */
async function getBoardActivity(req, res) {
  try {
    const { id } = req.params;

    const logs = await Activity.find({ boardId: id })
      .populate('userId', 'name email') // show who performed the action
      .sort({ createdAt: -1 }) // latest first
      .limit(50); // limit to 50 recent activities

    res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (err) {
    console.error("❌ Error fetching activity log:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch activity log" });
  }
}

module.exports = {
  logActivity,
  getBoardActivity
};
