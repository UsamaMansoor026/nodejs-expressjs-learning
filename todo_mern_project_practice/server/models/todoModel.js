const moongose = require("mongoose");

const todoSchema = moongose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Completed"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Todo = moongose.models.Todo || moongose.model("Todo", todoSchema);
module.exports = Todo;
