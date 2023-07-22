const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task Name is Required'],
        trim: true,
        maxLength: [20, 'Name Should Less than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
});
module.exports = mongoose.model("Task", TaskSchema);
