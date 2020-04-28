import { mapStatesOverlay } from './JSON/us-states.js';

export class StateService {
  constructor() {
    this.geoJsonData;
    this.covidData;
  }
  
  
  
  async getStatesData() {
    try {
      let response = await fetch("https://covidtracking.com/api/v1/states/current.json");
      return response.json();
    } catch (error) {
      return error;
    }
  }
  
  async populateStateData() { 
    const response = await this.getStatesData();
    this.covidData = response;
    const { features } = mapStatesOverlay;
    
    const mapData = features.map(state => {
      const stateData = response.find(item => item.fips === state.id);
      return {
        ...state,
        properties: {
          ...state.properties,
          totalCases: stateData.positive
        }
      };
    });
    
    this.geoJsonData = {
      ...mapStatesOverlay,
      features: mapData,
    };
  }
      
}