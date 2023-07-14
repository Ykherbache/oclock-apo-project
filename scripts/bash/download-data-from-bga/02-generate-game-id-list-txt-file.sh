#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Directory containing the XML files
dir="tmp/bga-sitemap-xml"

# Output file
output_file="tmp/game-ids.txt"

# Remove the output file if it exists
if [ -f "$output_file" ]; then
    rm "$output_file"
fi

# Loop over the XML files in the directory
for file in "${dir}"/*.xml
do
    # Use grep to find the lines containing <loc>, then use sed to remove the <loc> and </loc> tags
    # Then, use awk to split the URL by slashes and get the second to last field
    # Append the output to the output file
    grep -oP '<loc>\K[^<]*' "$file" | awk -F '/' '{print $(NF-1)}' >> "$output_file"
done

# Print the elapsed time
stop_timer