#!/bin/bash

# Loop through each subdirectory in the current directory
for dir in ./*/; do
	# Loop through each file in the subdirectory
	for file in ${dir}*; do
		# Create symbolic link in the parent directory
		ln -s $(pwd)/${file} ../$(basename ${file})
	done
done
