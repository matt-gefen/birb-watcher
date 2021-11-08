

// this document is entirely to mess around with the importing of taxonomy info from the ebird api for implementation on the app
import axios from 'axios'
import { usBirdSpeciesCodes } from './usBirds.js'

const apiUrl = 'https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=wfwduc1'

// function usBirds() {

//   axios.get(apiUrl)
//   .then(response => {
//       console.log(response.data[0].comName)
//   }) 
  
// }

async function getAllSpecies() {
  let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json`
  const response = await axios.get(apiUrl)
  let usBirds = []       
  response.data.forEach(species => {
    if(usBirdSpeciesCodes.includes(species.speciesCode)) {
      usBirds.push({
        speciesCode: species.speciesCode,
        comName: species.comName
      })
    }
  })
  return usBirds
}


getAllSpecies()