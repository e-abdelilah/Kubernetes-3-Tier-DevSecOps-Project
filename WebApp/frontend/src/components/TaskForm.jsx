import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onTaskAdded, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || null
      };

      if (editingTask) {
        await onTaskAdded(taskData, editingTask._id);
      } else {
        await onTaskAdded(taskData);
      }
      
      if (!editingTask) {
        setFormData({
          title: '',
          description: '',
          dueDate: ''
        });
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: ''
    });
    onCancelEdit();
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
        
        <div className="form-group">
          <label htmlFor="title">Title: *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;