const express = require('express')
const setupAssociation  = require("./v1/model/setup")
const app = new express()
const cors = require("cors")
const PORT = 3001
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname+"/v1/public/images"));

const userRouter = require("./v1/router/userRouter");
app.use("/v1/user",userRouter);

const newsRouter = require("./v1/router/newsRouter");
app.use("/v1/news",newsRouter);

const categoryRouter = require("./v1/router/categoryRouter");
app.use("/v1/category", categoryRouter)

setupAssociation.setupAssociation()
require("./database/database")

app.listen(PORT,() => {
    console.log(`Server Running at port : ${PORT}`)
})