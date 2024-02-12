// neccessery imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../src/App.css';
import './Slider.css';

import '../firebaseConfig'; // Add this line prevent firebase not loading error
import 'firebase/database'

import { getFirestore, addDoc, doc, setDoc, collection, getDocs } from "firebase/firestore";
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

// Function to fetch heart rate data from Fitbit API : https://dev.fitbit.com/build/reference/device-api/heart-rate/
async function fetchHeartRateData(lastMeditationTime) {
  try {
    let apiUrl = apiUrl;
    if (lastMeditationTime) {
      // If lastMeditationTime is null, fetch data starting from the first timestamp of the day, so we won't get error
      const today = new Date().toISOString().split('T')[0];
      apiUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/${lastMeditationTime}/today.json`; 
        }

    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const heartRateData = response.data['activities-heart'];

    // Process heart rate data and calculate average for each day
    const heartRateDictionary = {};
    heartRateData.forEach(reading => {
      const date = new Date(reading.dateTime);
      const day = date.toISOString().split('T')[0];
      const heartRate = reading.value.restingHeartRate;
      if (heartRate !== undefined || !isNaN(heartRate)) {
        // if we have data
        if (!heartRateDictionary[day]) {
          // we make a dict of time and heart rate
          heartRateDictionary[day] = { sum: 0, count: 0 };
        }
        // to count the average
        heartRateDictionary[day].sum += heartRate;
        heartRateDictionary[day].count += 1;
      }
    });

    // Calculate average heart rate for each day
    const resultDictionary = {};
    for (const [day, values] of Object.entries(heartRateDictionary)) {
      if (values.count >= minReadingsThreshold) {
        const averageHeartRate = values.sum / values.count;
        resultDictionary[day] = averageHeartRate.toFixed(2);
      } else {
        resultDictionary[day] = 'no meditation';
      }
    }
// error handeling
    return resultDictionary;
  } catch (error) {
    console.error('Error fetching heart rate data:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to print the heart rate dictionary
function printHeartRateDictionary(heartRateDictionary) {
  console.log('Heart Rate Data:');
  console.log(heartRateDictionary); // Corrected from print to console.log
  for (const [day, value] of Object.entries(heartRateDictionary)) {
    console.log(`${day}: ${value}`);
  }
}

// Home component definition, except line 91 I didn't anything
function Home() {
  const [value, setValue] = useState(0);
  // to get last timestamp user meditated 
  const [lastMeditationTime, setLastMeditationTime] = useState(null); // Initialize last_meditation_time variable

  //initialize database
  const db = getDatabase();

  // Create an Audio object with the sound file
  const [meditationAudio, setMeditationAudio] = useState(null);

  useEffect(() => {
    // Preload the audio file
    const audio = new Audio(meditationSound);
    audio.preload = "auto";
    setMeditationAudio(audio);
  }, []);

  const handleSubmit = async () => {
    try {
      // Add document to database
      const docRef = await set(ref(db, 'Stress'), {
        value,
      });
      console.log("Document written to Database");

      // Update last meditation time
      const currentTimestamp = new Date().toISOString().split('T')[0];
      setLastMeditationTime(currentTimestamp);
    } catch (error) {
      console.error("Error writing document:", error);
    }
    
    if (meditationAudio) {
      // Play the sound when the button is clicked
      meditationAudio.play();
    }
    console.log({value});
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
