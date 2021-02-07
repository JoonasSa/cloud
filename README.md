# Aiven cloud listing proxy and frontend

Consists of Python3 Flask based API and a React frontend.

## Setup

Python3 and Node required. _TODO: which version?_

With Python3 it is recommended to use a `virtual environment`. Create one by running `python3 -m venv venv`. This venv can be loaded by running `source venv/bin/activate` in the file containing the virtual environment folder. API requirements are stored in `src/api/requirements.txt`. Install dependencies inside the virtual environment by entering `src/api` and running `pip install -r requirements.txt`.

With Node it is recommended to use `yarn` for dependency management. Install the dependencies by entering `src/ui` and running `yarn`.

## Local development

Running the backend:

- Enter the Python virtual environment

- Launch the Flask server by calling `python3 main.py` in `src/api`

- Will run in `http://localhost:5000/v1/api` by default

- _TODO: linter_

Running the frontend:

- Launch the React app by calling `yarn start` in `src/ui`

- Will run in `http://localhost:3000` by default

- `src/ui` uses Prettier for linting

## Testing

_TODO: set up API tests_

_TODO: set up frontend tests_

## Deployment

_TODO: set up Dockerfile for simple local and cloud deployments_

_TODO: use a WSGI server for Flask_
