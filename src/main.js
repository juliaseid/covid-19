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

function getCOVIDElements (response1, response2) { 
  let dataFunctions;
  if (response1) {
    if (response2) {
      dataFunctions = new DataFunctions(response1[0].positive, response1[0].recovered, response1[0].death, response1[0].totalTestResults, getPopulations(response2));
    }
    else {
      dataFunctions = "Sorry, no population data available!";
    } 
  }
  else {
    dataFunctions = "We're sorry!  We have nothing to show you right now!";
  }
  return dataFunctions;
}

function getPopulations (response) {
  let totalNationalPop;
  if (response) {
    totalNationalPop = response[1][0];
  }
  return +(totalNationalPop);
}

$(document).ready(function () {
  (async () => {
    let covidService = new COVIDService;
    let populationService = new PopulationService;
    const popResponse = await populationService.getNationalPopulationData();
    const statePopResponse = await populationService.getStatePopulationData();
    const nationalResponse = await covidService.getNationalData();
    const stationalResponse = await covidService.getStateData();
    let nationalData = getCOVIDElements(nationalResponse, popResponse);
    //let stateCOVID = stationalResponse.filter(state => state.fips === stateId)//needs to be amended to work w/ specifics of our API & stuff
    //let statePop = statePopResponse.filter( blah blah => )//fix this

    console.log(nationalData);
    console.log(stateData);
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