# Spoonful - Web Application

## Description

Spoonful allow users to reserved a table at a restaurant. The user can select the restaurant, date, time, and number of guests. The user can also view the restaurant's menu and reviews. The user can also view their reservation history.

## Installation
1. Clone the repository
   ```bash
   git clone
   ```
2. Navigate to the project directory
   ```bash
   cd spoonful
   ```
3. Edit the `.env` file with your database credentials in `docker/` directory
   ```bash
    cp docker/.env.tpl docker/.env
    ```
4. Build and start the Docker containers
    ```bash
    ./docker/docker.sh up -d
    ```
5. The application will be available at `http://localhost:8080`