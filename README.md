# Restaurant Reservation Next.js 13 Web App

This is a web application inspired by OpenTable's table booking system, which allows customers to reserve a table at a restaurant of their choice. The app is built using Next.js 13, a popular React framework that provides server-side rendering and other performance optimizations out of the box.

The app features a robust table booking system that displays available booking times to users, allowing them to quickly and easily make a reservation. It also includes an authentication system that allows users to create accounts, sign in, and store their session information using cookies.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Create a `.env.local` file in the root directory of the project, and add the necessary environment variables, such as database credentials and authentication secrets.
4. Start the development server by running `npm run dev`.

## Features

- **Robust Table Booking System:** The app displays available booking times for users to choose from, and allows them to select their desired date and time. The system also includes features for managing reservations, such as canceling and rescheduling bookings.
- **Tailwind CSS Styling:** The app uses Tailwind CSS, a popular utility-first CSS framework, for styling. This makes it easy to customize the look and feel of the app.
- **Signin/Signup Authentication System:** Users can create accounts and sign in to the app to access features such as managing their reservations and viewing their booking history.
- **Cookie-based Session Management:** The app uses cookies to store user session information, such as their authentication status and other preferences.
- **PostgreSQL Database with Prisma ORM:** The app uses a PostgreSQL database hosted on Supabase, and utilizes the Prisma ORM for database access and management.

## Technologies Used

- Next.js 13
- React
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Supabase
- JWT Authentication
