# Task-Flow Architecture Notes

This document describes the current application structure and the direction of the planned improvements.

## Current request flow

```text
Browser
  │
  ├── Public pages
  │     ├── Login
  │     ├── Signup
  │     ├── Forgot password
  │     └── Reset password
  │
  └── Dashboard
        ├── Dashboard
        ├── Projects
        ├── Tasks
        └── Settings
              │
              ▼
       React client components
              │
       ┌──────┴──────┐
       │             │
 Server Actions   Route Handlers
       │             │
       └──────┬──────┘
              ▼
           Mongoose
              ▼
           MongoDB
```

## Frontend architecture goals

The frontend should gradually move toward a clear component hierarchy:

```text
components/
├── ui/                 # Generic reusable UI primitives
├── dashboard/          # Dashboard-specific components
├── projects/           # Project-specific components
├── tasks/              # Task-specific components
├── settings/           # Account/settings components
└── navigation/         # Header/sidebar/mobile navigation
```

The aim is not to create components for everything. A component should generally be extracted when it is reusable, independently testable, or makes a page significantly easier to understand.

## Data-flow goals

For authenticated pages, the preferred direction is:

```text
Authenticated session
        │
        ▼
Server determines user identity
        │
        ▼
Server fetches only permitted data
        │
        ▼
UI receives the required data
        │
        ▼
User interaction
        │
        ▼
Validated server mutation
        │
        ▼
UI reflects success or failure
```

Client-supplied identity values such as email addresses should not be treated as proof of identity for sensitive operations. The server should derive identity from the authenticated session and then perform authorization checks.

## Planned frontend improvements

### Sprint 1 — Presentation & UI polish

- Improve visual consistency
- Standardize UI states
- Improve empty/error/loading states
- Improve README and project documentation

### Sprint 2 — Responsive design

- Audit all pages on mobile, tablet and desktop
- Improve navigation and touch targets
- Fix table and form overflow
- Improve responsive typography and spacing

### Sprint 3 — Component architecture

- Identify repeated UI patterns
- Consolidate reusable primitives
- Separate feature components from generic UI components
- Improve naming and file organization

### Sprint 4 — State and interaction UX

- Improve data fetching states
- Improve optimistic updates where appropriate
- Add search/filter/sort interactions
- Improve feedback after mutations

### Sprint 5 — Forms and validation

- Introduce shared validation schemas
- Improve field-level validation feedback
- Standardize submit/loading/error behavior

### Sprint 6 — Accessibility

- Semantic HTML
- Keyboard navigation
- Focus management
- Accessible labels and descriptions
- Dialog/dropdown accessibility
- Color contrast review

### Sprint 7 — Testing and performance

- Component tests
- Critical user-flow tests
- Performance audit
- Reduce unnecessary client-side work
- Review server/client component boundaries

### Sprint 8 — Portfolio presentation

- Final screenshots
- Architecture diagram
- Case study
- Recruiter-focused README
- Interview talking points
