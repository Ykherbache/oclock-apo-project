## this directory contains all the tools necessary to load data from board game atlas

.
├── 00-main-script.sh -> **this shell script launchs all the other scripts**
├── 01-download-bga-sitemaps.sh -> this shell script downloads with curl all sitemaps.xml from bga
├── 02-generate-game-id-list-txt-file.sh -> this shell extract from sitemaps previously downloaded the game ids and creates a txt file with each new line is a game id.
├── 03-scrape-games.sh -> this shell hits the endpoint with a list of ids (max 24) and generates lot of json files that will be merged in the end into one big json file
├── 04-scrape-categories.sh -> this shell scrapes the categories that exist in the games inside games.json but also hits the api endpoint and get a merge to be sure.
├── 05-scrape-mechanics.sh -> this shell scrapes the mechanics that exist in the games inside games.json but also hits the api endpoint and get a merge to be sure.
├── 06-scrape-publishers.sh -> this shell scrapes the main_publisher that exist in the games inside games.json.
├── 07-upsert-data-in-database.sh -> this shell script upserts the downloaded data in the database sometimes we use shell and sometimes we use js when its faster
├── utils.sh -> this scripts is sources by most other scripts it contains most functions that are used by multiple scripts to write less code
├── js
│ └── (directory)
│── tmp -> directory containing tomporary files, is cleaned often
│ └── (directory)
└── readme.md -> this file explains the purpose of the directory and its composition
