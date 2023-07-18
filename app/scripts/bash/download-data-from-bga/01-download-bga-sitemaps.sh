#!/bin/bash

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Base URL for the sitemaps
url_base="https://www.boardgameatlas.com/sitemap-"

# Extension for the sitemaps
url_ext=".xml"

# Directory to save the files
dir="tmp/bga-sitemap-xml"

# Prepare the directory
prepare_directory "$dir"

# Initial sitemap number
i=1

# While loop to fetch each sitemap
while true
do
    # Form the URL for the current sitemap
    url="${url_base}${i}${url_ext}"

    # Filename to save the sitemap to
    filename="${dir}/sitemap-${i}${url_ext}"

    # Use wget to fetch the sitemap
    wget -O "$filename" "$url"

    # Check if the file contains the <Error> tag
    if grep -q "<Error>" "$filename"; then
        # If it does, delete the file and exit the loop
        rm "$filename"
        break
    fi

    # Increment the sitemap number
    ((i++))
done

# Print the elapsed time
stop_timer