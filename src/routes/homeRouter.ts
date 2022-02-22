import express from "express";
import homeCtrl from "../controllers/homeCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(authRole(), homeCtrl.getUser);
 
router
  .route("/users")
  .get(authRole(), homeCtrl.getAllUsers)

router
  .route("/users/message/:id")
  .get(authRole(), homeCtrl.getMessageUsers)

export default router;