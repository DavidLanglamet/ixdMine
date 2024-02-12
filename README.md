## CodingIxD - Body data project: Balance

This is a student project within the context of [CodingIxD](https://codingixd.mi.fu-berlin.de)

# Project Overview
Balance is a project focused on integrating Fitbit data to visually represent both heart rate and stress levels. Our primary objective is to offer a unique and engaging visualization of this data.
This is an interdisciplinary project, we combine the fields of computer science & product design to realise a neoanalogue artifact for the visualization of body data. 
Over the day, a wearable and a questionnaire measure the pulse and subjective stress levels. The collected data is then used as a baseline and transferred to the artifact. 
The spinning top's illumination, cast onto a room ceiling, mirrors specific shades of light, reshaping the circadian rhythm akin to the sun's cycle. As stress fluctuates throughout the day, this light morphs from a bright white to a calming dark blue. Lower stress levels yield an initial blue hue, aiming to evoke serene associations with nature, like the sky or ocean. As the light dims and spinning ceases, the meditator decides whether to prolong meditation or conclude the session.

If you want to learn more about the design aspects of this project, you can reach out to our product designer, Freia Antonia https://www.instagram.com/freia_antonia/
We hope to create value by creating a neoanalogue artifact that  translates data about the personal stress level and the body data of the heart rate into a pleasing visualisation that is both meaningful and impactful.
The artifact should help users to meditate and gain insight about their mental load. If you want to learn more about our philosophy, go to the [Abstract](https://github.com/DavidLanglamet/ixdMine/blob/main/Abstract.md) file.

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

[Data Colection and Integration](https://github.com/DavidLanglamet/ixdMine/blob/main/doc/Implementation%20Details.png)

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

[final setup with all components](https://github.com/DavidLanglamet/ixdMine/blob/main/doc/Usage.png)

## Credits

### Code References
- **Sine Fade Function**: Code from [sine_fade.ino](sine_fade/sine_fade.ino) in [eLAB GitLab](link)
- **Parallel Multitasking Applications for ESP32**: Referenced [CIRCUITSTATE Electronics](https://www.circuitstate.com/) for concurrency techniques

### API Connections
- **Fitbit API**: Authorization and heart rate variability information obtained from [fitbit.com](https://www.fitbit.com/)
- **Code Tutorials**: Inspiration and guidance from [franchyze923's GitHub Repository](https://github.com/franchyze923/Code_From_Tutorials) for API connection

### Deployment Resources
- **Cloudflare and GitHub Pages**: Deployment assistance from [Cloudflare Pages and GitHub tutorial on YouTube](https://www.youtube.com/watch?v=MpFO4Zr0EPE)


# License 

[MIT LICENCE](https://github.com/DavidLanglamet/ixdMine/blob/main/LICENSE)







https://dev.fitbit.com/build/reference/web-api/

https://cloud.google.com/terms

https://firebase.google.com/terms

https://firebase.google.com/docs

https://docs.npmjs.com/policies/npm-license

https://www.cloudflare.com/de-de/website-terms/

MIT: vscode, babel, React, Vite, SWC
