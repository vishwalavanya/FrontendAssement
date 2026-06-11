import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/common/Header';
import styles from './TaskDetail.module.css';

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Here I am  Trying to get task from route state first, otherwise retrieve from localStorage
  useEffect(() => {
    if (location.state?.task) {
      // Task was passed through navigation state
      setTask(location.state.task);
      setIsLoading(false);
    } else {
      // Retrieve task from localStorage by ID
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const foundTask = tasks.find((t) => t.id === parseInt(id));
        if (foundTask) {
          setTask(foundTask);
        }
      }
      setIsLoading(false);
    }
  }, [id, location]);

  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

 
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };

 
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'todo':
        return styles.statusTodo;
      case 'inprogress':
        return styles.statusInProgress;
      case 'done':
        return styles.statusDone;
      default:
        return '';
    }
  };


  const formatStatus = (status) => {
    const statusMap = {
      todo: 'To Do',
      inprogress: 'In Progress',
      done: 'Done',
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Header user={user} onLogout={handleLogout} />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className={styles.container}>
        <Header user={user} onLogout={handleLogout} />
        <div className={styles.content}>
          <div className={styles.notFound}>
            <h2>Task not found</h2>
            <p>The task you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/dashboard')} className={styles.backBtn}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header user={user} onLogout={handleLogout} />

      <div className={styles.content}>
        
        <button onClick={() => navigate('/dashboard')} className={styles.backLink}>
          ← Back to board
        </button>

        
        <div className={styles.taskHeader}>
          <div className={styles.headerTop}>
            <span className={`${styles.priorityBadge} ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
          <h1>{task.title}</h1>
        </div>

        
        <div className={styles.metadataSection}>
          <div className={styles.metadataRow}>
            <span className={styles.metadataLabel}>Status</span>
            <span className={`${styles.statusBadge} ${getStatusBadgeClass(task.status)}`}>
              {formatStatus(task.status)}
            </span>
          </div>

          <div className={styles.metadataRow}>
            <span className={styles.metadataLabel}>Deadline</span>
            <span className={styles.metadataValue}>{formatDate(task.deadline)}</span>
          </div>
        </div>

        
        <div className={styles.descriptionSection}>
          <h2>DESCRIPTION</h2>
          <p className={styles.description}>{task.description}</p>
        </div>

        
        <div className={styles.infoSection}>
          {task.createdAt && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Created on</span>
              <span className={styles.infoValue}>{formatDate(task.createdAt)}</span>
            </div>
          )}

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Task ID</span>
            <span className={styles.infoValue}>#{task.id}</span>
          </div>
        </div>
      </div>

      <button
        className={styles.addTaskBtn}
        onClick={() => navigate('/dashboard')}
        title="Go back to dashboard"
      >
        + Add Task
      </button>
    </div>
  );
};

export default TaskDetail;
