const express =require('express');

const indexRouter = require('src/router/index')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/", indexRouter)


module.exports = app;
