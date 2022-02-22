import express from "express";
import messageCtrl from "../controllers/messageCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/message")
  .get(authRole(), messageCtrl.getMessage)
  .post(authRole(), messageCtrl.createMessage)
  .put(authRole(), messageCtrl.readMessage)

export default router;