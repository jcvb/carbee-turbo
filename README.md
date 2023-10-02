# Carbee Web Application

Carbee is a web application designed to compete with Curbee, focusing on optimizing performance over 3G cellular networks. This project is built using Next.js and leverages React-Bootstrap for styling. The backend is pre-filled with necessary data to simulate real-world interactions and API responses.

## Project Setup

### Getting Started

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/jcvb/carbee-turbo.git
  cd carbee-turbo
```

2. Install dependencies:

```bash
  npm install
```

3. Run the development server:

```bash
  npm run dev
```


Open http://localhost:3000 in your browser to view the project.

## Features
- User authentication and session persistence
- Display of user's appointments on a dashboard
- Showing appointment availability for a selected date

## Technologies Used
- Next.js
- React-Bootstrap
- TypeScript

## Styling
Styling is managed with React-Bootstrap, and the color palette is extended to match the Carbee brand colors. The fonts are defined in the global stylesheet (globals.scss) and imported into the project.

## API Endpoints
The backend APIs are utilized to authenticate users, retrieve appointment data, and check appointment availability for a given date.

- Authentication: POST /api/auth
- Fetching Appointments: GET /api/appointments
- Checking Availability: GET /api/availability/:date

API documentation can be found https://gist.github.com/oqx/3fe35dc32796a545213d7d478452abb8

## Version Control
The project is version-controlled using Git and hosted on GitHub. Commit messages and branching follow best practices to ensure a coherent history and clear steps of development.
