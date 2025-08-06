const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, rating } = req.body;
    const task = new Task({ user: req.user, title, rating });
    await task.save();
    res.json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
};
