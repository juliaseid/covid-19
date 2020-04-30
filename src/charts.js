import CanvasJS from './canvasjs.min.js';
  
export class Chart {
  constructor(deathOverTimeData, positiveOverTimeData, stateName) {
    this.deathOverTimeData = deathOverTimeData;
    this.positiveOverTimeData = positiveOverTimeData;
    this.stateName = stateName;
  }

  infectionChart() {
    let dataPoint = this.deathOverTimeData.map(obj => {
      return {
        x: new Date(obj.date),
        y: obj.deaths
      };
    });

    
    

    var InfectionRate = new CanvasJS.Chart("infectionRateChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'white',
      title:{
        text: "Total Deaths Over Time",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
        valueFormatString: "YYYY-MM-DD",
      },
      axisY:{
        title: "Total Deaths",
        includeZero: false,
      },
      data: [{        
        type: "line",
        name: this.stateName,
        lineThickness: 1,
        markerType: "triangle",
        markerColor: "red",
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"red",
        color: "red",
        lineColor: 'red',
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: dataPoint
      }
      ]
    });
    InfectionRate.render();
  }

  testRateChart() {
    var testRate = new CanvasJS.Chart("testingChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'white',
      title:{
        text: "Testing Rate Over Time",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
        valueFormatString: "YYYY-MM-DD",
      },
      axisY:{
        title: "Tests Per 100,000",
        includeZero: false,
      },
      data: [{        
        type: "line",
        name: this.stateName,
        lineThickness: 1,
        color: "red",
        lineColor: 'red',
        markerType: "triangle",
        markerColor: "red",
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"red",
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: [
          { x: new Date(2020, 1, 15), y: 5 , indexLabel: "-testing begins", markerType: "cross" },
          { x: new Date(2020, 1, 22),y: 20 },
          { x: new Date(2020, 1, 29),y: 200 },
          { x: new Date(2020, 2, 6),y: 500 },
          { x: new Date(2020, 2, 13),y: 1500 },
          { x: new Date(2020, 2, 22),y: 4500 },
          { x: new Date(2020, 2, 29),y: 10000 },
          { x: new Date(2020, 3, 6),y: 20000 },
        ]
      },
      ],
    });
    testRate.render();
  }

  positiveTestChart() {
    let dataPoint = this.positiveOverTimeData.map(obj => {
      return {
        x: new Date(obj.date),
        y: obj.positive
      };
    });
    var positiveTestChart = new CanvasJS.Chart("positiveTestChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'white',
      title:{
        text: "Total Positive Tests",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
        valueFormatString: "YYYY-MM-DD",
      },
      axisY:{
        title: "Positive Tests Per 100,000",
        includeZero: false,
      },
      data: [{        
        type: "line",
        name: this.stateName,
        lineThickness: 1,
        color: "red",
        lineColor: 'red',
        markerType: "triangle",
        markerColor: "red",
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"red",
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: dataPoint
      }
      ]
    });
    positiveTestChart.render();
  }
}





  
