const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const noteRoutes = require('./routes/noteRoutes');


const { WebSocketServer } = require('ws');
// const cors=require('cors');

dotenv.config()
connectDB();

const app=express();
app.use(express.json());
// app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/boards/:boardId/notes', noteRoutes);

// http server
const PORT=process.env.PORT || 5000;
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });
const activeBoards = {}; 

wss.on("connection", (ws) => {
  console.log("🔌 WebSocket client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case "join_board":
          if (!activeBoards[data.boardId]) activeBoards[data.boardId] = [];
          activeBoards[data.boardId].push(ws);
          ws.boardId = data.boardId;
          console.log(`👥 User joined board ${data.boardId}`);
          break;

        case "leave_board":
          if (activeBoards[data.boardId]) {
            activeBoards[data.boardId] =
              activeBoards[data.boardId].filter(client => client !== ws);
            console.log(`🚪 User left board ${data.boardId}`);
          }
          break;

        case "note_created":
        case "note_updated":
        case "note_deleted":
        case "board_updated":
          if (activeBoards[ws.boardId]) {
            activeBoards[ws.boardId].forEach(client => {
              if (client !== ws && client.readyState === 1) {
                client.send(JSON.stringify(data));
              }
            });
          }
          break;
      }
    } catch (err) {
      console.error("❌ WS error:", err.message);
    }
  });

  ws.on("close", () => {
    if (ws.boardId && activeBoards[ws.boardId]) {
      activeBoards[ws.boardId] =
        activeBoards[ws.boardId].filter(client => client !== ws);
      console.log(`❌ User disconnected from board ${ws.boardId}`);
    }
  });
});

