export class PopulationService {
  async getStatePopulationData () {
    try {
      let statePopulationResponse = await fetch (`https://cors-anywhere.herokuapp.com/api.census.gov/data/2019/pep/population?get=POP&for=state:*&key=${process.env.APP_TOKEN}`);      
      let jsonifiedStatePopResponse;
      if(statePopulationResponse.ok && statePopulationResponse.status === 200) {
        jsonifiedStatePopResponse = await statePopulationResponse.json();
      } else {
        jsonifiedStatePopResponse = false;
      }
      return jsonifiedStatePopResponse;
    } catch (error) {
      return false;
    } 
  }

  async getNationalPopulationData () {
    try {
      let nationalPopulationResponse = await fetch (`https://cors-anywhere.herokuapp.com/api.census.gov/data/2019/pep/population?get=POP&for=us:1&key=${process.env.APP_TOKEN}`);      
      let jsonifiedNationalPopResponse;
      if(nationalPopulationResponse.ok && nationalPopulationResponse.status === 200) {
        jsonifiedNationalPopResponse = await nationalPopulationResponse.json();
      } else {
        jsonifiedNationalPopResponse = false;
      }
      return jsonifiedNationalPopResponse;
    } catch (error) {
      return false;
    } 
  }
}