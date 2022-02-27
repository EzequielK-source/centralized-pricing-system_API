const express = require("express");
const productRouter = require("src/apiServices/product/router")
const indexRouter = express.Router();
indexRouter.use("/products",productRouter)

module.exports = indexRouter
