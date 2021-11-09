import { usBirdSpeciesCodes } from "../data/usBirds.js"
import axios from 'axios'


async function getSpeciesNames() {
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

async function index(req, res) {
  try {
    const usSpecies = await getSpeciesNames()
    res.render(`birbs/index`,{
        title: `All Birds`,
        usSpecies,
        },
      )
  } catch (error) {
    console.log(error)
    res.redirect(`/birbs/index`)
  }
}

async function show(req, res) {
  try
    {
      console.log('now showing')
    } catch (error){
      console.log(error)
    }
}

export {
  index,
  show
}