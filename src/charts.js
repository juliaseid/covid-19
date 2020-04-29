import CanvasJS from './canvasjs.min.js';
  
export class Chart {

  infectionChart() {
    var InfectionRate = new CanvasJS.Chart("infectionRateChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'lightgrey',
      title:{
        text: "Infection Rate Over Time",
        fontFamily: "tahoma",
      },
      axisX:{
        title: "Date",
        intervalType: "month",
      },
      axisY:{
        title: "Cases Per 100,000",
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
          { x: new Date(2020, 1, 15),y: 1 , indexLabel: "-first case",  markerType: "cross" },
          { x: new Date(2020, 1, 22),y: 2 },
          { x: new Date(2020, 1, 29),y: 4 },
          { x: new Date(2020, 2, 6),y: 8 },
          { x: new Date(2020, 2, 13),y: 32 },
          { x: new Date(2020, 2, 22),y: 256 },
          { x: new Date(2020, 2, 29),y: 1200 },
          { x: new Date(2020, 3, 6),y: 1400 },
        ]
      },
      {        
        type: "line",
        name: "State #2",
        lineThickness: 1,
        color: "blue",
        lineColor: 'blue',
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"blue",
        markerColor: "blue",
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: [
          { x: new Date(2020, 1, 10), y: 1 , indexLabel: "-first case", markerType: "cross" },
          { x: new Date(2020, 1, 22),y: 2 },
          { x: new Date(2020, 1, 29),y: 3 },
          { x: new Date(2020, 2, 6),y: 6 },
          { x: new Date(2020, 2, 13),y: 25 },
          { x: new Date(2020, 2, 22),y: 60},
          { x: new Date(2020, 2, 29),y: 55 },
          { x: new Date(2020, 3, 6),y: 55 },
        ]
      }
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
      {        
        type: "line",
        name: "State #2",
        lineThickness: 1,
        color: "blue",
        lineColor: 'blue',
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"blue",
        markerColor: "blue",
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: [
          { x: new Date(2020, 1, 10), y: 50 , indexLabel: "-testing begins", markerType: "cross" },
          { x: new Date(2020, 1, 22),y: 150 },
          { x: new Date(2020, 1, 29),y: 300 },
          { x: new Date(2020, 2, 6),y: 500 },
          { x: new Date(2020, 2, 13),y: 1100 },
          { x: new Date(2020, 2, 22),y: 3200},
          { x: new Date(2020, 2, 29),y: 4330 },
          { x: new Date(2020, 3, 6),y: 5000 },
        ]
      }
      ],
    });
    testRate.render();
  }

  positiveTestChart() {
    var positiveTestChart = new CanvasJS.Chart("positiveTestChart", {
      animationEnabled: true,
      theme: "light1",
      backgroundColor: 'lightgrey',
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
      {        
        type: "line",
        name: "State #2",
        lineThickness: 1,
        color: "blue",
        lineColor: 'blue',
        indexLabelOrientation:"vertical",
        indexLabelFontColor:"blue",
        markerColor: "blue",
        showInLegend: true,
        indexLabelFontSize: 12,
        dataPoints: [
          { x: new Date(2020, 1, 10), y: 50 , indexLabel: "-testing begins", markerType: "cross" },
          { x: new Date(2020, 1, 22),y: 150 },
          { x: new Date(2020, 1, 29),y: 300 },
          { x: new Date(2020, 2, 6),y: 500 },
          { x: new Date(2020, 2, 13),y: 1100 },
          { x: new Date(2020, 2, 22),y: 3200},
          { x: new Date(2020, 2, 29),y: 4330 },
          { x: new Date(2020, 3, 6),y: 5000 },
        ]
      }
      ],
    });
    positiveTestChart.render();
  }

}





  
