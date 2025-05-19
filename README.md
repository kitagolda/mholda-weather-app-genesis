# 🌤️ Weather Subscription App

## Overview

This is a simple weather subscription app that allows users to subscribe to weather updates for a specific city. The app uses the WeatherApi to fetch weather data and sends email notifications to subscribers.

## 🔨 Technologies Used

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Docker
- Nodemailer
- Vite
- TailwindCSS

## ✨ Features

- Subscribe to weather updates by city and email
- Support for multiple cities and frequencies (daily / hourly)
- Email confirmation with token-based verification
- Cron-based scheduler for sending grouped updates
- Minimal frontend (no framework) served by Express
- PostgreSQL + Prisma ORM
- Docker-compatible setup

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (for PostgreSQL)
- PostgreSQL (if not using Docker)
- WeatherApi key (sign up at [WeatherAPI](https://www.weatherapi.com/) to get your API key)
- Gmail application password for sending emails with Nodemailer

Please make sure to set up your environment variables in a `.env` file. You can use the provided `.env.example` as a template.

### Start the Application

You can use docker-compose to start the whole application. Server and Client will be served from the same Express server.

```bash
docker-compose up
```

Or you can start the server and client separately. Make sure to install the dependencies first and run the migrations.

```bash
# Install dependencies
npm install
# Run migrations
npx prisma migrate dev
# Start the server
npm run server:dev
# Start the client
npm run client:dev
# Or start both
npm run dev
```

## 🤔 What and Why(my thoughts(pretty messy))

While scope of that showcase application is intentionally pretty simple, yet there's always that temptation to add more features and overcomplicate things.
For me, the goal was to create a pretty simple codebase with tech stack that allows to bootstrap those types of applications quickly. But still trying to keep that balance between simplicity and maintainability.
That's why you won't find any FE frameworks here, even no template engines. I just added TailwindCSS for better DX. Yeah, I like it a little bit more than regular CSS. Without it we wouldn't even need a build step for FE, but it is what it is.
For same reasons I have chosen Prisma as ORM. For me, it is a great tool to quickly bootstrap a database layer. It has a great DX and automatic type generation. You won't find many cases of generated types usages in the codebase. I tried to keep it simple and readable. But still, I think that Prisma is a great tool for that type of application.
I guess most of the decisions were made based on my desire to keep things simple and readable. Haven't written BE for a while, hope it isn't too bad.

### Chunk notifications

I guess I haven't understood the 'Subscribe a given email to weather updates for a given city with a given frequency (daily or hourly)' so I decided to implement notifications in a way that they wouldn't spam the user with lots of emails.
My approach is to group subscriptions by user and frequency. So if you subscribe to 3 cities with daily frequency, you will receive 1 email with all 3 cities in it. Also, I changed unsubscribe logic a little bit. I thought that it would be better to unsubscribe from all cities with the same frequency, instead of unsubscribing from each city separately. I guess it is a little bit more user friendly.

### What could be improved

- Better code quality: setup eslint, prettier, husky, etc. Would be pretty critical if that was a group project.
- FE could be improved a lot. It is a little bit toooo simple: user has to enter email every time he wants to subscribe. No remember me. No ability to unsubscribe from web interface, only via email. Can't see all subscriptions, etc.
- Deployment: I haven't deployed it yet. Of course, if it was a real project we would deploy it with proper CI/CD pipeline, maybe external scheduler, maybe some cache layer, etc.
- Tests: I haven't written any tests. I guess it would be a good idea to write some unit tests for the backend and maybe some e2e tests for the frontend.
- Logging: I haven't added any logging. It would be a good idea to add some logging to the application. Maybe even some monitoring.

Many-many temptations I had to resist. Anyways, I'm pretty happy that I had an opportunity to switch from frontend to backend again for a while. Deadlines are doing miracles. Thanks for that.
