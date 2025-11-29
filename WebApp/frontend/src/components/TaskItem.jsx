import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-status">
            {task.completed && <span className="status-badge completed">Completed</span>}
            {isOverdue() && <span className="status-badge overdue">Overdue</span>}
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <div className="meta-item">
            <span className="meta-label">Due:</span>
            <span className="meta-value">{formatDate(task.dueDate)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created:</span>
            <span className="meta-value">
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task._id, !task.completed)}
          className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="btn btn-info"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(task._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;