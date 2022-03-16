const express = require("express");
const userRouter = express.Router();
const {getUserRouteStatus} = require("./controller")

userRouter.get("/",getUserRouteStatus);
module.exports = userRouter;
