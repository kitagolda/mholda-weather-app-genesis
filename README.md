# 🌤️ Weather Subscription App

## Overview

This is a simple weather subscription app that allows users to subscribe to weather updates for a specific city. The app uses the WeatherApi to fetch weather data and sends email notifications to subscribers.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Docker
- Nodemailer
- Vite

## ✨ Features

- Subscribe to weather updates by city and email
- Support for multiple cities and frequencies (daily / hourly)
- Email confirmation with token-based verification
- Cron-based scheduler for sending grouped updates
- Minimal frontend (no framework) served by Express
- PostgreSQL + Prisma ORM
- Docker-compatible setup

## Getting Started

## Prerequisites

Please configure your own local `.env` file with variables listed in `.env.example` file!

## Installation

You can run the app locally using Docker. Make sure you have Docker installed on your machine.

`docker-compose up --build`
