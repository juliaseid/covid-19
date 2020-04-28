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
  }
  $("#putDataHere").text(response);
  $("#putDataHere").text(`Total Cases: ${totalCases}  Total Recovered: ${totalRecovered}  Total Dead: ${totalDead}  Total Tests: ${totalTests}`);
  return (totalCases, totalRecovered, totalDead, totalTests);
}

$(document).ready(function () {
  (async () => {
    let covidService = new COVIDService;
    const nationalResponse = await covidService.getNationalData();
    const stationalResponse = await covidService.getStateData();
    let natResponse = getCOVIDElements(nationalResponse);
    //console.log(nationalResponse);
    let statResponse = getCOVIDElements(stationalResponse);
    console.log(stationalResponse);

    // console.log(stateResponse.positive + "positive<br>" + stateResponse.recovered + "recovered<br>" + stateResponse.dead + "dead<br>" + stateResponse.totalCases + "total cases");   
  
  
  })();



});