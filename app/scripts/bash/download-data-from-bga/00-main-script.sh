# script that launches all the other scripts
# -------------------------------------------------------
# the script are launched in the following order:
# 1. 01-download-bga-sitemaps.sh (download the sitemaps)
# 2. 02-generate-game-id-list-txt-file.sh (generate the game id list)
# 3. 03-scrape-games.sh (scrape the games)
# 4. 04-scrape-categories.sh (scrape the categories)
# 5. 05-scrape-mechanics.sh (scrape the mechanics)
# 6. 06-scrape-publishers.sh (scrape the publishers)

# Exit the script if any command fails
set -e

# load utils.sh
source utils.sh

# Start the timer
start_timer

# Set the start step based on the first command-line argument, or default to 1
start_step=${1:-1}

case $start_step in
  1)
    # launch cleanup function at script start
    cleanup tmp
    # Download the sitemaps
    bash 01-download-bga-sitemaps.sh
    ;&
  2)
    # Generate the game id list
    bash 02-generate-game-id-list-txt-file.sh
    ;&
  3)
    # Scrape the games
    bash 03-scrape-games.sh
    ;&
  4)
    # Scrape the categories
    bash 04-scrape-categories.sh
    ;&
  5)
    # Scrape the mechanics
    bash 05-scrape-mechanics.sh
    ;&
  6)
    # Scrape the publishers
    bash 06-scrape-publishers.sh
    ;&
  7)
    # insert Data in database 
    bash 07-upsert-data-in-database.sh
  ;;
  *)
    echo "Invalid start step: $start_step"
    exit 1
    ;;
esac

# Print the elapsed time
stop_timer

