#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Define the base URL
base_url="https://api.boardgameatlas.com/api/search"

# Call the function to check if the required programs are installed
check_required_installed

# Define the individual parameters
client_ids=("Rb6qnFOFw1" "V4BmX5iNiT" "YdnNy3U6it" "mw4aWQxCLq" "dv4NBs1acB" "CdFCCtIQSn")
fields="id,image_url,name,primary_publisher,description,categories,mechanics,price,year_published,min_players,max_players,playtime,min_age,average_learning_complexity,average_strategy_complexity,average_user_rating,upc"

# Define the file containing the game IDs
game_ids_file="tmp/game-ids.txt"  # Replace with the path to your game IDs file

# Define the size of each chunk of game IDs
chunk_size=20

# Read the game IDs from the file
mapfile -t game_ids < "$game_ids_file"

# Calculate the total number of chunks
total_chunks=$(( (${#game_ids[@]} + chunk_size - 1) / chunk_size ))

# Define the rate limit (in requests per minute)
rate_limit=60

# Calculate the delay between requests (in seconds)
delay=$((rate_limit / (rate_limit * ${#client_ids[@]})))

# Initialize the client ID index
client_id_index=0

# Process the game IDs in chunks
for ((i=0; i<${#game_ids[@]}; i+=chunk_size))
do
  # Extract the current chunk of game IDs and join them with commas
  chunk_ids=$(printf "%s," "${game_ids[@]:i:chunk_size}")
  chunk_ids=${chunk_ids%,}  # Remove trailing comma
  # Get the current client ID
  client_id=${client_ids[$client_id_index]}

  # Combine the base URL and the parameters to create the full URL
  url="${base_url}?client_id=${client_id}&fields=${fields}&ids=${chunk_ids}"

  # Use curl to hit the endpoint
  response=$(curl -s "$url")

  # Check the HTTP status code and the response body
  http_status=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
  if [[ $http_status -ne 200 || -z $response ]]; then
    echo "Error: HTTP status $http_status or empty response"
    break
  fi

  # Process the response (for example, save it to a file)
  echo "$response" > "tmp/json/${i}.json"

  # Update the client ID index
  client_id_index=$((client_id_index + 1))
  if ((client_id_index == ${#client_ids[@]})); then
    client_id_index=0
  fi

  # Calculate the current chunk
  current_chunk=$((i / chunk_size + 1))

  # Print the progress bar
  print_progress_bar "$current_chunk" "$total_chunks"

  # Delay before the next request
  sleep $delay
done

# Merge the JSON files
jq -s 'map(.games[])' tmp/json/*.json > tmp/games.json

# Remove the individual JSON files
rm tmp/json/*.json

# Remove the game IDs file
rm "$game_ids_file"

# Print the elapsed time
stop_timer