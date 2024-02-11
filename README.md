## CodingIxD - Body data project: Balance



# Project Overview
Balance is a project focused on integrating Fitbit data to visually represent both heart rate and stress levels. Our primary objective is to offer a unique and engaging visualization of this data.
This is an interdisciplinary project, we combine the fields of computer science & product design to realise a neoanalogue artifact for the visualization of body data. We have integrated LED lights controlled by a ESP32 ­WROOM ­DA. We are exploring the feasibility of individually controlling each LED lamp to represent stress levels. The chosen color range spans from dark blue for calm states to white for high-stress situations.

If you want to learn more about the design aspects of this project, you can reach out to our product designer, Freia Antonia https://www.instagram.com/freia_antonia/
We hope to create value by creating a neoanalogue artifact that  translates data about the personal stress level and the body data of the heart rate into a pleasing visualisation that is both meaningful and impactful.
The artifact should help users to meditate and gain insight about their mental load. If you want to learn more about our philosophy, go to the "Abstract" file.

# Meditation Device Functionality Setup

This repository contains code for enabling functionality in our meditation device. 

# Implementation Details

Language Used: JavaScript (heartRate1.js) and C++ (firebaseConfig.cpp)
API Integration: Fitbit watch API for heart rate retrieval
Data Storage: Firebase system by Google
Code Files:
heartRate1.js: Retrieves average heart rate and stress level
firebaseConfig.cpp: Sends data to ESP using Firebase
firebaseConfig.js: Holds authentication information for Firebase connection
Home.jsx: Initializes database connection and handles data submission
Hosting: Cloudflare pages : https://ixdmine.pages.dev/

# Installation Steps

Arduino IDE Setup:
Install necessary boards (Arduino AVR, Arduino ESP32)
Select ESP32 WROOM DA module in board settings
Library Integration:
Locate necessary libraries in the "Arduino" folder
Integrate libraries in IDE preferences (Preferences -> Sketchbook Location -> <path to/git/ixdMine/Arduino>)
Usage
Run the system to compute the user's body data.
Upon data retrieval, the system initiates the meditation session tailored to the user's needs.
For detailed installation instructions and code implementation, refer to the repository files.


# Technical Details
Breadbord and jumpers, Microcontroller ESP32, D-MOSFET, LED Strip, Stepper Motor, Resistors 1200 +- 5% and 870 +- 1%

Our prototype is based on a ESP32 ­WROOM ­DA micro controller which concurrently handles the translates of the input data (pulse and perceived stress level) to the LED strip as well as the Stepper Motor which are handeling the illumination and movement of our prototype respectively.

## Credits

### Code References
- **Sine Fade Function**: Code from [sine_fade.ino](sine_fade/sine_fade.ino) in [eLAB GitLab](link)
- **Parallel Multitasking Applications for ESP32**: Referenced [CIRCUITSTATE Electronics](https://www.circuitstate.com/) for concurrency techniques

### API Connections
- **Fitbit API**: Authorization and heart rate variability information obtained from [fitbit.com](https://www.fitbit.com/)
- **Code Tutorials**: Inspiration and guidance from [franchyze923's GitHub Repository](https://github.com/franchyze923/Code_From_Tutorials) for API connection

### Deployment Resources
- **Cloudflare and GitHub Pages**: Deployment assistance from [Cloudflare Pages and GitHub tutorial on YouTube](https://www.youtube.com/watch?v=MpFO4Zr0EPE)







https://dev.fitbit.com/build/reference/web-api/

https://cloud.google.com/terms

https://firebase.google.com/terms

https://firebase.google.com/docs

https://docs.npmjs.com/policies/npm-license

https://www.cloudflare.com/de-de/website-terms/

MIT: vscode, babel, React, Vite, SWC
