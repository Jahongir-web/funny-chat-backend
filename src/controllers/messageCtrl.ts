import {IResponse, IRequest} from "../config/interfaces";
import {row, rows} from '../database/pg'
import query from '../models/query'


const messageCtrl = {
  getMessage: async (req: IRequest, res: IResponse) => {

    try {        
      const messages = await rows(query.MESSAGES)

      res.json(messages);
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },

  createMessage: async (req: IRequest, res: IResponse) => {
    try {
      const {message_text, message_file, author_id, user_id} = req.body

      const newMessage = await row(query.NEW_MESSAGE, message_text, message_file, author_id, user_id)
      
      res.json(newMessage);
      
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },

  readMessage: async (req: IRequest, res: IResponse) => {
    try {
      const {author_id, user_id} = req.body

      const newMessage = await row(query.READ_MESSAGE, author_id*1, user_id*1)
      
      res.json('create newMessage');
      
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },


};

export default messageCtrl;
