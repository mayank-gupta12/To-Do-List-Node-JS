const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const taskModel = new mongoose.Schema({
    title: String,
    desc: String,
    
})
const Task =  mongoose.model("task",taskModel);
module.exports = Task ;