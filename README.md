# Sexual Awareness and Info Hub

A professional, one-page web application aimed at raising awareness about sexual health. This app provides users with informative health articles, a Q&A section, a symptom checker, and feedback functionality. Additionally, it includes a map to help users locate nearby sexual health clinics.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Features
- **Google Maps Integration**: Displays nearby sexual health clinics based on user location.
- **Health Articles**: Displays articles related to sexual health to educate users.
- **Q&A Section**: Allows users to ask sexual health questions and get answers.
- **Symptom Checker**: Users can enter their symptoms and receive advice on whether to see a doctor.
- **Feedback System**: Collects user feedback to improve the app experience.
- **User Login**: Simple login system with username storage in localStorage to welcome users back.

## Technologies Used
- **HTML/CSS/JavaScript**: Core web technologies used to build the structure, styling, and interactivity of the app.
- **Google Maps API**: Used to display a map and locate nearby sexual health clinics.
- **GeoJS API**: Retrieves the user’s current location to center the map.
- **Local Storage**: Stores user login details and feedback locally.
- **JSON Server**: A mock backend for fetching and posting articles, questions, and answers.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ShirleenChebet/sexual-awareness-app.git
    cd sexual-awareness-app
    ```

2. **Set up a local server**:
    If you are using JSON Server for the backend, you need to install and run it:
    ```bash
    npm install -g json-server
    ```

3. **Create a `db.json` file** (for articles and questions data):
    In the root of your project, create a `db.json` file with the following content:
    ```json
    {
      "articles": [
        {
          "id": 1,
          "title": "Understanding Sexual Health",
          "content": "Sexual health is an important part of overall well-being."
        },
        {
          "id": 2,
          "title": "Common STIs",
          "content": "The common STIs are gonorrhoea, HPV, chlamydia, syphilis and hepatitis B."
        },
        {
          "id": 3,
          "title": "How to Talk About Sexual Health",
          "content": "Talking openly about sexual health with partners and healthcare providers is key to staying safe and healthy."
        }
        // Add more articles as needed
      ],
      "questions": [
        {
          "id": 1,
          "question": "What are the early symptoms of an STI?",
          "answer": "Early symptoms of STIs may include unusual discharge, burning during urination, or sores. Consult a doctor for accurate diagnosis."
        }
        // Add more questions as needed
      ]
    }
    ```

4. **Run JSON Server**:
    Start JSON Server to serve the `db.json` file:
    ```bash
    json-server --watch db.json
    ```

5. **Open `index.html` in a browser**:
    You can simply open the `index.html` file in your browser, or serve it through a local server like `Live Server` in VSCode.

## Usage
Once the project is up and running, you can:
- **View nearby clinics** using the map (Google Maps integration).
- **Read health articles** about sexual health.
- **Ask health-related questions** in the Q&A section.
- **Check symptoms** and get advice based on user input.
- **Submit feedback** about the app and see previously submitted feedback.
- **Login** with a username for a personalized experience.

## Project Structure

.
├── index.html           # The main HTML file for the web app
├── style.css            # Contains the styling for the app
├── index.js             # JavaScript logic, including Google Maps and user interaction
├── db.json              # Local database containing articles and Q&A data
├── images/
│   └── main.jpg         # Image to replace the API key section
├── README.md            # Project documentation
└── assets/
    └── A_professional,_soothing_illustration_representing.png  # Image used as background

  ### Known Issues
  
- The symptom checker provides only basic advice and is not a substitute for medical consultation.
- The map may not display properly if the user's location is not accessible.

