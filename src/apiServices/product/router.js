const express = require("express");
const productRouter = express.Router();

productRouter.get("/",(req,res)=>{
	return res.sendStatus(200)
})
module.exports = productRouter
