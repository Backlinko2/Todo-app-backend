const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
});

router.post('/', authMiddleware, async (req, res) => {
    const { title, rating } = req.body;
    const task = new Task({ title, rating, user: req.user });
    await task.save();
    res.json(task);
});

module.exports = router;
