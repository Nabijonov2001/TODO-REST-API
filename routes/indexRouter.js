const { getTasks, postTask, updateTask, deleteTask } = require('../controllers/indexController')

const router = require('express').Router()

router.get('/', getTasks)
router.post('/', postTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = {
    path:'/tasks', router
}