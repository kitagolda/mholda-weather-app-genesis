#!/bin/bash

check_db_connection() {
  echo > /dev/tcp/postgres/5432 2>/dev/null
}

until check_db_connection; do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up, running prisma db push"
npx prisma db push

node server/dist/index.js