
const {ErrorHandler} = require('../errors/error')

const errorMiddleWare = (err,req,res,next) => {
    if(err instanceof ErrorHandler){
        return res.status(err.statusCode).json({msg :err.message})
    }
    res.status(500).json({msg:'Somthing is going wrong, please try again later '}) ;
}

module.exports = errorMiddleWare ;