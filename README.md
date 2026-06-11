# Task Manager Application

A modern, responsive task management system built with React.js. Organize your work across three pipeline stages (To Do, In Progress, Done) with priority-based filtering and deadline tracking.

## 🚀 Features

- **User Authentication**: Secure login with JWT token management
- **Task Management**: Create, read, update, and delete tasks
- **Task Organization**: Organize tasks across three workflow columns (To Do, In Progress, Done)
- **Priority Filtering**: Filter tasks by Low, Medium, and High priority
- **Search Functionality**: Search tasks by title or description
- **Task Details**: View complete task information on dedicated detail page
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Persistent data storage across sessions
- **Protected Routes**: Secure dashboard and task detail pages with authentication

## 📋 Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher (or yarn)

## 🛠️ Installation & Setup

### 1. Clone or Extract the Repository

```bash
# If you have a zip file, extract it first
unzip task-manager.zip
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration (Optional)

Create a `.env` file in the root directory (optional, defaults are set):

```bash
# Copy from .env.example
cp .env.example .env
```

### 4. Start the Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📚 Project Structure

```
task-manager/
├── public/
│   └── index.html                 # Main HTML entry point
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx         # App header with user menu
│   │   │   └── Header.module.css
│   │   ├── TaskCard.jsx           # Individual task card component
│   │   ├── TaskCard.module.css
│   │   ├── AddTaskModal.jsx       # Modal for adding new tasks
│   │   └── AddTaskModal.module.css
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context provider
│   ├── hooks/
│   │   ├── useAuth.js             # Custom hook for auth context
│   │   └── useApi.js              # Custom hook for API calls
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── Login.jsx          # Login page component
│   │   │   └── Login.module.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx      # Main dashboard with task columns
│   │   │   └── Dashboard.module.css
│   │   ├── TaskDetail/
│   │   │   ├── TaskDetail.jsx     # Individual task detail page
│   │   │   └── TaskDetail.module.css
│   │   └── NotFound/
│   │       ├── NotFound.jsx       # 404 error page
│   │       └── NotFound.module.css
│   ├── styles/
│   │   └── global.css             # Global styles and resets
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css
│   ├── index.js                   # React DOM entry point
│   └── index.html
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔐 Authentication

### Test Credentials

Use these credentials to log in:

- **Email**: `sara@example.com`
- **Password**: `user123`

### How Authentication Works

1. User enters credentials on login page
2. Credentials are sent to the AWS Lambda API endpoint
3. On success, an authentication token is received
4. Token is stored in localStorage for session persistence
5. Protected routes check for valid token before granting access
6. Token is sent with authenticated requests if needed

## 🎯 Application Flow

```
Login Page ─→ Authentication ─→ Dashboard ─→ Task Management
                                    ↓
                            Task Detail View
```

### Routes

- `/login` - Login page (public)
- `/dashboard` - Main task dashboard (protected)
- `/task/:id` - Individual task details (protected)
- `*` - 404 Not Found page

## 💾 Data Storage

### Local Storage Keys

- `authToken` - JWT authentication token
- `user` - Authenticated user information (JSON)
- `tasks` - Task list data (JSON)

### Initial Data

The application comes with pre-loaded sample tasks covering:
- Brainstorming
- Research
- Wireframes
- Onboarding Illustrations
- Moodboard
- Mobile App Design
- Design System

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface matching current design trends
- **Color Scheme**: 
  - Primary: Indigo (#4f46e5)
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Danger: Red (#ef4444)
- **Typography**: System font stack for optimal performance
- **Spacing**: Consistent spacing and padding throughout
- **Animations**: Smooth transitions and hover effects

## 🔄 Task Management Features

### Creating Tasks

1. Click the "+ Add Task" button
2. Fill in task details:
   - **Title** (required, max 50 characters)
   - **Description** (optional, max 200 characters)
   - **Priority** (Low, Medium, High)
   - **Status** (To Do, In Progress, Done)
   - **Deadline** (required, must be future date)
3. Click "Create Task"

### Updating Tasks

1. Change task status from the dropdown in the task card
2. Status options: To Do → In Progress → Done

### Deleting Tasks

1. Click the "Delete" button on any task card
2. Confirm the deletion when prompted

### Filtering Tasks

1. **By Priority**: Use the priority dropdown to filter Low, Medium, or High priority tasks
2. **By Search**: Type in the search box to find tasks by title or description
3. Filters work together - both active filters apply simultaneously

### Viewing Task Details

1. Click on any task card to view full details
2. Details page shows:
   - Complete task description
   - Priority and status
   - Deadline
   - Task ID
   - Creation date

## 🚀 Building for Production

### Build Optimization

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Options

#### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

#### Option 3: Traditional Hosting

```bash
# Build the application
npm run build

# Upload the 'build' folder contents to your web server
```

## 🐛 Troubleshooting

### Issue: Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 Already in Use

```bash
# Use a different port
PORT=3001 npm start
```

### Issue: localStorage Not Working

- Check that localStorage is enabled in your browser
- Some browsers in private mode don't support localStorage
- Check browser console for errors

### Issue: API Calls Failing

- Verify internet connection
- Check that AWS endpoint is accessible
- Check browser console for CORS or network errors
- Verify credentials are correct

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Notes

⚠️ **Important**: 

- Never commit `.env` files with real credentials
- Use environment variables for sensitive data in production
- Test credentials provided are for development only
- Always use HTTPS in production
- Implement proper backend validation for all inputs

## 📄 Key Files Explained

### Context Files
- `AuthContext.jsx` - Manages authentication state globally using React Context API

### Hook Files
- `useAuth.js` - Provides easy access to auth context in any component
- `useApi.js` - Handles API calls with consistent error management

### Page Components
- `Login.jsx` - Handles user authentication and form validation
- `Dashboard.jsx` - Main task management interface with filtering
- `TaskDetail.jsx` - Shows detailed view of a single task
- `NotFound.jsx` - 404 error page for invalid routes

### Common Components
- `Header.jsx` - Navigation header with user dropdown menu
- `TaskCard.jsx` - Reusable task card component
- `AddTaskModal.jsx` - Modal dialog for creating new tasks

## 🎓 Learning Resources

The codebase demonstrates:
- React hooks (useState, useEffect, useContext)
- React Router for navigation
- Context API for state management
- CSS Modules for component styling
- Form validation and error handling
- Local storage usage
- Protected routes pattern
- Component composition and reusability

## 🤝 Code Quality

This implementation follows:
- React best practices and hooks patterns
- Clean code principles with meaningful variable names
- Proper component separation of concerns
- Consistent error handling
- Responsive design patterns
- Accessibility considerations (ARIA labels, keyboard navigation)

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the code comments for specific functionality
3. Verify all dependencies are correctly installed
4. Check browser console for error messages

## 📝 License

This project is created for educational purposes as part of the NxtWave placement process.

---

**Happy task managing! 🚀**

Built with React.js | Styled with CSS Modules | Deployed with ❤️
