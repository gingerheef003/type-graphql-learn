import { Request, Response } from "express";
import { createAuthorsLoader } from "../utils/authorsLoader";

export interface MyContext {
  req: Request & { session: { userId?: number } };
  res: Response;
  authorsLoader: ReturnType<typeof createAuthorsLoader>
}
