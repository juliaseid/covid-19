import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { testsPer100K } from './../src/data-functions.js';
import { casesPer100K } from './../src/data-functions.js';
import { positivesPer100Tests } from './../src/data-functions.js';
import { recoveredPerConfirmed } from './../src/data-functions.js';
import { deathsPerConfirmed } from './../src/data-functions.js';
import { COVIDService } from './../src/covidService.js';
import { PopulationService } from './../src/populationService.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { StateService } from './states-service.js';
import { HistoricalDataByState } from './historical-data.js';
import { Chart } from './charts.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function getCOVIDElements (response) {
  let totalCases;
  let totalRecovered;
  let totalDead;
  let totalTests;
  if (response) {
    totalCases = response[0].positive;
    totalRecovered = response[0].recovered;
    totalDead = response[0].death;
    totalTests = response[0].totalTestResults; 
    $("#putDataHere").text(`Total Cases: ${totalCases}  Total Recovered: ${totalRecovered}  Total Dead: ${totalDead}  Total Tests: ${totalTests}`);
    return (totalCases, totalRecovered, totalDead, totalTests);
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
    let nationalData = getCOVIDElements(nationalResponse);
    let natPop = getPopulations(popResponse);
    // console.log(testsPer100K(natResponse[3], natPop));
    console.log(nationalData);
    console.log(natPop);
    // let statResponse = getCOVIDElements(stationalResponse);
    // console.log(statResponse);
  })();
  
  let map = L.map('map').setView([37.8, -96], 4);
  let geoJsonLayer;
  let info = L.control();
  let stateService = new StateService();
  let chart = new Chart();
  

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