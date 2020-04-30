import CanvasJS from './canvasjs.min.js';
  
export class Chart {
  constructor(deathOverTimeData) {
    this.deathOverTimeData = deathOverTimeData;
  }

  infectionChart() {
    var InfectionRate = new CanvasJS.Chart("infectionRateChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'lightgrey',
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
        name: "State #1",
        lineThickness: 1,
        markerType: "triangle",
        markerColor: "red",
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"red",
        color: "red",
        lineColor: 'red',
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: [
          { x: new Date(20200421),y: 1 , indexLabel: "-first case",  markerType: "cross" },
          { x: new Date(20200422),y: 2 },
          { x: new Date(20200423),y: 4 },
          { x: new Date(20200424),y: 8 },
          { x: new Date(20200425),y: 32 },
          { x: new Date(20200426),y: 256 },
          { x: new Date(20200427),y: 1200 },
          { x: new Date(20200429),y: 1400 },
        ]
      },
      ],
    });
    InfectionRate.render();
  }

  testRateChart() {
    var testRate = new CanvasJS.Chart("testingChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'lightgrey',
      title:{
        text: "Testing Rate Over Time",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
      },
      axisY:{
        title: "Tests Per 100,000",
        includeZero: false,
      },
      data: [{        
        type: "line",
        name: "State #1",
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
    var positiveTestChart = new CanvasJS.Chart("positiveTestChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'white',
      title:{
        text: "Positive Tests Over Time",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
      },
      axisY:{
        title: "Positive Tests Per 100,000",
        includeZero: false,
      },
      data: [{        
        type: "line",
        name: "State #1",
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
    positiveTestChart.render();
  }

}





  
