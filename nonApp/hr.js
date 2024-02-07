const heartRateDataToday = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min/time/09:00/22:00.json'

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JORkciLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcwOTg5MTk1OSwiaWF0IjoxNzA3Mjk5OTU5fQ.qbXxYufXSerwRdSoW14UwEFu3qZXLQjz8BvH4O_Kk40';

fetch(heartRateDataToday, {
    method: "GET",
    headers: {"Authorization": "Bearer " + ACCESS_TOKEN}
})
.then(response => response.json())
.then(json => {
  const avgheartRate = json['activities-heart'][0].value;
  console.log("Average heart rate from yesterday:", avgheartRate);
  if (json['activities-heart-intraday']) {
    const intradayData = json['activities-heart-intraday'];
    
    const firstEntry = intradayData.dataset[0];
    const lastEntry = intradayData.dataset[intradayData.dataset.length - 1];
    
    const firstEntryTime = new Date(`2000-01-01T${firstEntry.time}`);
    const lastEntryTime = new Date(`2000-01-01T${lastEntry.time}`);    
    
    const timeDifference = new Date(lastEntryTime - firstEntryTime);    
    
    const formattedTimeDifference = `${timeDifference.getUTCHours()}:${timeDifference.getUTCMinutes()}:${timeDifference.getUTCSeconds()}`;    console.log("Time difference between 1st and last heart rate:", formattedTimeDifference);

  } else {
    console.log("No intraday heart rate data available.");
}
});