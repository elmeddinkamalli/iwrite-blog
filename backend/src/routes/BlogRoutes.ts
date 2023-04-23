import { BlogController } from "../controller/BlogController";
import { authMiddleware } from "../middleware/AuthMiddleware";

// Routes for blogs
const BlogRoutes = [
  {
    method: "post",
    route: "/blogs/create",
    controller: BlogController,
    action: "create",
    middlewares: [authMiddleware],
  },
  {
    method: "get",
    route: "/blogs/:id",
    controller: BlogController,
    action: "one",
    middlewares: [],
  },
  {
    method: "get",
    route: "/blogs",
    controller: BlogController,
    action: "all",
    middlewares: [],
  },
  {
    method: "put",
    route: "/blogs/:id",
    controller: BlogController,
    action: "update",
    middlewares: [authMiddleware],
  },
  {
    method: "delete",
    route: "/blogs/:id",
    controller: BlogController,
    action: "remove",
    middlewares: [authMiddleware],
  },
];

export default BlogRoutes;
