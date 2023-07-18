#!/bin/bash

# Function to extract IDs from JSON file
extract_ids() {
  local input_file=$1
  local entity_field=$2

  # Check if the entity_field is an array or an object
  if [[ "$(jq ".[0].$entity_field | type" $input_file)" == "\"array\"" ]]; then
    # If it's an array, we need to handle each element of the array separately
    local entity_ids=$(jq -r ".[] | select(.${entity_field} != null) | .${entity_field}[] | select(.id != null) | .id" "$input_file")
  else
    # If it's an object, we can directly access the id
    local entity_ids=$(jq -r ".[] | select(.${entity_field} != null and .${entity_field}.id != null) | .${entity_field}.id" "$input_file")
  fi

  # Filter out empty entity IDs and remove duplicates
  local unique_entity_ids=$(echo "$entity_ids" | awk 'NF' | sort | uniq)

  # Echo IDs for further usage
  echo "$unique_entity_ids"
}

# Function to generate ID list JSON file
generate_id_list_file() {
  local unique_entity_ids=$1
  local output_file=$2
  local entity_type=$3

  printf '{"'${entity_type}'IdList": [' > "$output_file"
  first=true

  while IFS= read -r entity_id; do
    if [ "$entity_id" != "null" ]; then
      if [ "$first" = true ]; then
        printf '"%s"' "$entity_id" >> "$output_file"
        first=false
      else
        printf ',"%s"' "$entity_id" >> "$output_file"
      fi
    fi
  done <<< "$unique_entity_ids"

  printf ']}' >> "$output_file"
}


# Function to scrape a single entity by ID
scrape_entity() {
  local entity_id=$1
  local entity_url=$2
  local entity_type=$3

  echo "Entity ID: $entity_id" >&2
  echo "Entity URL: $entity_url/$entity_id" >&2

  # Fetch the HTML content of the entity page
  local html=$(curl -s "$entity_url/$entity_id")

  echo "HTML length: ${#html}" >&2

  # Extract the entity name from the HTML using awk
  local entity_name=$(echo "$html" | awk -F"$entity_type/" '{print $2}' | awk -F'/' '{print $2}')

  echo "Entity name: $entity_name" >&2

  # Construct the data object
  local data="{ \"${entity_type}_id\": \"$entity_id\", \"name\": \"$entity_name\" }"

  # Output the data
  echo "$data"
}

# export the function so it can be used in GNU Parallel
export -f scrape_entity

# Function to scrape multiple entities and generate a JSON file
scrape_entities() {
  local unique_entity_ids=$1
  local output_file=$2
  local entity_url=$3
  local entity_type=$4

  # Create a temporary directory for the output files
  mkdir  "tmp/${entity_type}"

  # Scrape each entity in parallel using GNU Parallel
    printf '%s\n' "${unique_entity_ids[@]}" | parallel -P 8 --delay 0.2 --bar --results tmp/${entity_type}/results bash -c '"scrape_entity {} '"$entity_url $entity_type"' > tmp/'${entity_type}'/{}.json"'






  # Generate the final JSON data
  printf '{"'${entity_type}'List": [' > "$output_file"
  first=true
  for file in tmp/${entity_type}/*.json; do
    if [ "$first" = true ]; then
      cat "$file" >> "$output_file"
      first=false
    else
      printf ',' >> "$output_file"
      cat "$file" >> "$output_file"
    fi
  done
  printf ']}' >> "$output_file"

  # Remove the temporary directory
  rm -r "tmp/${entity_type}"
}

# Function to start the timer
start_timer() {
  START_TIME=$(date +%s)
}

# Function to stop the timer and print the elapsed time
stop_timer() {
  END_TIME=$(date +%s)
  ELAPSED_TIME=$((END_TIME - START_TIME))

  # If an argument is provided, use that as the script name.
  # Otherwise, use the name of the current script.
  if [ $# -eq 0 ]
  then
    SCRIPT_NAME=$(basename $0)
  else
    SCRIPT_NAME=$1
  fi

  echo "$SCRIPT_NAME elapsed time: $ELAPSED_TIME seconds"
}

# Function to cleanup the tmp directory
cleanup() {
  local directory=$1
  find "$directory" -type f \( -name "*.json" -o -name "*.txt" -o -name "*.xml" \) -exec rm {} \;
}

# Function to prepare a directory
prepare_directory() {
    dir=$1
    # Check if directory doesn't exist
    if [ ! -d "$dir" ]; then
        # Create directory
        mkdir "$dir"
    else
        # Remove all files in the directory
        rm -f "${dir}"/*
    fi
}

# Function to check if required tools are installed
check_required_installed() {
  # Define local colors
  local YELLOW="\033[33m"
  local RED="\033[31m"
  local RESET="\033[0m"

    for cmd in jq curl; do
        if ! command -v $cmd &> /dev/null
        then
            echo -e "${RED}Error: $cmd is not installed. Please install it and try again.${RESET}"
            echo -e "${YELLOW}To install $cmd, use one of the following commands based on your operating system:${RESET}"
            echo -e "${YELLOW}Ubuntu: sudo apt-get install $cmd${RESET}"
            echo -e "${YELLOW}MacOS: brew install $cmd${RESET}"
            echo -e "${YELLOW}Windows (with Chocolatey installed): choco install $cmd${RESET}"
            exit 1
        fi
    done
}

# Function to print a progress bar
print_progress_bar() {
  local current=$1
  local total=$2
  local message=${3:-Progress}
  local width=${4:-40}

  local ratio=$((current * 100 / total))
  local filled=$((current * width / total))

  # Clear the line before printing the progress bar
  printf "\r\033[K"

  # Print the progress bar
  printf "\r%s: |%s%s| %d%%" "$message" "$(printf '#%.0s' $(seq 1 $filled))" "$(printf ' %.0s' $(seq $filled $width))" "$ratio"
}

# function to split games.json into batches of 1000 games
splitJsonFile() {
  file="$1"
  batchSize="$2"
  totalGames=$(jq length "tmp/$file")

  echo "Splitting $totalGames games into batches of $batchSize..."

  start=0
  end=$((batchSize - 1))
  batchNumber=1

  while [[ $end -lt $totalGames ]]; do
    jq ".[$start:$end]" "tmp/$file" > "tmp/$batchNumber.$file"
    start=$((end + 1))
    end=$((start + batchSize - 1))
    batchNumber=$((batchNumber + 1))
  done

  # Process the remaining games (if any)
  if [[ $start -lt $totalGames ]]; then
    jq ".[$start:$totalGames]" "tmp/$file" > "tmp/$batchNumber.$file"
  fi

  echo "Split into $((batchNumber - 1)) batches."
}