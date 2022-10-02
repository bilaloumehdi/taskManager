const mogoose = require('mongoose') ;

const connectDB= (url) => {
    return mogoose.
        connect(url,{
            useNewUrlParser:true ,
            useCreateIndex:true ,
        useUnifiedTopology:true,
        useFindAndModify:false
        }) 
}

module.exports = connectDB ;



// mongose.connect --> asyn , so the server is lunched before connected to DB -->
//  we are going to start by connecting to DB than launching the server to listen