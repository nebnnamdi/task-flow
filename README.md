# Task-Flow

> A responsive task and project management application built with **Next.js, React, MongoDB, Mongoose, NextAuth and Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## Overview

Task-Flow is a web application for managing projects and tasks from a single dashboard. It was built as a practical full-stack React/Next.js project with a strong focus on responsive UI, reusable components, authentication flows, and interactive task management.

The project is also being developed as a portfolio application, with ongoing improvements focused on frontend quality, accessibility, testing, security, and maintainability.

## Live Demo

**Live application:** https://task-flow-n3b.vercel.app/

> The production deployment may require the environment variables described below to be configured.

## Features

### Authentication & account management

- User registration and login
- Credentials-based authentication with NextAuth
- Logout
- Forgot-password flow
- Password reset using a time-limited token
- Profile management
- Change-password flow
- Account deletion

### Project management

- Dashboard overview
- Create projects
- View project details
- Project members
- Project dates and descriptions
- Project deletion

### Task management

- Create tasks
- Assign tasks to users
- Associate tasks with projects
- Task priorities
- Task status updates
- Start and due dates
- Personal task view

### Frontend experience

- Responsive dashboard layout
- Desktop sidebar navigation
- Mobile navigation
- Reusable React components
- Loading skeletons
- Loading indicators
- Toast notifications
- Responsive forms and tables

## Tech Stack

| Technology           | Purpose                           |
| -------------------- | --------------------------------- |
| Next.js 16           | Application framework and routing |
| React 19             | UI development                    |
| Tailwind CSS 4       | Styling and responsive layouts    |
| MongoDB              | Application data storage          |
| Mongoose             | MongoDB data modelling            |
| NextAuth             | Authentication and sessions       |
| bcrypt               | Password hashing                  |
| Sonner               | Toast notifications               |
| Lucide / React Icons | UI icons                          |
| ESLint               | Code quality                      |
| Vercel               | Deployment                        |

## Application Architecture

The current application uses the Next.js App Router with a combination of server components, client components, server actions, and route handlers.

```text
                    Task-Flow
                        │
             ┌──────────┴──────────┐
             │                     │
        Public routes         Dashboard routes
             │                     │
      Login / Signup        Projects / Tasks
      Password reset          Settings
             │                     │
             └──────────┬──────────┘
                        │
                 Next.js / React
                        │
          ┌─────────────┼─────────────┐
          │             │             │
      Components   Server Actions   API Routes
          │             │             │
          └─────────────┼─────────────┘
                        │
                     Mongoose
                        │
                     MongoDB
```

A more detailed architecture and improvement plan is available in [`docs/architecture.md`](docs/architecture.md).

## Project Structure

```text
src/
├── actions/                 # Server actions
├── app/
│   ├── (home)/              # Authentication/public pages
│   ├── (dashboard)/         # Authenticated application pages
│   └── api/                 # Route handlers
├── components/              # Shared React components
├── lib/                     # Database and utility functions
├── model/                   # Mongoose models
├── queries/                 # Database operations used by API routes
├── auth.js                  # NextAuth configuration
└── proxy.js                 # Route protection / redirects
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nebnnamdi/task-flow.git
cd task-flow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root using `.env.example` as a starting point.

```bash
cp .env.example .env.local
```

Configure your MongoDB connection string and application URL before starting the application.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Run linting

```bash
npm run lint
```

## Environment Variables

The application currently expects the following environment variables:

```env
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never commit `.env.local` or production credentials to source control.

## Development Roadmap

Task-Flow is being improved in focused sprints, with the frontend developer experience as the primary portfolio goal.

- [x] Core authentication and account flows
- [x] Project management UI
- [x] Task management UI
- [x] Responsive dashboard navigation
- [x] Loading states and reusable UI components
- [ ] UI/UX visual polish
- [ ] Responsive experience refinement
- [ ] Component architecture cleanup
- [ ] Improved state and data-fetching UX
- [ ] Form validation and error-state improvements
- [ ] Accessibility audit
- [ ] Frontend testing
- [ ] Performance optimization
- [ ] Search, filtering and pagination

## Engineering Focus

The next development iterations focus on turning the existing application into a stronger production-style frontend portfolio project:

1. Improve visual consistency and UX states.
2. Strengthen responsive behavior across mobile, tablet and desktop.
3. Refine reusable React components and page composition.
4. Improve frontend state, data fetching and interaction feedback.
5. Add robust validation and user-friendly error handling.
6. Audit accessibility and keyboard navigation.
7. Add meaningful frontend tests.
8. Measure and improve performance.

Security and authorization issues identified during the review will also be addressed before the application is presented as production-ready.

## What I Learned

Task-Flow provides practical experience with:

- Building a multi-page React application with Next.js App Router
- Separating server and client responsibilities
- Creating reusable UI components
- Working with asynchronous data and loading states
- Implementing authentication flows
- Working with MongoDB through Mongoose
- Designing responsive layouts with Tailwind CSS
- Structuring a project for incremental feature development

## License

This project is licensed under the terms of the [MIT License](LICENSE).
