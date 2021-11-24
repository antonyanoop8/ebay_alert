# Documentation #
Ebay Alerts

## System Requirements

* Docker


## Installation

- Please make sure to add your own keys in the env files (.env.insights & .env.ebay), the required fields are added to these files, please add correct values to it.
- Build the project on local machine by `docker-compose build` for the first time
- Run `docker-compose up` to start the server
- Create superuser. `docker exec -it ebay_alert_app_1 python manage.py createsuperuser`
- The created super user can be used to login into the system(both through frontend and phase1 admin).

## Execution
- The frontend will run on `http://127.0.0.1:3000/`
- Phase 1 will  run on `http://127.0.0.1:8000/`
- Phase 2 will run on `http://127.0.0.1:8001/`

## System Design

There are 3 projects in this repo. All these projects run inside a single docker. The communication between these projects happen through API's. Currently no authentication is added for the API's.

1. ebay_alerts_backend(phase1 Python/Django) - creates product alerts,run the alerts periodically and fetches product data based on search phrase from ebay & send the mail notification to users.
2. ebay_alerts_frontend(React Frontend) - UI to create,view,update,delete product alerts
3. insights_app(phase2 Python/Django) - sends email to users on product insights( currently percentage drop in prices insight is done)


API documentation for Phase 1 can be accessed through `http://127.0.0.1:8000/docs/`

I have added my own ebay API key, I couldn't add the sendgrid key for emails as my sendgrid account seems to have some issues, please add your own so to test the emails.





