
const Task = require('../models/task')
const asyncWrapper = require('../middlewares/async')
// errors
const {createErrorHandler} = require('../errors/error') ;

// get All tasks 
const getAllTasks = asyncWrapper(async (req,res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})    
    
})

// create task
const createTask = asyncWrapper(async (req,res) => {
            const task = await Task.create(req.body)
            res.status(201).json({task})
        
})


const getSingleTask = asyncWrapper(async (req,res,next) => {
        
            const {id:taskID} = req.params
            const task = await Task.findOne({ _id :taskID})
            
            if(!task){
                return next(createErrorHandler(`No task with id :${taskID}`,404))
            }

            res.status(200).json({task})
        
})

const deleteTask = asyncWrapper(async (req,res)=> {
    
        const {id:taskID} = req.params 
        // find the task that matches the id 
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createErrorHandler(`No task with id :${taskID}`,404))
            
        }
        res.status(200).json({task}) 

})
const updateTask = asyncWrapper(async (req,res)=> {
    
         // searching 
        const {id:taskID} = req.params ;

        const task  = await Task.findOneAndUpdate({_id:taskID},req.body ,
            {       // seting up the options to test the validation for the new values , and return the modified task 
                new:true,
                runValidators:true
            })
            
        if(!task){ 
            return next(createErrorHandler(`No task with id :${taskID}`,404))

        }
        res.status(200).json({task})

})



module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    getSingleTask,
    updateTask
}