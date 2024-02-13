// neccessery imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';
import './Slider.css';
import '../firebaseConfig'; // Add this line prevent firebase not loading error
import 'firebase/database'
import { getDatabase, ref, set } from 'firebase/database';
// Import sound file
import meditationSound from './gong.mp3';
// Provided JavaScript code snippet
// Place it above the Home component definition
import axios from 'axios';
//const axios = require('axios');
const clientId = '23RMZN';
const clientSecret = '722a1a15200ffb520e355a7a40328b1d';
const redirectUri = 'http://localhost';
const authorizeUrl = 'https://www.fitbit.com/oauth2/authorize';
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JORkciLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcwOTg5MTk1OSwiaWF0IjoxNzA3Mjk5OTU5fQ.qbXxYufXSerwRdSoW14UwEFu3qZXLQjz8BvH4O_Kk40"
const apiUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json';

const minReadingsThreshold = 10; // Adjust as needed
const minReadingsThreshold = 0; // Adjust as needed

// Function to fetch heart rate data from Fitbit API : https://dev.fitbit.com/build/reference/device-api/heart-rate/
async function fetchHeartRateData(lastMeditationTime) {
  try {
    let apiUrl = apiUrl;
    let apiUrlx = apiUrl;
    if (lastMeditationTime) {
      // If lastMeditationTime is null, fetch data starting from the first timestamp of the day, so we won't get error
      const today = new Date().toISOString().split('T')[0];
      apiUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/${lastMeditationTime}/today.json`; 
      apiUrlx = `https://api.fitbit.com/1/user/-/activities/heart/date/${lastMeditationTime}/today.json`; 
        }

    const response = await axios.get(apiUrl, {
    const response = await axios.get(apiUrlx, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
@@ -65,11 +65,20 @@ async function fetchHeartRateData(lastMeditationTime) {
    for (const [day, values] of Object.entries(heartRateDictionary)) {
      if (values.count >= minReadingsThreshold) {
        const averageHeartRate = values.sum / values.count;
        const db = getDatabase();
        const docRef2 = await set(ref(db, 'HeartRate'), {
          value: averageHeartRate,
        });
        resultDictionary[day] = averageHeartRate.toFixed(2);
      } else {
        resultDictionary[day] = 'no meditation';
        const db = getDatabase();
        const docRef2 = await set(ref(db, 'HeartRate'), {
          value: 0,
        });
      }
    }

// error handeling
    return resultDictionary;
  } catch (error) {
@@ -110,13 +119,14 @@ function Home() {
    try {
      // Add document to database
      const docRef = await set(ref(db, 'Stress'), {
        value,
        value: value,
      });
      console.log("Document written to Database");

      // Update last meditation time
      const currentTimestamp = new Date().toISOString().split('T')[0];
      setLastMeditationTime(currentTimestamp);
      console.log(fetchHeartRateData(lastMeditationTime))
    } catch (error) {
      console.error("Error writing document:", error);
    }
    
    setTimeout(() => {
      if (meditationAudio) {
        // Play the sound when the button is clicked
        meditationAudio.play();
      }
      console.log({value});
    }, 3000); // 3000 milliseconds = 3 seconds
  };
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <h1 style={{ marginTop: '-20px', marginBottom: '80px', fontSize: '45px'}}>How have you felt since your last meditation?</h1>
        <div className="slider-container">
          <span style = {{ marginRight: '30px', fontSize: '22px', fontWeight: 'bold'}}>Calm</span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleChange}
              className="slider"
            />
          <span style = {{ marginLeft: '30px', fontSize: '22px', fontWeight: 'bold'}}>Stressed</span>
        </div>
        <div style={{ marginTop: '90px' }}>
          <button onClick={handleSubmit} className="button">
            Start Meditation
            <span>&rarr;</span>
          </button>
        </div>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/settings">
            <button style = {{ background: 'white', width: '130px', height:'50px', marginTop: '10px', color: 'black', fontWeight: 'bold'}}>
              Tutorial
            </button>
          </Link>
        </div>
    </>
  );
}
export default Home;
