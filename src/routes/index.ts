import express from "express";
import userRouter from "./userRouter";
import homeRouter from "./homeRouter";
import messageRouter from "./messageRouter";
import uploadRouter from "./uploadRouter";

const router = express.Router();


router.use("/", userRouter);
router.use("/", homeRouter);
router.use("/", messageRouter);
router.use("/", uploadRouter);

export default router;
