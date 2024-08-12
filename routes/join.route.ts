import express from "express";
import {
join
} from "../controllers/join.controllers";
const joinRouter = express.Router();

joinRouter.post("/join", join);



// joinRouter.get(
//   "/get-joins",
//   isAutheticated,
//   authorizeRoles("admin"),
//   getAlljoins
// );


export default joinRouter;