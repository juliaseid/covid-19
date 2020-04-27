export class NationalData {
  constructor(totalTests, totalCases, totalDead, totalRecovered, totalPopulation) {
    this.totalTests = totalTests;
    this.totalCases = totalCases;
    this.totalDead = totalDead;
    this.totalRecovered = totalRecovered;
    this.totalPopulation = totalPopulation;
  }

  testsPer100K () {
    let testingRateByPop = +(((this.totalTests * 100000)/this.totalPopulation).toFixed());
    return testingRateByPop;
   // ((5,434,943 * 100000)/328,877,386) // 1652 tests per 100,000 Americans
  }

  casesPer100K () {
    let diagnosisRateByPop = +(((this.totalCases * 100000)/this.totalPopulation).toFixed());
    return diagnosisRateByPop;
  }

  positivesPer100Tests () {
    let  positiveTestRate = +(((this.totalCases / this.totalTests)*100).toFixed());
    return positiveTestRate;
  }

  recoveredPerConfirmed () {
    let gotBetter = +(((this.totalRecovered/this.totalCases)*100).toFixed());
    return gotBetter;
  }

  deathsPerConfirmed () {
    let gotDead = +(((this.totalDead/this.totalCases)*100).toFixed());
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


}