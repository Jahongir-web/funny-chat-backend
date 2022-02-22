import { Request, Response, NextFunction } from "express";
import { IResponse } from "../config/interfaces";

const errorHandler = (req: Request, res: any, next: NextFunction) => {
  const error: object = {
    serverErr: async (res: Response, err: any) => {
      res.status(500).json({
        err: {
          name: "ServerErr",
          message: `International server error: ${err.message}`,
        },
      });
    },
    handleError: async (res: Response, err: any) => {
      switch (err.name) {
        case "ValidationError":
          return res.status(400).json({ err });
        case "CastError":
          return res.status(400).json({ err });
        default:
          return res.status(500).json({
            err: {
              name: "ServerErr",
              message: `International server error: ${err.message}`,
            },
          });
      }
    },
    noUpload: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "NoUpload",
          message: "No upload file",
        },
      });
    },
    invalidSize: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidSize",
          message: "File large",
        },
      });
    },
    invalidType: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidType",
          message: "File format png or jpeg",
        },
      });
    },
    invalidPublicId: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidPublicId",
          message: "No checked image",
        },
      });
    },
    invalidUploadImage: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidUploadImage",
          message: "No Upload Image is required",
        },
      });
    },
    userNotFound: async (res: Response) => {
      res.status(404).json({
        name: "userNotFound",
        message: "Email yoki password xato!",
      });
    },
    dataNotEnough: async (res: Response) => {
      res.status(400).json({
        name: "dataNotEnough",
        message: "Iltimos barcha qatorlarni to'ldiring!",
      });
    },
    userExist: async (res: Response) => {
      res.status(400).json({
        name: "userExist",
        message: "Bu email oldin ro'yhatdan o'tgan!",
      });
    }
  };

  res.error = error;

  next();
};

export default errorHandler;
