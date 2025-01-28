import "express-session";

declare module "express-sessoin" {
  interface SessionData {
    userId: number;
  }
}
