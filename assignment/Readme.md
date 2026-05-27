# Software Internship Assignment - CRUD API & Dynamic Form Validator

## Project Overview

This is a comprehensive full-stack web application developed as part of a software development internship assignment. The project demonstrates proficiency in modern web development practices, including RESTful API integration, state management, responsive design, and dynamic form validation.

### Key Objectives

1. **CRUD Operations**: Implement complete Create, Read, Update, Delete functionality using the JSONPlaceholder fake REST API
2. **Dynamic Form Validation**: Build a configurable, real-time form validation system with customizable rules
3. **Professional UI/UX**: Create a responsive, single-page application (SPA) with smooth animations and modal interactions

## Features

### CRUD API Module
- ✅ **Create Posts**: Modal-based form for creating new blog posts
- ✅ **Read Posts**: Display posts with optimized pagination (10 posts per page)
- ✅ **Update Posts**: Inline editing with pre-filled modal forms
- ✅ **Delete Posts**: Custom confirmation modal with safety warnings
- ✅ **Smart Caching**: 5-minute cache system to reduce API latency
- ✅ **Pagination**: Smooth navigation between pages with page indicators
- ✅ **Loading States**: Animated spinners during API calls
- ✅ **Toast Notifications**: Real-time feedback for all user actions

### Dynamic Form Validator Module
- ✅ **Real-time Validation**: Instant feedback as users type
- ✅ **Configurable Rules**: JSON-based validation configuration
- ✅ **Multiple Validation Types**:
  - Required field validation
  - Regex pattern matching (email, phone, password)
  - Minimum/Maximum length constraints
  - Custom validation logic (age range)
- ✅ **Password Strength**: Enforces uppercase, lowercase, numbers, and special characters
- ✅ **Error Display**: Animated error messages with field highlighting
- ✅ **No Page Reloads**: Pure client-side validation

### Additional Features
- ✅ **Responsive Design**: Fully functional on mobile, tablet, and desktop
- ✅ **Single Page Application**: Smooth navigation between modules
- ✅ **Modal Dialogs**: Professional modal windows for forms and confirmations
- ✅ **Animations**: Smooth transitions and micro-interactions
- ✅ **Accessibility**: Semantic HTML and ARIA-friendly components

## Technologies Used

### Frontend
 HTML5 
 CSS3 -  Styling, animations, responsive design 
 JavaScript - Application logic, DOM manipulation 
 Font Awesome - icon set 

### API Integration
 JSONPlaceholder - Fake REST API for testing CRUD operations 
 Fetch API - Native browser API for HTTP requests 

### Development Practices
- **Modular Architecture**: Separated concerns into multiple JavaScript modules
- **State Management**: Client-side state with caching mechanism
- **Performance Optimization**: Debouncing, pagination, and lazy loading
- **Error Handling**: Comprehensive try-catch blocks and user feedback
- **Security**: XSS prevention with HTML escaping

##  Project Structure
assignment/
│
├── index.html # Main application entry point
├── css/
| ├── global.css # Global styles and animations
│
├── js/ # JavaScript modules
│ ├── main.js # Application initialization & navigation
│ ├── api.js # CRUD operations & API integration
│ ├── validator.js # Dynamic form validation logic
│ └── utils.js # Helper functions & utilities
│
└── README.md # Project documentation


### Module Description

#### `main.js`
- Entry point of the application
- Initializes all modules
- Sets up navigation between views
- Manages modal dialogs and global event handlers

#### `crud-manager.js`
- Handles all CRUD operations
- Manages API calls to JSONPlaceholder
- Implements caching and pagination
- Renders posts dynamically

#### `form-validator.js`
- Configurable validation engine
- Real-time field validation
- Error message management
- Form submission handling

#### `utils.js`
- Toast notification system
- HTML escaping for security
- Debouncing for performance
- Helper functions and utilities

## Getting Started

### Prerequisites
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Internet Connection**: Required for CDN resources and API calls
- **Code Editor** (optional): VS Code, Sublime Text, or any text editor

### Usage Guide
**CRUD Operations Module**
- Creating a Post
    Click the "Create New Post" button in the CRUD view
    Fill in the title and content in the modal dialog
    Click "Create Post" to save
    The new post appears at the top of the list

- Reading Posts
    Posts are automatically loaded on page load
    Navigate through pages using Previous/Next buttons
    Each post displays title and content

- Updating a Post
    Click the "Edit" button on any post card
    Modify the title or content in the modal
    Click "Update Post" to save changes

- Deleting a Post
    Click the "Delete" button on any post
    Confirm deletion in the confirmation modal
    The post is removed from the list

**Form Validator Module**
- Validation Rules

Full Name ->	Required || 2-100 characters
Email ->    Required || valid email format	(with .,@)
Password ->	Required || 8+ chars | uppercase | lowercase | number | special char	
Phone ->	Required ||	
Age	Optional, 18-120 years	



