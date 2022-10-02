const express = require('express')

const router = express.Router() ;

// import the controllers
const  {
    getAllTasks,
    createTask,
    deleteTask,
    getSingleTask,
    updateTask,
    }  = require('../controllers/tasks')


// router.route('/').get(getAllTasks)
// router.route('/').post(createTask)
// router.route('/:id').delete(deleteTask)
// router.route('/:id').get(getSingleTask)
// router.route('/:id').patch(updateTask)

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').delete(deleteTask).get(getSingleTask).patch(updateTask)

module.exports = router ;