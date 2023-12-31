const express = require("express");
const dotenv = require('dotenv').config();
const colors = require('colors')
const port = process.env.PORT || 5000;
const {errorHandler} = require('../backend/middleWare/errorMiddleware')
const connectDB = require('./config/db');


connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/api/goals",require('./routes/routerGoals'))
app.use("/api/users",require('./routes/userGoals'))
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`port runnred at ${port}`)
})