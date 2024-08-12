const { User } = require('../models');

const UserController = {
    async index(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching users' });
        }
    },

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the user' });
        }
    },

    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    },

    async update(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    },

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                user.deleted = true;
                await user.save();
                res.json({ message: 'User marked as deleted', user });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while marking the user as deleted' });
        }
    }
};

module.exports = UserController;
