const { Task ,User } = require('../models');


const TaskController = {
    
    async getTask(req,res){
        const tasks = await Task.findAll();
        res.json(tasks);

    },
    async getTasksByUserId(req, res) {
        const tasks = await Task.findAll({
            where: { userId: req.params.id },
            include: [{ model: User, as: 'user' }]
        });
            res.json(tasks);
    },
    async post(req,res){
        const { title, description, status, userId } = req.body;
        const tasks = await Task.create({
            title,
            description,
            status,
            userId
        });
        res.json(tasks);
    } ,
    async update(req, res) {
        const { id } = req.params;
        const { title, description, status, userId } = req.body;
    
        // Find the task by ID
        const task = await Task.findByPk(id);
    
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    
        // Check if the current user is authorized to update the task
        if (task.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }
    
        // Update the task with new values
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
    
        await task.save();
    
        res.json(task);
    } ,
    async delete(req, res) {

        const { id } = req.params;
        const { title, description, status, userId } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }
    
        Task.deleted = true;
        await task.save();
        res.json(task);

        
    }

};


module.exports = TaskController;