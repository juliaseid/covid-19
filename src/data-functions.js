export function testsPer100K (totalTests, totalPopulation) {
  let testingRateByPop = +(((totalTests * 100000)/totalPopulation).toFixed());
  return testingRateByPop;
  // ((5,434,943 * 100000)/328,877,386) // 1652 tests per 100,000 Americans
}

export function casesPer100K (totalCases, totalPopulation) {
  let diagnosisRateByPop = +(((totalCases * 100000)/totalPopulation).toFixed());
  return diagnosisRateByPop;
}

export function positivesPer100Tests (totalCases, totalTests) {
  let  positiveTestRate = +(((totalCases / totalTests)*100).toFixed());
  return positiveTestRate;
}

export function recoveredPerConfirmed (totalRecovered, totalCases) {
  let gotBetter = +(((totalRecovered/totalCases)*100).toFixed());
  return gotBetter;
}

export function deathsPerConfirmed (totalDead, totalCases) {
  let gotDead = +(((totalDead/totalCases)*100).toFixed());
  return gotDead;
}

// daysToXCases () { STRETCH GOAL FUNCTIONS
//   let infectionThreshold = this.totalPopulation * 100 / 100000; 
//   //let badDay = when did we reach infectionThreshold? 
//   //let firstDay = day of first infection
//   //let daystoBadDay = badDay - firstDay
//   //return daystoBadDay
  
// }

// daysToXDeaths () {

// }


