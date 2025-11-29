import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <div className="no-tasks-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;