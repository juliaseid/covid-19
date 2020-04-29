export class DataFunctions {
  constructor (totalCases, totalRecovered, totalDead, totalTests, totalPopulation) {
  this.totalCases = totalCases;
  this.totalRecovered = totalRecovered;
  this.totalDead = totalDead;
  this.totalTests = totalTests;
  this.totalPopulation = totalPopulation;
  }

  testsPer100K (totalTests, totalPopulation) {
    let testingRateByPop = +(((totalTests * 100000)/totalPopulation).toFixed());
    return testingRateByPop;
    // ((5,434,943 * 100000)/328,877,386) // 1652 tests per 100,000 Americans
  }

  casesPer100K (totalCases, totalPopulation) {
    let diagnosisRateByPop = +(((totalCases * 100000)/totalPopulation).toFixed());
    return diagnosisRateByPop;
  }

  positivesPer100Tests (totalCases, totalTests) {
    let  positiveTestRate = +(((totalCases / totalTests)*100).toFixed());
    return positiveTestRate;
  }

  recoveredPerConfirmed (totalRecovered, totalCases) {
    let gotBetter = +(((totalRecovered/totalCases)*100).toFixed());
    return gotBetter;
  }

  deathsPerConfirmed (totalDead, totalCases) {
    let gotDead = +(((totalDead/totalCases)*100).toFixed());
    return gotDead;
  }
}
