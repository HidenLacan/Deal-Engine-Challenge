
//Dependendcies
const fs = require('fs');
const csv = require('csv-parser');
// Data
const flighdata = './data/challenge_dataset (1).csv';
// API
const NodeCache = require("node-cache");
const axios = require("axios");
//Cache
const cache = new NodeCache();
/// Key 
require('dotenv').config();
const apiKey = process.env.apiKey;

//// Function to get data weather from Weather API
const getWeather = async(latitude,longitude) =>{

    const cacheWeather = cache.get(`${latitude},${longitude}`);
    if(cacheWeather){
        return cacheWeather;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=sp`;
    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        cache.set(`${latitude},${longitude}`, weatherData, 3600); // Guardar en caché por 1 hora
        return weatherData;
      } catch (error) {
        console.error(`Error al obtener el clima:`, error.message);
        return null;
      }
};


//// Function to read data and convert in array with flight information
const getFlightData = () => {
    return new Promise((resolve, reject) => {
      const flights = [];
      
      fs.createReadStream(flighdata).pipe(csv()).on('data', (row) => {

          flights.push({
            origin: row.origin,
            destination: row.destination,
            airline: row.airline,
            flight_num: row.flight_num,
            originAirport: {
              iata_code: row.origin_iata_code,
              latitude: parseFloat(row.origin_latitude),
              longitude: parseFloat(row.origin_longitude)
            },
            destinationAirport: {
              iata_code: row.destination_iata_code,
              latitude: parseFloat(row.destination_latitude),
              longitude: parseFloat(row.destination_longitude)
            }
          });
        })
        .on('end', () => {
          resolve(flights);
        })
        .on('error', reject);
    });
  };


/// function to get weather data for each flight 

const processFlights = async() =>{
    const flights = await getFlightData();
    const weatherReports = [];
    for (const flight of flights) {
        const {originAirport,destinationAirport,flight_num} = flight;
        const originWeather = await getWeather(originAirport.latitude,originAirport.longitude);
        const destinationWeather = await getWeather(destinationAirport.latitude,destinationAirport.longitude);
        if (originWeather && destinationWeather) {
            weatherReports.push({
                flight:flight_num,
                origin:{
                    airport:originAirport.iata_code,
                    weather:originWeather.main.temp + '°C, ' + originWeather.weather[0].description

                },
                destination:{
                    airport:destinationAirport.iata_code,
                    weather:destinationWeather.main.temp + '°C, ' + destinationWeather.weather[0].description,
                }
            });
        }else{
            console.error(`No se pudo procesar el clima del vuelo ${flight_num}`)
        }
    }

    return weatherReports;
};


const test  = async () =>{
  const reports = await processFlights();
  console.log(reports);
}

const main = async () => {
    const reports = await processFlights();
    fs.writeFileSync('weatherReports.json',JSON.stringify(reports,null,2));
    console.log('Informes guardados en WeatherReports.json');
};

test();

main();
