const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find().sort({createdAt: -1});
        res.json(tasks);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const task  = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})


router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title != null) task.title = req.body.title;
    if (req.body.description != null) task.description = req.body.description;
    if (req.body.completed != null) task.completed = req.body.completed;
    if (req.body.dueDate != null) task.dueDate = req.body.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;