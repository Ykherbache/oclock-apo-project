#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Input file
input_file="tmp/games.json"

# Output file for category ids
output_file_ids="tmp/category-ids.json"

# Output file for category data
output_file_data="tmp/categories.json"

# Type of current entity
type="category"

# Url of current entity
url="https://www.boardgameatlas.com/category"

# Extract category IDs
unique_category_ids=$(extract_ids "$input_file" 'categories')

# Generate category ID list
generate_id_list_file "$unique_category_ids" "$output_file_ids" "$type"

# Scrape each category
scrape_entities "$unique_category_ids" "$output_file_data" "$url" "$type"

all_categories=$(curl -s "https://api.boardgameatlas.com/api/game/categories?client_id=JLBr5npPhV")

echo "$all_categories" | jq '[.categories[] | {category_id: .id, name: .name}]' > tmp/all_categories.json

jq -s '.[0].categoryList + .[1]' "$output_file_data" tmp/all_categories.json > "tmp/${type}_final.json"

rm "$output_file_ids"
# Remove the temporary files
rm tmp/all_categories.json "$output_file_data"

# Rename the final file
mv "tmp/${type}_final.json" "$output_file_data"

# Remove duplicates
jq 'group_by(.category_id) | map(.[0])' tmp/categories.json > tmp/categories_uniq.json

# Rename the final file
mv tmp/categories_uniq.json tmp/categories.json

# Print the elapsed time
stop_timer