# Back en express

Application Node faites avec le framework express et l'orm Sequelize.


## Creation d'une migration:
### Pourquoi ? 
    - Pour avoir un suivi chronologique des changements sur le shema de la bdd et eviter des soucis plus tard quand il faudra faire des changement de shema sur une BDD qui a des données.
### Comment ?
    1. cd db/migrations/
    2. touch [année][Mois][jour][heure au format HH:MM][nom de la migration].js
        - example: 202306012315-suppression-table-games.js
    3. a l'interieur on copie colle un autre fichier de migration et on adapte au changement qu'on veux faire. il est recomander de demander de l'aide si sequelize/SQL si jamais c'est flou.
### pour lancer les migrations on fait un yarn db:migrate
