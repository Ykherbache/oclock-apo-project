#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Input file
input_file="tmp/games.json"

# Output file for mechanic ids
output_file_ids="tmp/mechanic-ids.json"

# Output file for mechanic data
output_file_data="tmp/mechanics.json"

# Entity field
entity_field="mechanics"

# Entity URL
entity_url="https://www.boardgameatlas.com/mechanic"

# Extract unique mechanic IDs
unique_entity_ids=$(extract_ids "$input_file" "$entity_field")

# Generate mechanic ID list
generate_id_list_file "$unique_entity_ids" "$output_file_ids" 'mechanic'

# Scrape each mechanic
scrape_entities "$unique_entity_ids" "$output_file_data" "$entity_url" 'mechanic'

# Remove the game IDs file
rm "$output_file_ids"

# Fetch all mechanics from the API endpoint
all_mechanics=$(curl "https://api.boardgameatlas.com/api/game/mechanics?client_id=JLBr5npPhV")

# Transform the API response to match the scraped data structure and save it in a file
echo "$all_mechanics" | jq '[.mechanics[] | {mechanic_id: .id, name: .name}]' > tmp/all_mechanics.json

# Merge the scraped data with the API data, and remove duplicates
jq -s '.[0].mechanicList + .[1]' "$output_file_data" tmp/all_mechanics.json | jq 'unique' > "tmp/mechanic_final.json"

# Remove the temporary files
rm tmp/all_mechanics.json "$output_file_data"

# Rename the final file
mv "tmp/mechanic_final.json" "$output_file_data"

# Remove duplicates
jq 'group_by(.mechanic_id) | map(.[0])' tmp/mechanics.json > tmp/mechanics_uniq.json

# Rename the final file
mv tmp/mechanics_uniq.json tmp/mechanics.json

# Print the elapsed time
stop_timer