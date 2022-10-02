const express = require('express')

const app = express() ;
const tasks =require('./routers/tasks')
const port = process.env.PORT || 3000 

const connectDB = require('./db/connect')
require('dotenv').config() 
const errorMiddleWare = require('./middlewares/errorMiddleware')
const notFound = require('./middlewares/notFound')

// Middlewares
app.use(express.json())

app.use(express.static('./public')) ;
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorMiddleWare) ;

// connect to DB than start lestening
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI) ;
        app.listen(port, console.log(`Server is listening on port ${port} ... `))

    }catch(error){
        console.log(error);
        
    }
}

start() ;
