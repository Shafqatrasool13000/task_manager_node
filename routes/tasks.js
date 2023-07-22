const express = require('express');
const router = express.Router();
const { getTasks, createTask, editTask, getTask, deleteTask } = require('../controllers/tasks')

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).patch(editTask).delete(deleteTask);

module.exports = router;
