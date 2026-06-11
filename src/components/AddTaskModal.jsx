import React, { useState } from 'react';
import styles from './AddTaskModal.module.css';

const AddTaskModal = ({ onClose, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    deadline: '',
  });

  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Title must be at most 50 characters';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be at most 200 characters';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline = 'Deadline must be a future date';
      }
    }

    return newErrors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create task object with form data
    const newTask = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      deadline: formData.deadline,
    };

    onAddTask(newTask);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h2>Add New Task</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Task Title Input */}
          <div className={styles.formGroup}>
            <label htmlFor="title">TASK TITLE</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Design homepage"
              maxLength="50"
              className={errors.title ? styles.inputError : ''}
            />
            <div className={styles.helpText}>
              {formData.title.length}/50 characters
            </div>
            {errors.title && (
              <span className={styles.errorMessage}>{errors.title}</span>
            )}
          </div>

          {/* Description Input */}
          <div className={styles.formGroup}>
            <label htmlFor="description">DESCRIPTION</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the task..."
              maxLength="200"
              rows="4"
              className={errors.description ? styles.inputError : ''}
            />
            <div className={styles.helpText}>
              {formData.description.length}/200 characters
            </div>
            {errors.description && (
              <span className={styles.errorMessage}>{errors.description}</span>
            )}
          </div>

          {/* Priority and Status Row */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="priority">PRIORITY</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">STATUS</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Deadline Input */}
          <div className={styles.formGroup}>
            <label htmlFor="deadline">DEADLINE</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className={errors.deadline ? styles.inputError : ''}
            />
            {errors.deadline && (
              <span className={styles.errorMessage}>{errors.deadline}</span>
            )}
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.createBtn}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
