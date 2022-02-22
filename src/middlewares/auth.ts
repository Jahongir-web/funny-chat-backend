import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IRequest, IResponse } from "../config/interfaces";
import userConfig from "../config/user.config";

const authRole = () => {
  return async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) return res.status(400).send("Token yo'qligi sababli so'rovingiz rad etildi!");
      verify(token, userConfig.ACCESS_TOKEN_SECRET, (err, user: any) => {
        if (err) return res.error.invalidAuthorization(res, 403);
        const user_id = user?.user_id
        const user_email = user?.user_email
        const user_name = user?.user_name
        const is_active = user?.is_active
        req.user = {user_id, user_email, user_name, is_active};
        next();
      });
    } catch (error) {
      return res.status(400).send("Invalid token!");
    }
  };
};

export default authRole;
