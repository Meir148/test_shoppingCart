import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes';
import { productRoutes } from './routes/productRoutes';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


io.on('connection', (socket:any) => {
  console.log('User connected');

  socket.on('stockUpdate', (data:any) => {
    console.log('Stock update:', data);
    socket.broadcast.emit('stockUpdate', data); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
