export class HistoricalDataByState {
  constructor(jsonData) {
    this.jsonData = jsonData;
    this.deathsOverTime;
    this.testsOverTime;
  }

  dateConversion (date) {
  let dateStr = date.toString();
  let dateArray = dateStr.split("");
  let year = [];
  let month = [];
  let day = [];
  let splitDate = [];
  for (let i=0; i<=3; i++) {
    year.push(dateArray[i]);
  }
  for (let i=4; i<=5; i++) {
    month.push(dateArray[i]);
  }
  for (let i=6; i<8; i++) {
    day.push(dateArray[i]);
  }
  let yearNum = +(year[0].concat(year[1], year[2], year[3]));
  let monthNumify = function (month) {
      let monthNum;
      if (month[0] != "0") {
        monthNum = +(month[0].concat(month[1]));
      }
      else (
        monthNum = +(month[1])
      );
      return monthNum;
    };
    let dayNumify = function (day) {
      let dayNum;
      if (day[0] != "0") {
        dayNum = +(day[0].concat(day[1]))
      }
      else (
        dayNum = +(day[1])
      )
      return dayNum;
    }
    splitDate.push(yearNum, monthNumify(month), dayNumify(day));
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
}