import React, { useState } from 'react';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onStatusChange, onDelete, onTaskClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Format deadline date for display
  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get styling based on priority level
  const getPriorityStyles = () => {
    switch (task.priority) {
      case 'high':
        return {
          borderColor: '#ef4444',
          badgeClass: styles.priorityHigh,
          badgeLabel: 'HIGH',
        };
      case 'medium':
        return {
          borderColor: '#f59e0b',
          badgeClass: styles.priorityMedium,
          badgeLabel: 'MEDIUM',
        };
      case 'low':
        return {
          borderColor: '#10b981',
          badgeClass: styles.priorityLow,
          badgeLabel: 'LOW',
        };
      default:
        return {
          borderColor: '#d1d5db',
          badgeClass: '',
          badgeLabel: task.priority.toUpperCase(),
        };
    }
  };

  const { borderColor, badgeClass, badgeLabel } = getPriorityStyles();

  return (
    <div
      className={styles.taskCard}
      style={{ borderLeftColor: borderColor }}
      onClick={onTaskClick}
    >
      {/* Priority Badge */}
      <div className={styles.cardHeader}>
        <span className={`${styles.priorityBadge} ${badgeClass}`}>
          {badgeLabel}
        </span>
      </div>

      {/* Task Title */}
      <h3 className={styles.taskTitle}>{task.title}</h3>

      {/* Task Description */}
      <p className={styles.taskDescription}>
        {task.description.length > 100
          ? `${task.description.substring(0, 100)}...`
          : task.description}
      </p>

      {/* Deadline */}
      <div className={styles.deadline}>
        <span className={styles.deadlineLabel}>Deadline:</span>
        <span className={styles.deadlineValue}>{formatDeadline(task.deadline)}</span>
      </div>

      {/* Status Dropdown and Delete Button */}
      <div className={styles.cardFooter}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={styles.statusSelect}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Delete button */}
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete();
            }
          }}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
