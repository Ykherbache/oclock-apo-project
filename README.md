# Welcome on Good-Lock!

this is a rewrite of the final project when i attended **O'clock** for my *apprenticeship*.

## Useful information :

### Running the app
- To launch this application locally, go to config/docker/
	- Copy env-example to .env 
		- Set the ports of your machine that will be used by mysql and phpmyadmin containers.
	- Run the command docker compose up -d (or docker-compose if you have that)
		- it will launch the the MySQL db and PHPMyAdmin containers.
### structure of the app
  -  config
	  - docker
		  - contains the files related to docker. we only have two services
			  - One for the MySQL DB
			  - One for the PHPMyAdmin.
		  - there's also an env-example since
			  -  the docker-compose **depends** on a .env in the same folder at it for ports.
				  - *Why ?* **i didn't want to hard code the ports in the docker compose that why i can configure them from one pc to another.** 
	  - docs
		  - contains a markdown file that explains *ci/cd* strategy used for this project. 
			  - disclaimer: the *ci/cd* pipelines are inactive.
	  - vscode
		  - contains an outdate vscode workspace, 
			  - only the paths are outdate with the new repo structure, should be a quick fix.
  - app
	  - front
		  - WIP (it used to be an app written in nuxt 2, gonna be rewritten)
			  - *Why the rewrite ?* **I find it faster than fixing the problems with the initial nuxt 2 code.** 
	  - back
		  - Our express app that's written in a layered architecture with unit tests for the different application                       domains 
		  - *What are the different layers of your code base?* 
			  - **thanks for asking ! so first we have to start by saying the app code is separated by domain**
				  - a domain is either a model from the database like **Games** or a specific functionality like **Auth**
				  - For each domain there are different layers
				  - **Routes layer**: this is the layer that users will hit first, we define here the routes of the specific domain 
				  - **Controller layer**: this layer is called by the routes layer once a request comes in, it handles http responses.
				  - **Service layer**: this layer is called by the controllers and contains the app logic specific for a given domain.
				  - **Repository layer**: this layer is the last one and is the one that handle the interactions with the database for a given domain
				  - Of course there are also **middlewares** and **helper functions** here and there but that's the global overview of the backend app.
		  - *Are there any tests ?* **Well are unit tests for most domains, only the service layers is testes since it usually is the one that contains the app logic.**
		  -  **(WIP) //  TODO migrating from javascript to typescript**
	  - scripts
		  - Useful scripts to do miscellaneous but important tasks
			  - Scraping the **boardGameAtlas** Api to keep those dataset updated.
				  - **Games**
				  - **Publishers**
				  - **Categories**
				  - **Mechanic types**
	  - postman
		  - contains an outdated postman collection that's still 85% correct so useful. (WIP for 100%) 


# final words

*This project really made me understand that at some point hard skills don't cut it anymore* 

*Being able to swiftly unblock your colleagues and share your vision with them of how you view the project, why some technical decision are more important than others why there's code conventions in the first place...etc*

*In this aspect i actually completely **failed** this assignment. luckily for me we live and we learn.*

*I can't wait for the next time i will have to help software engineers that are more junior than me pick up good habits.*

**if you got all the way here, Thank you for taking the time!**
