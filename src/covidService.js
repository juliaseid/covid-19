export class COVIDService {
 async getNationalData () {
   try {
      let nationalResponse = await fetch (`http://covidtracking.com/api/v1/us/current.json`);
      let jsonifiedNatResponse;
      if(nationalResponse.ok && nationalResponse.status === 200) {
        jsonifiedNatResponse = await nationalResponse.json();
      } else {
        jsonifiedNatResponse = false;
      }
      return jsonifiedNatResponse;
    } catch (error) {
      console.log("in the catch");
      return false;
    }
  }  

  async getStateData () {
    try {
       let stateResponse = await fetch (`http://covidtracking.com/api/v1/states/current.json`);
       let jsonifiedStateResponse;
       if(stateResponse.ok && stateResponse.status === 200) {
         jsonifiedStateResponse = await stateResponse.json();
       } else {
         jsonifiedStateResponse = false;
       }
       return jsonifiedStateResponse;
     } catch (error) {
       console.log("in the catch");
       return false;
     }
   }  
}