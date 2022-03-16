const express = require("express");
const productRouter = require("src/apiServices/product/router")
const userRouter = require("src/apiServices/user/router")
const indexRouter = express.Router();
indexRouter.use("/products",productRouter)
indexRouter.use("/users",userRouter)

module.exports = indexRouter
