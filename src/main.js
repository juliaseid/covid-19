import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NationalDataFunctions } from './../';
import { COVIDService } from './../src/covidService.js';

function getCOVIDElements (response) {
  if (response) {
    let positive = response.positive;
    let recovered = response.recovered;
    let dead = response.death;
    let totalCases = response.totalTestResults;
    
  }
}

$(document).ready(function () {
  
  (async () => {
    let covidService = new COVIDService();
    const nationalResponse = await covidService.getNationalData();
    const stateResponse = await covidService.getStateData();
    getCOVIDElements(nationalResponse);
    getCOVIDElements(stateResponse);
  })();



});