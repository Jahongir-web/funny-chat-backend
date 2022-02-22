import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler"

const app = express();

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

// Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on th port ${PORT}`));
