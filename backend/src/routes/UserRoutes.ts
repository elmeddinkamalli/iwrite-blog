import { UserController } from "../controller/UserController";
import {
  authMiddleware,
  notAuthMiddleware,
} from "../middleware/AuthMiddleware";

// Routes for users
const UserRoutes = [
  {
    method: "get",
    route: "/users/me",
    controller: UserController,
    action: "me",
    middlewares: [authMiddleware],
  },
  {
    method: "get",
    route: "/users/logout",
    controller: UserController,
    action: "logout",
    middlewares: [authMiddleware],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares: [],
  },
  {
    method: "put",
    route: "/users/:id/update",
    controller: UserController,
    action: "update",
    middlewares: [authMiddleware],
  },
  {
    method: "delete",
    route: "/users/:id/delete",
    controller: UserController,
    action: "remove",
    middlewares: [authMiddleware],
  },
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register",
    middlewares: [notAuthMiddleware],
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    middlewares: [notAuthMiddleware],
  },
];

export default UserRoutes;
