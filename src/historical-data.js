export class HistoricalDataByState {
  constructor(jsonData) {
    this.jsonData = jsonData;
    this.deathsOverTime;
    this.testsOverTime;
  }

  getDeathsOverTime() {
    this.deathsOverTime = this.jsonData.map(state => {
      return {
        date: state.date,
        deaths: state.death 
      };
    });
  }

  getTestsOverTime() {
    this.testsOverTime = this.jsonData.map(state => {
      return {
        date: state.date,
        positive: state.positive 
      };
    });
  }

  removeUndefined(obj) {
    return obj.filter(e => e.deaths !== undefined);
  } 

  /* callAllMethods() {
    this.getDeathsOverTime();
    return this.removeUndefined(this.deathsOverTime);
  } */
}