import {IResponse, IRequest} from "../config/interfaces";
import {rows} from '../database/pg'
import query from '../models/query'


const homeCtrl = {
  getUser: async (req: IRequest, res: IResponse) => {
    try {      
      res.json({user: req.user});
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  getAllUsers: async (req: IRequest, res: IResponse) => {
    try {  
      const users = await rows(query.USERS)

      res.json(users);
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  getMessageUsers: async (req: IRequest, res: IResponse) => {
    try {  
      
      const userId = Number(req.params.id)

      let usersWithMessages = await rows(query.USERS_MESSAGES, userId);

      res.json(usersWithMessages);
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
};

export default homeCtrl;
