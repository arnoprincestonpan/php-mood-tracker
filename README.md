# Mood Tracker

A simple web application to track your daily moods.

## Features

* Record your mood along with a timestamp.
* View a histoy of your moods.
* Simple and easy-to-use interface.

## Technologies Used

* **Version 1:**
    * PHP (Backend)
    * HTML
    * JavaScript
    * SQLite (moods.db)
* **Version 2:**
    * React
    * Axios
    * Bootstrap
    * PHP (Backend)
    * SQLite (moods.db)

## Setup and Installation

1.  Clone the respository:
    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd php-mood-tracker
    ```

## Usage

### Version 1: PHP + HTML + JavaScript

1.  Place `api.php`, `index.html`, `moods.db`, and `script.js` in the `back-end` and `basic-frontend` directories.
2.  Start the PHP server from the `back-end` directory:
    ```bash
    cd back-end
    php -S localhost:8000
    ```
3.  Open `http://localhost:8000/` OR `http://localhost:8000/index.html`

### Version 2: React Frontend

1.  Navigate to the `front-end` directory:
    ```bash
    cd front-end
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser. 

## Version 1 Details
* This version provides a basic interface for tracking moods using PHP for the backend and plain HTML/JavaScript for Frontend 
* It uses an SQLite database to store mood entries
* No styling is applied to this version.

## Version 2 Details
* Features a more responsive frontend built with React
* Uses axios for API communication and Bootstrap for styling
* Backend will remain the same as Version 1 with PHP and SQLite