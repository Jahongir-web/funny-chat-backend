import { IResponse } from "../config/interfaces";
import { Request } from "express";
import query from '../models/query'
import  {row}  from '../database/pg'
import jwt from "jsonwebtoken";
import userConfig from "../config/user.config";

const userCtrl = {
  login: async (req: Request, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await row(query.LOGIN, email, password)            
    
      if (user) {        
        const accessToken = createAccessToken(user);
        res.json({ accessToken });
      } else {
        return res.error.userNotFound(res);
      }      
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  signUp: async (req: Request, res: IResponse) => {
    try {
      const { email, name, password, } = req.body;

      if (!email || !name || !password)
        return res.error.dataNotEnough(res);

      const checkUser = await row(query.CHECK_EMAIL, email)
      if (checkUser) return res.error.userExist(res);

      const newUser = await row(query.SIGNUP, name, email, password)

      res.status(201).json({
        message: "User created",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
}

// Token
const createAccessToken = (user: object) => {
  return jwt.sign(user, userConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export default userCtrl;
