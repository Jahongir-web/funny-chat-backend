import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler"

import { row, rows } from "./database/pg";
import query from "./models/query";

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Errors handler
app.use(errorHandler);

// Routes
app.use("/api", routes);

// Socket

io.on('connection', socket => {
  socket.on('online', async(user)=>{
    await row(query.USERS_STATUS, true, user?.user_id)
    const users = await rows(query.USERS)
    socket.broadcast.emit('update users', users)
  })

	socket.on('exit', async(user)=>{
    await row(query.USERS_STATUS, false, user?.user_id)
    const users = await rows(query.USERS)
    socket.broadcast.emit('update users', users)
  })
  
  
	// socket.on('send_message', (message) => {

		// socket.broadcast.emit('update users', 'message111')
	// })
})

// Listening
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server started on th port ${PORT}`));
