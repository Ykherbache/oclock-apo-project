#!/bin/bash
export DB_USERNAME=root
export DB_PASSWORD=toor
export DB_NAME=good_lock
export DUMP_FILE_PATH=../../back/db/data_dump.sql
export DOCKER_CONTAINER_NAME=mysql_atelier

# This script is used to reset a MySQL database and run migrations.
# It should be run with the following environment variables set:
#   DB_USERNAME: The username for the MySQL server
#   DB_PASSWORD: The password for the MySQL server
#   DB_NAME: The name of the database to reset

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Define required variables
REQUIRED_VARS=("DB_USERNAME" "DB_PASSWORD" "DB_NAME"  "DOCKER_CONTAINER_NAME" "DUMP_FILE_PATH")

# Echo instructions
echo -e "${YELLOW}This script should be run with the following environment variables set:"
echo -e "export DB_USERNAME=<your_db_username>"
echo -e "export DB_PASSWORD=<your_db_password>"
echo -e "export DB_NAME=<your_db_name>"
echo -e "export DUMP_FILE_PATH=<your_dump_sql_file_path>"
echo -e "export DOCKER_CONTAINER_NAME=<your_docker_container_name>"
echo -e "Once these are set, you can run the script with: ./reset-db.sh${NC}"

# Check if environment variables are set
for VAR_NAME in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!VAR_NAME}" ]]; then
    echo -e "${RED}$VAR_NAME is not set.${NC}"
    echo -e "${YELLOW}Please set it using the following command:"
    echo -e "export $VAR_NAME=<value>${NC}"
    exit 1
  fi
done

# Drop the database
echo -e "${GREEN}Dropping database $DB_NAME...${NC}"
docker exec $DOCKER_CONTAINER_NAME mysql -u $DB_USERNAME -p$DB_PASSWORD -e "DROP DATABASE IF EXISTS $DB_NAME;"

# Create the database and use it
echo -e "${GREEN}Creating database $DB_NAME...${NC}"
docker exec $DOCKER_CONTAINER_NAME mysql -u $DB_USERNAME -p$DB_PASSWORD -e "CREATE DATABASE $DB_NAME;"

# Copy the SQL file to the Docker container
docker cp $DUMP_FILE_PATH $DOCKER_CONTAINER_NAME:/tmp.sql

# Import the SQL file
echo -e "${GREEN}Importing SQL file $DUMP_FILE_PATH...${NC}"
docker exec $DOCKER_CONTAINER_NAME bash -c "mysql -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME < /tmp.sql"

# Remove the SQL file from the Docker container
docker exec $DOCKER_CONTAINER_NAME rm /tmp.sql

echo -e "${GREEN}Database seeded successfully!${NC}"

