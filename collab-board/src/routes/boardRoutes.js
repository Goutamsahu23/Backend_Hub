const express = require('express');
const { createBoard, getMyBoards, getBoardById, inviteUser } = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createBoard);
router.get('/', getMyBoards);
router.get('/:id', getBoardById);
router.post('/:id/invite', inviteUser);

module.exports = router;
