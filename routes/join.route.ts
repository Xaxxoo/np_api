import express from "express";
import {
  
  registrationUser
  
} from "../controllers/join.controllers";
const joinRouter = express.Router();

joinRouter.post("/registration", registrationUser);



// joinRouter.get(
//   "/get-joins",
//   isAutheticated,
//   authorizeRoles("admin"),
//   getAlljoins
// );


export default joinRouter;