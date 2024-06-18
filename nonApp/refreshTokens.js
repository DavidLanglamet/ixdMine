// OUTDATED: Zohrehs Account (theApp) :: zohrehasadi2018@yahoo.com :: Z123456Z_?12dd

const refreshAPICall = 'https://api.fitbit.com/oauth2/token';
const refreshToken = '8782bb7fd12464aabd2e025ff2e0f84ca974f474e4c696c66af0b566e40691fe';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BLOTMiLCJzdWIiOiJDNFZTQ1IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcyMTMzMjIwOSwiaWF0IjoxNzE4NzQwMjA5fQ.-za3gKlJZmb4qDNRKK-_2nkitaoh5UILYDzqdtHDdC8';

fetch(refreshAPICall, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('23PK93:27d1be11e879978d60107f06a4ba9bd7'),
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&expires_in=2592000`,
})
.then(response => response.json())
.then(json => console.log(json));
