# Stratégie de CI/CD
- Le projet good-lock est déployé sur un serveur web avec cette URL : [http://137.74.196.230:3000/](http://137.74.196.230:3000/)
- Nous utilisons deux pipelines GitHub Actions pour notre CI/CD.
## Continuous integration
- Cette pipeline se lance lorsque qu'un membre de l'équipe effectue :
    - Une pull request d'une branche de fonctionnalité sur la branche principale (main).
    - Nous lançons les tests en front-end et en back-end.
        - Si les tests réussissent, la pull request peut être fusionnée.
        - Sinon, la fusion est bloquée et il faut adapter le code pour que les tests passent.
## Continuous delivery
- Cette pipeline se lance lorsqu'un push est effectué sur la branche principale (main).
    - Nous envoyons un webhook qui est lancé sur le serveur web à l'adresse [http://137.74.196.230:3000/](http://137.74.196.230:3000/).
    - Le webhook vérifie si la requête est authentifiée.
        - Cela signifie que la signature concorde avec ce que nous avons configuré dans les secrets de GitHub.
    - Si cela passe, un fichier build.sh est exécuté par le webhook.
        - Les actions effectuées par build.sh sont les suivantes :
            - Effectue un `git pull`
            - Reconstruit le front-end
            - Relance le back-end
    - Sinon, une erreur de signature incorrecte se produit.
        - Le webhook est protégé par une limite de requêtes pour éviter les tentatives d'attaque par force brute