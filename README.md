# good-lock

## il y'a un code workspace pour le projet pour ceux qui sont sur vscode
```bash
 # se positioner sur la racine du projet good_lock
 #pour l'utiliser au lieu d'utiliser
 code .
 #pour ouvrire le projet faite
 code good-lock.code-workspace
```

## Build Docker

```bash
# build imgs (same directory as docker-compose.yml)
$ docker compose build

# Start containers
$ docker compose up 
```

# if probleme on docker comp0se 
```bash
#install depencies
$ docker pull  nomdel'image:latest
```
## Back 
```bash
# start server
$ docker exec back npm dev
```

# install dependencies
```bash
#install dependencies
$ docker exec back npm i [nom du package]
```