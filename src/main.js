import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DataFunctions } from './../src/data-functions.js';
import { COVIDService } from './../src/covidService.js';
import { PopulationService } from './../src/populationService.js';
import L from './../src/leaflet/leaflet.js';
import './../src/leaflet/leaflet.css';
import { StateService } from './states-service.js';
import { HistoricalDataByState } from './historical-data.js';
import { Chart } from './charts.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./../src/leaflet/images/marker-icon-2x.png'),
  iconUrl: require('./../src/leaflet/images/marker-icon.png'),
  shadowUrl: require('./../src/leaflet/images/marker-shadow.png'),
});

function getCOVIDElements (response1, population) { 
  //takes in JSON object from COVID tracking API and a number as population
  let dataFunctions;
  if (response1) {
    if (population) {
      dataFunctions = new DataFunctions(response1[0].positive, response1[0].recovered, response1[0].death, response1[0].totalTestResults, population);
    }
    else {
      dataFunctions = "Sorry, no population data available!";
    } 
  }
  else {
    dataFunctions = "We're sorry!  We have nothing to show you right now!";
  }
  return dataFunctions;
  //returns object w/ properties of cases, recovered, deaths, tests, and population, each as a number.  Object prototype has mathematical operations to generate rates of infection, etc.
}

function getNationalPopulation(response) {
  let totalNatPop;
  if (response) {
    totalNatPop = response[1][0];
  }
  return +(totalNatPop);
  //returns a single number
}

function getStatePopulation(census) {
  let totalStatePop;
  totalStatePop = census[0];
  return +(totalStatePop);
  //returns a single number
}

$(document).ready(function () {
  const allStatesDataPackages = [];
  (async () => {
    let covidService = new COVIDService;
    let populationService = new PopulationService;
    const popResponse = await populationService.getNationalPopulationData();
    //popResponse for national data is an array of 2 objects, the first being an index, the second being the total population
    const allStatesPopResponse = await populationService.getStatePopulationData();
    //allStatesPopResponse is an array of objects in key:value pairs of population:fips where both key and value are strings
    const nationalResponse = await covidService.getNationalData();
    //covidService is an object with an array of key:value pairs of various data points; we access selected data points only and save them as nationalResponse
    const allStatesCOVIDResponse = await covidService.getStateData();
    //allStatesCOVIDResponse is an array of arrays, one for each state or territory, each containing key:value pairs
    let nationalData = getCOVIDElements(nationalResponse, getNationalPopulation(popResponse));
    //nationalData containes the relevant data points from covidService along with the total population, saved as an object containing key:value pairs, where each value is a number
    allStatesPopResponse.forEach(census => { 
      let stateDataPackage;
      allStatesCOVIDResponse.forEach(state => {
        if (state["fips"]===census[1]) {
          stateDataPackage = [getCOVIDElements([state], getStatePopulation(census)), state["fips"]];
        }
      });
      allStatesDataPackages.push(stateDataPackage);
      //allStatesDataPackages is an array of arrays, one for each state or territory.  Within each state array are 2 elements: an object in the same format as nationalData (key:value pairs with the values as numbers), and the FIPS code for that state as a string
    });
   
    console.log(`FOOOOOOOO` , nationalData);
    console.log(`BAAAAAAAARRR` , allStatesDataPackages);

  })();

  
  
  let map = L.map('map').setView([37.8, -96], 4);
  let geoJsonLayer;
  let info = L.control();
  let stateService = new StateService();
  let chart = new Chart();
  

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.ACCESS_TOKEN}`, {
    maxZoom: 6,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			`<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ` +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);

  function style() {
    return {
      fillColor: 'red',
      weight: 2,
      opacity: 1, 
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  info.onAdd = function() {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(props) {
    this._div.innerHTML = '<h4>US COVID-19 Positive Test Cases</h4>' + (props ?
      '<b>' + props.name + '</b><br />' + props.totalCases + ' positive cases'
      : 'Hover over a state to see results');
  };

  info.addTo(map);

  function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#000',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    geoJsonLayer.resetStyle(e.target);
    info.update();
  }

  function getStateDataByID(e) {
    let stateId = e.target.feature.id;
    const allhistoricalData = stateService.historicalData;
    let stateHistoricalData = allhistoricalData.filter(state => state.fips === stateId);
    let histData = new HistoricalDataByState(stateHistoricalData);
    histData.getDeathsOverTime();
    console.log(histData.deathsOverTime);
    chart.infectionChart();
    let stateCurrentData = [];
    //the first value in the census API is a header, so the loop skips the first element
    for (let i=1; i<allStatesDataPackages.length; i++) {
      console.log(allStatesDataPackages);
      if (allStatesDataPackages[i][1] === stateId) {
        stateCurrentData.push(allStatesDataPackages[i]);
      }
    }
    console.log(stateCurrentData);

  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: getStateDataByID
    });
  }

  (async () => {
    await stateService.populateStateData();
    await stateService.setHisotricalStateData();
    geoJsonLayer = L.geoJson(stateService.geoJsonData, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);
    
  })();

});