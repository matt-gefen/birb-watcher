

// this document is entirely to mess around with the importing of taxonomy info from the ebird api for implementation on the app
import axios from 'axios'
import fs from 'fs'
import { usBirdSpeciesCodes } from './usBirds.js'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import cheerio from 'cheerio'

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const apiUrl = 'https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=wfwduc1'
const webUrl = 'https://ebird.org/species/wfwduc1'

// function usBirds() {

//   axios.get(apiUrl)
//   .then(response => {
//       console.log(response.data[0].comName)
//   }) 
  
// }

// async function getAllSpecies() {
//   let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json`
//   const response = await axios.get(apiUrl)
//   let usBirds = []       
//   response.data.forEach(species => {
//     if(usBirdSpeciesCodes.includes(species.speciesCode)) {
//       usBirds.push({
//         speciesCode: species.speciesCode,
//         comName: species.comName
//       })
//     }
//   })
//   return usBirds
// }


// getAllSpecies()

// async function createBird(speciesCode, quantity) {
//   try {
//     let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${speciesCode}`
//     const response = await axios.get(apiUrl)
//     const body = response.data[0]
//     // console.log(body)
//     const bird = {
//       commonName: body.comName,
//       speciesName: body.speciesName,
//       speciesCode: body.speciesCode,
//       familyComName: body.familyComName,
//       cornellLink: `https://ebird.org/species/${body.speciesCode}`,
//       quantity,
//       notes: 'eh'
//     }
//     return bird
//   } catch(error) {
//     console.log(error)
//   }
// }

// async function getSpeciesNames() {
//   let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json`
//   const response = await axios.get(apiUrl)
//   let usBirds = []       
//   response.data.forEach(species => {
//     if(usBirdSpeciesCodes.includes(species.speciesCode)) {
//       usBirds.push({
//         speciesCode: species.speciesCode,
//         comName: species.comName
//       })
//     }
//   })
//   return usBirds
// }

// async function getBirdJson() {
//   try {
//     let birdFile = await getSpeciesNames()
//     let birdFileString =  JSON.stringify(birdFile)
//     fs.writeFile('bibdata.json', birdFileString, (err) => {
//       if (err) {
//           throw err;
//       }
//       console.log("JSON data is saved.");
//   })
//   } catch(error) {
//     console.log(error)
//   }
// }

// getBirdJson()



// async function getBird(speciesCode) {
//   try {
//     let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${speciesCode}`
//     const response = await axios.get(apiUrl)
//     const body = response.data[0]
//     const bird = {
//       commonName: body.comName,
//       speciesName: body.sciName,
//     }
//     return bird
//   } catch(error) {
//     console.log(error)
//   }
// }

// import { wrapper } from 'axios-cookiejar-support'
// import { CookieJar } from 'tough-cookie'
// import cheerio from 'cheerio'

// async function fetchHtml() {
//   try {
//     let response = await client.get(webUrl);
//     const $ = cheerio.load(response.data)
//     let data = []
//     return $('p[class=u-stack-sm]').text()
//   } catch(error) {
//     console.log(error)
//   }
// }
