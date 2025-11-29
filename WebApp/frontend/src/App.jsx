import React, { useState, useEffect } from 'react';
import { taskAPI } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData, taskId = null) => {
    try {
      setError('');
      let response;

      if (taskId) {
        response = await taskAPI.updateTask(taskId, taskData);
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task._id === taskId ? response.data : task
          )
        );
        setEditingTask(null);
      } else {
        response = await taskAPI.createTask(taskData);
        setTasks(prevTasks => [response.data, ...prevTasks]);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      setError('Failed to save task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setError('');
        await taskAPI.deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      setError('');
      const response = await taskAPI.updateTask(taskId, { completed });
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId ? response.data : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>📝 Task Manager</h1>
          <p>Organize your tasks efficiently</p>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError('')} className="close-error">×</button>
            </div>
          )}

          <div className="app-layout">
            <div className="sidebar">
              <TaskForm
                onTaskAdded={handleAddTask}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="main-content">
              <div className="content-header">
                <h2>Your Tasks</h2>
                <div className="task-stats">
                  <span className="stat total">Total: {tasks.length}</span>
                  <span className="stat pending">Pending: {pendingTasks.length}</span>
                  <span className="stat completed">Completed: {completedTasks.length}</span>
                </div>
                <button 
                  onClick={fetchTasks} 
                  className="btn btn-secondary refresh-btn"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading tasks...</p>
                </div>
              ) : (
                <>
                  {pendingTasks.length > 0 && (
                    <div className="task-section">
                      <h3 className="section-title">Pending Tasks ({pendingTasks.length})</h3>
                      <TaskList
                        tasks={pendingTasks}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                      />
                    </div>
                  )}

                  {completedTasks.length > 0 && (
                    <div className="task-section">
                      <h3 className="section-title">Completed Tasks ({completedTasks.length})</h3>
                      <TaskList
                        tasks={completedTasks}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <div className="container">
          <p>@ abdelilahettarch.com</p>
        </div>
      </footer>
    </div>
  );
}

export default App;