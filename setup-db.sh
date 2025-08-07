#!/usr/bin/env bash

echo "Creating Database and Infrastructure..."

# Run Docker Compose
docker-compose -f docker-compose-db-infra.yaml up -d

if [ $? -ne 0 ]; then
  echo "❌ Failed to run Docker Compose."
  read -n1 -s -r -p "Press any key to continue..."
  echo
  exit 1
fi

echo "✅ Database and Infrastructure setup completed successfully."
read -n1 -s -r -p "Press any key to continue..."
echo
