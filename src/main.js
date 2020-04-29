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


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./../src/leaflet/images/marker-icon-2x.png'),
  iconUrl: require('./../src/leaflet/images/marker-icon.png'),
  shadowUrl: require('./../src/leaflet/images/marker-shadow.png'),
});

function getCOVIDElements (response1, response2) { // getting mad about identifier already being declared
  response1 = new DataFunctions;
  let response2;
  if (response1) {
    if (response2) {
    this.totalCases = response1[0].positive;
    this.totalRecovered = response1[0].recovered;
    this.totalDead = response1[0].death;
    this.totalTests = response1[0].totalTestResults; 
    this.totalPopulation = getPopulations(response2);
    }
    else {
      alert("Sorry, no population data available!");
    } 
  }
  else {
    alert("We're sorry!  We have nothing to show you right now!");
  }
}

function getPopulations (response) {
  let totalNationalPop;
  if (response) {
    totalNationalPop = response[1][0];
  }
  return totalNationalPop;
}

$(document).ready(function () {
  (async () => {
    let covidService = new COVIDService;
    let populationService = new PopulationService;
    const popResponse = await populationService.getNationalPopulationData();
    const nationalResponse = await covidService.getNationalData();
    const stationalResponse = await covidService.getStateData();
    let nationalData = getCOVIDElements(nationalResponse, popResponse);
    // let natPop = getPopulations(popResponse);
    // testsPer100K()
    // console.log(testsPer100K(natResponse[3], natPop));
    console.log(nationalData);
    // console.log(natPop);
    // let statResponse = getCOVIDElements(stationalResponse);
    // console.log(statResponse);
  })();

  
  
  let map = L.map('map').setView([37.8, -96], 4);
  let geoJsonLayer;
  let info = L.control();
  let stateService = new StateService();
  

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + process.env.ACCESS_TOKEN, {
    maxZoom: 6,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
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

  

  // eslint-disable-next-line no-unused-vars
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
    /* const currentData = stateService.currentData;
    let stateData = currentData.find(state => state.fips === stateId); 
    console.log(stateData.death); */
    const allhistoricalData = stateService.historicalData;
    let stateHistoricalData = allhistoricalData.filter(state => state.fips === stateId);
    //console.log(stateHistoricalData);
    /* const allDeaths = stateHistoricalData.map(state => {
      return {
        date: state.date,
        deaths: state.death 
      };
    }); */
    let histData = new HistoricalDataByState(stateHistoricalData);
    histData.getDeathsOverTime();
    console.log(histData.deathsOverTime);
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