const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const authRoutes = require('./routes/authRoutes');


const { WebSocketServer } = require('ws');
// const cors=require('cors');

dotenv.config()
connectDB();

const app=express();
app.use(express.json());
// app.use(cors());
app.use('/api/auth', authRoutes);

// http server
const PORT=process.env.PORT || 5000;
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection',(ws)=>{
    console.log('New client connected');

    ws.on('message',(message)=>{
        console.log(`Received message: ${message.toString()}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocketServer.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close',()=>{
        console.log('Client disconnected');
    });
})

