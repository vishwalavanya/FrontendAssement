import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import TaskCard from '../../components/TaskCard';
import AddTaskModal from '../../components/AddTaskModal';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Here Task state management
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  //Here Filter state
  const [priorityFilter, setPriorityFilter] = useState('all');

  //  Here Initialize tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      
      const initialTasks = [
        {
          id: 2,
          title: 'Brainstorming',
          description:
            "Brainstorming brings team members' diverse experience into play. Run timed ideation rounds, capture every idea without judgement, then cluster themes and vote on directions. Document assumptions, risks, and dependencies so the team can align on scope before detailed planning begins.",
          priority: 'low',
          status: 'todo',
          deadline: '2024-12-05',
          createdAt: new Date().toISOString(),
        },
        {
          id: 1,
          title: 'Research',
          description:
            'User research helps you to create an optimal product for users. Plan interviews and contextual inquiry, synthesise findings into personas and journey maps, and translate insights into measurable problems. Share a concise readout with design and engineering so decisions stay grounded in evidence.',
          priority: 'high',
          status: 'todo',
          deadline: '2024-12-06',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: 'Wireframes',
          description:
            'Low fidelity wireframes include the most basic content and visuals. Map primary flows, empty states, and error paths at grayscale fidelity before polishing UI. Annotate interactions and data requirements so developers can estimate effort and spot edge cases early in the lifecycle.',
          priority: 'high',
          status: 'todo',
          deadline: '2024-12-05',
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          title: 'Onboarding Illustrations',
          description:
            'Create engaging illustrations for the onboarding flow. Establish a consistent character style, export assets for light and dark themes, and coordinate with copy for pacing across screens. Deliver SVG or PNG sets with a simple usage guide for engineers implementing animations.',
          priority: 'low',
          status: 'inprogress',
          deadline: '2024-12-05',
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          title: 'Moodboard',
          description:
            'Build a visual moodboard for the new design direction. Collect typography, colour, photography, and spatial references that express the brand tone. Present rationale for each cluster and capture stakeholder feedback in a single source of truth the team can revisit during visual design.',
          priority: 'low',
          status: 'inprogress',
          deadline: '2024-12-06',
          createdAt: new Date().toISOString(),
        },
        {
          id: 6,
          title: 'Mobile App Design',
          description:
            'Design the complete mobile app screens. Cover navigation patterns, accessibility targets, and responsive breakpoints. Hand off redlines, component specs, and prototype links so QA can validate flows against acceptance criteria before release candidates go to the store.',
          priority: 'medium',
          status: 'done',
          deadline: '2024-12-06',
          createdAt: new Date().toISOString(),
        },
        {
          id: 7,
          title: 'Design System',
          description:
            'It just needs to adapt the UI from what you did before. Audit existing components, define tokens for spacing and colour, and publish documentation with live examples. Set governance for contributions and versioning so product teams can ship consistently without reinventing patterns each sprint.',
          priority: 'medium',
          status: 'done',
          deadline: '2024-12-06',
          createdAt: new Date().toISOString(),
        },
      ];

      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Here Applying filters when tasks or priority filter changes
  useEffect(() => {
    let filtered = tasks;

    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, priorityFilter]);

  
  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowAddModal(false);
  };

  // Here I  Update existing task
  const handleUpdateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //Here I Delete a task from the list
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  const getTaskCount = (status) => {
    return filteredTasks.filter((task) => task.status === status).length;
  };

  const todoTasks = filteredTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter((task) => task.status === 'inprogress');
  const doneTasks = filteredTasks.filter((task) => task.status === 'done');

  return (
    <div className={styles.dashboardContainer}>
     
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
         
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15V9M12 15V7M17 15V11" />
              </svg>
            </div>
            <h1 className={styles.appName}>Task Manager</h1>
            <p className={styles.subtitle}>Project Dashboard</p>
          </div>

        
          <button
            className={styles.addTaskBtn}
            onClick={() => setShowAddModal(true)}
          >
            + Add Task
          </button>

          <button
            className={styles.logoutBtn}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      
      <main className={styles.mainContent}>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Filter by priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={styles.prioritySelect}
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.columnsContainer}>
        
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.columnIcon} style={{ borderColor: '#3b82f6' }}>
                  ●
                </div>
                <h3>TO DO</h3>
              </div>
              <span className={styles.taskCount}>{filteredTasks.filter((task) => task.status === 'todo').length}</span>
            </div>

            <div className={styles.tasksList}>
              {filteredTasks.filter((task) => task.status === 'todo').length > 0 ? (
                filteredTasks
                  .filter((task) => task.status === 'todo')
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={(newStatus) => {
                        const updatedTasks = tasks.map((t) =>
                          t.id === task.id ? { ...t, status: newStatus } : t
                        );
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onDelete={() => {
                        const updatedTasks = tasks.filter((t) => t.id !== task.id);
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onTaskClick={() => navigate(`/task/${task.id}`, { state: { task } })}
                    />
                  ))
              ) : (
                <div className={styles.emptyState}>No tasks here</div>
              )}
            </div>
          </div>

         
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.columnIcon} style={{ borderColor: '#f59e0b' }}>
                  ●
                </div>
                <h3>IN PROGRESS</h3>
              </div>
              <span className={styles.taskCount}>{filteredTasks.filter((task) => task.status === 'inprogress').length}</span>
            </div>

            <div className={styles.tasksList}>
              {filteredTasks.filter((task) => task.status === 'inprogress').length > 0 ? (
                filteredTasks
                  .filter((task) => task.status === 'inprogress')
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={(newStatus) => {
                        const updatedTasks = tasks.map((t) =>
                          t.id === task.id ? { ...t, status: newStatus } : t
                        );
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onDelete={() => {
                        const updatedTasks = tasks.filter((t) => t.id !== task.id);
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onTaskClick={() => navigate(`/task/${task.id}`, { state: { task } })}
                    />
                  ))
              ) : (
                <div className={styles.emptyState}>No tasks here</div>
              )}
            </div>
          </div>

          
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.columnIcon} style={{ borderColor: '#10b981' }}>
                  ●
                </div>
                <h3>DONE</h3>
              </div>
              <span className={styles.taskCount}>{filteredTasks.filter((task) => task.status === 'done').length}</span>
            </div>

            <div className={styles.tasksList}>
              {filteredTasks.filter((task) => task.status === 'done').length > 0 ? (
                filteredTasks
                  .filter((task) => task.status === 'done')
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={(newStatus) => {
                        const updatedTasks = tasks.map((t) =>
                          t.id === task.id ? { ...t, status: newStatus } : t
                        );
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onDelete={() => {
                        const updatedTasks = tasks.filter((t) => t.id !== task.id);
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                      }}
                      onTaskClick={() => navigate(`/task/${task.id}`, { state: { task } })}
                    />
                  ))
              ) : (
                <div className={styles.emptyState}>No tasks here</div>
              )}
            </div>
          </div>
        </div>
      </main>

    
      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAddTask={(newTask) => {
            const taskWithId = {
              ...newTask,
              id: Math.max(...tasks.map((t) => t.id), 0) + 1,
              createdAt: new Date().toISOString(),
            };
            const updatedTasks = [...tasks, taskWithId];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
