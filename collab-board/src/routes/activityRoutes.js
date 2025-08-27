const express = require('express');
const { getBoardActivity } = require('../controllers/activityController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

// GET /api/boards/:id/activity
router.get('/:id/activity', getBoardActivity);

module.exports = router;
