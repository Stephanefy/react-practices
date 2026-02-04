# Kanban Board Application

A work-in-progress Kanban board application built with React, TypeScript, and Tailwind CSS. This is a learning project focused on building a functional task management system with modern React patterns.

## Current Status

⚠️ **This project is actively being developed.** Some features may be incomplete, buggy, or subject to change.

### What's Working

- Basic board and column structure with sample data
- Task display with subtasks
- Dark/light theme toggle
- Responsive layout
- Sidebar navigation
- Modal system for various operations
- CRUD (Task addition | Task deletion)

### In Progress/Planned

- Drag & drop functionality (Improve precision of the drop event)
- Drag & drop of Columns
- Task CRUD operations (edit task, completion status and content edition)
- Board management features
- Better mobile experience
- Search and filtering capabilities

## Features

### Core Functionality

- **Board Display**: View multiple boards with column-based layout
- **Task Management**: Basic task display with subtask tracking
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices

### User Interface

- **Sidebar Navigation**: Collapsible sidebar for board switching
- **Modal System**: Portal-based modals for task and board operations
- **Mobile Menu**: Basic mobile navigation (in progress)
- **Clean Design**: Tailwind CSS based design system

## Tech Stack

- **Frontend Framework**: React 18.2.0 with TypeScript
- **Build Tool**: Vite for fast development
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **State Management**: React Context API

### Key Dependencies

- `@headlessui/react` - UI components
- `@heroicons/react` - Icon library
- `@tailwindcss/forms` - Form styling
- `clsx` - CSS class management
- `immer` - State updates
- `nanoid` - ID generation

## Project Structure

```
src/
├── components/           # UI components
│   ├── modals/          # Modal components
│   ├── portal/          # Portal components for modals
│   └── ...              # Individual components
├── context/             # React Context providers
│   ├── AppContext.tsx   # Global app state
│   ├── BoardContext.tsx # Board-specific state
│   └── ModalContext.tsx # Modal state management
├── hooks/               # Custom React hooks
│   ├── useBoards.ts     # Board management logic
│   ├── useDarkTheme.ts  # Theme management
│   └── useDimensions.ts # Dimension calculations
├── assets/              # Static assets and data
│   ├── data.json        # Sample board data
│   └── ...              # Images and icons
└── lib/                 # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
  ```bash
   cd apps/kanban-app-front
  ```
2. **Install dependencies**
  ```bash
   npm install
  ```
3. **Start development server**
  ```bash
   npm run dev
  ```
4. **Open your browser**
  Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## Usage

### Current Functionality

- **View Boards**: Switch between different boards using the sidebar
- **View Tasks**: Click on tasks to see details and subtasks
- **Toggle Theme**: Switch between light and dark themes
- **Responsive View**: Works on different screen sizes

### What's Being Developed

- Task creation and editing
- Board management
- Drag and drop functionality
- Search and filtering

## Data Structure

The application uses a hierarchical data structure:

```typescript
{
  boards: [
    {
      name: string,
      columns: [
        {
          name: string,
          tasks: [
            {
              title: string,
              description: string,
              status: string,
              subtasks: [
                {
                  title: string,
                  isCompleted: boolean,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
```

## Architecture

### State Management

- **Context API**: Global state management using React Context
- **Custom Hooks**: Reusable logic extracted into custom hooks

### Component Architecture

- **Separation of Concerns**: UI components and business logic
- **Portal Pattern**: Modal components rendered outside the DOM hierarchy

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: CSS custom properties for theme switching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learning Goals

This project is built to practice:

- React with TypeScript
- Modern React patterns (Context, Hooks)
- Component architecture
- State management
- Responsive design
- CSS frameworks (Tailwind)

## Acknowledgments

- Built as a learning project for React and TypeScript development
- Practice project for modern React patterns

