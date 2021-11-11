import { usBirdSpeciesCodes } from "../data/usBirds.js"
import axios from 'axios'
import {birdData} from "../data/birbdata.js"

const usSpecies = birdData


async function index(req, res) {
  try {
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

async function getBird(speciesCode) {
  try {
    let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${speciesCode}`
    const response = await axios.get(apiUrl)
    const body = response.data[0]
    // console.log(body)
    const bird = {
      commonName: body.comName,
      speciesName: body.sciName,
      speciesCode: body.speciesCode,
      familyComName: body.familyComName,
      cornellLink: `https://ebird.org/species/${body.speciesCode}`
    }
    return bird
  } catch(error) {
    console.log(error)
  }
}

async function findBird(req, res) {
  try
    {
      const birdId = req.body.bird
      res.redirect(`/birbs/${birdId}`)
    } catch (error){
      console.log(error)
      res.redirect(`/birbs`)
    }
}

async function show(req, res) {
  try {
    // console.log(req.params)
    const bird = await getBird(req.params.id)
    res.render('birbs/show', {
      title: `${bird.commonName}`,
      bird

    })
  } catch(error) {
    console.log(error)
  }
}


export {
  index,
  show,
  findBird
}