import {Response } from "express";

export function handleSuccessResponse(res: Response, statusCode: number, message: string, data?: any, token?: string) {
  res.status(statusCode).json({ message, data, token });
}

export function handleErrorResponse(res: Response, statusCode: number, message: string) {
  res.status(statusCode).json({ message });
}

  
  