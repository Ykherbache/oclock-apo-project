#!/bin/bash

# Get a list of all directories within the current directory
subdirs=(*/)
for dir in "${subdirs[@]}"; do
    files=$(find "$dir" -maxdepth 1 -type f)  # Find only files directly in the directory
    for file in $files; do
        filename=$(basename "$file")  # Extract the file name
        ln -s "$(pwd)/${dir}${filename}" "../${filename}"  # Create the symbolic link in the root directory
    done
done