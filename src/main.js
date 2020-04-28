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
});