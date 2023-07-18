#!/bin/bash

# load utils.sh
source utils.sh

# Environment variables
export DB_USERNAME=root
export DB_PASSWORD=toor
export DB_NAME=good_lock
export DOCKER_CONTAINER_NAME=mysql_atelier
export JSON_FILES_DIR=tmp

# MySQL Queries
declare -A queries=(
  ["Games"]="INSERT INTO Games (id, name, description, publisher_id, category_id, mechanics_type_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), publisher_id = VALUES(publisher_id), category_id = VALUES(category_id), mechanics_type_id = VALUES(mechanics_type_id); description = VALUES(description);"
  ["Categories"]="INSERT INTO Categories (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name);"
  ["Mechanics_Type"]="INSERT INTO Mechanics_Type (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name);"
  ["Publishers"]="INSERT INTO Publishers (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name);"
)

# Store the SQL queries
declare -A sql_queries

# Function to upsert data into Games table
function upsert_data_simple() {
    local table_name=$1
    local file_name=$2
    local id_field=$3  # New argument for the field name to build the id
    local query=${queries[$table_name]}
    # Start the timer
    start_timer
    echo "Upserting data for $table_name table..."
    local upsert_query=""
    while IFS='' read -r row; do
        local id=$(echo "$row" | jq -r ".$id_field")  # Build the id using the provided field name
        local name=$(echo "$row" | jq -r '.name' | sed "s/'/''/g")  # Escape single quotes
        echo "Upserting record: ID=$id, Name=$name"
        upsert_query+="SET @id='$id', @name='$name'; EXECUTE stmt USING @id, @name; "
    done < <(cat "$JSON_FILES_DIR/$file_name" | jq -c '.[]')
    docker exec -i $DOCKER_CONTAINER_NAME mysql -u $DB_USERNAME -p$DB_PASSWORD --local-infile=1 -D $DB_NAME -e "PREPARE stmt FROM '$query'; $upsert_query DEALLOCATE PREPARE stmt;"
    stop_timer "Upserting data for $table_name table..."
}

# Function to upsert data into Games table
function upsert_data_games_and_publishers() {
  # start_timer
  start_timer

  # call split_games_json.js to split games.json into multiple files
  splitJsonFile "games.json" 50000


  first_iteration=true
  for file in tmp/*.games.json; do

    # Call insertDataInDatabase.js with games.json as argument to insert data into Games table
    if [ "$first_iteration" = true ]; then
      node js/insertDataInDatabase.js "$file" "tmp/publishers.json"
      first_iteration=false
    else
      node js/insertDataInDatabase.js "$file"
    fi
  done

  # Clean up
  rm tmp/*.games.json

  # stop_timer "Upserting data for Games table..."
  stop_timer "Upserting data for Games table..."
}


# Upsert data into each table
upsert_data_simple "Categories" "categories.json" "category_id"
upsert_data_simple "Mechanics_Type" "mechanics.json" "mechanic_id"
upsert_data_games_and_publishers
