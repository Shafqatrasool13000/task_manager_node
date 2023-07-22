const { createCustomError } = require('../errors/custom-error');
const asyncWrapper = require('../middleware/async');
const Task = require('../models/Task');

const getTasks = asyncWrapper(
    async (_, res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    }
)

const createTask = asyncWrapper(
    async (req, res) => {
        const taskBody = req.body;
        const task = await Task.create(taskBody);
        res.status(201).json(task);
    }

);
const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (task) {
        return res.status(200).send({ task })
    }
    next(createCustomError(`Task not found with ${id}`, 404));

});

const editTask = asyncWrapper(async (req, res, next) => {
    const taskBody = req.body;
    const { id } = req.params
    console.log({ taskBody, id });
    const task = await Task.findOneAndUpdate({ _id: id }, taskBody, {
        new: true,
        runValidators: true
    });
    if (task) {
        return res.status(200).send({ task })
    }
    next(createCustomError(`Task not found with ${id}`, 404));
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id });
    if (task) {
        return res.status(200).send({ task })
    }
    next(createCustomError(`Task not found with ${id}`, 404));

});

module.exports = {
    getTasks,
    createTask,
    getTask,
    editTask,
    deleteTask
}