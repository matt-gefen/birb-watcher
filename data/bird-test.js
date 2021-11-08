

// this document is entirely to mess around with the importing of taxonomy info from the ebird api for implementation on the app
import axios from 'axios'
import { usBirdSpeciesCodes } from './usBirds.js'

const apiUrl = 'https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=wfwduc1'

function usBirds() {

  axios.get(apiUrl)
  .then(response => {
      console.log(response.data[0].comName)
  }) 
  
}


usBirds()