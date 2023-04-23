import { Request, Response, Router } from "express";
import UserRoutes from "./routes/UserRoutes";
import BlogRoutes from "./routes/BlogRoutes";

// Route registeration
const router: Router = Router();
const routes = [...UserRoutes, ...BlogRoutes];

routes.forEach((route) => {
  const handlers = [
    // Middleware handler
    ...(route.middlewares || []),
    (req: Request, res: Response) => {
      const result = new route.controller()[route.action](req, res);
      if (result instanceof Promise) {
        result.then((result) => {
          return result;
        });
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    },
  ];
  (router as any)[route.method](route.route, ...handlers);
});

module.exports = router;
