const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaslController');
const auth = require('../middleware/auth');

// GET /tasks (protected)
router.get('/', auth, TaskController.getTask);

// GET /tasks/:id (protected)
router.get('/:id', auth, TaskController.getTasksByUserId);

// POST /tasks (protected)
router.post('/', auth, TaskController.post);
router.put('/:id', auth, TaskController.update);
router.patch('/:id', auth, TaskController.delete);


module.exports = router;
