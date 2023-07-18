#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

input_file="tmp/games.json"
output_file_ids="tmp/publisher-ids.json"
output_file_data="tmp/publishers.json"
entity_field="primary_publisher"
entity_url="https://www.boardgameatlas.com/publisher"

unique_entity_ids=$(extract_ids "$input_file" "$entity_field")
generate_id_list_file "$unique_entity_ids" "$output_file_ids" "publisher"
scrape_entities "$unique_entity_ids" "$output_file_data" "$entity_url" "publisher"
rm "$output_file_ids"

# Print the elapsed time
stop_timer