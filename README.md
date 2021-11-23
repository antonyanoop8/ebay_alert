# Documentation #


## System Requirements

* Docker


## Installation

- Please make sure to add ur own keys in the env files (.env.insights & .env.ebay)
- Build the project on local machine by `docker-compose build` for the first time
- Run `docker-compose up` to start the server
- Create superuser. `docker exec -it 'dockerid' python manage.py createsuperuser`
- Run `docker ps` to get the dockerid for the django server

## Execution
The backend will  run on `http://127.0.0.1:8000/`
The frontend will run on `http://127.0.0.1:3000/`
