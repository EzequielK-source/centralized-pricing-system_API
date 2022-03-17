const express = require("express");
const userRouter = express.Router();
const {getUserRouteStatus, createUser} = require("./controller")

userRouter.route("/")
	.post(createUser)
	.get(getUserRouteStatus);
module.exports = userRouter;
