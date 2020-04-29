export class HistoricalDataByState {
  constructor(jsonData) {
    this.jsonData = jsonData;
  }

  getDeathsOverTime() {
    return this.jsonData.map(state => {
      return {
        date: state.date,
        deaths: state.death 
      };
    });
  }
}