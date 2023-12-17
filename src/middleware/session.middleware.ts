import { NextFunction ,Request,Response} from "express";
interface User {
  id: number;
  email: string;
}
export default async function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionWithUser = req.session as { user?: User };
    if (!sessionWithUser.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (err) {
    res.status(400).json("Invalid token, login again");
  }
}
