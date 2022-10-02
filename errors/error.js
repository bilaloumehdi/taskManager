class ErrorHandler extends Error {
    constructor(message,statusCode){
    super(message);
        this.statusCode = statusCode ;
    }
}

let createErrorHandler =  (message,statusCode) => {

    return new ErrorHandler(message,statusCode) ;
}

module.exports = {ErrorHandler , createErrorHandler} ;
