import {Profile} from "../models/profile.js"
import {states} from "../data/states.js"
import { usBirdSpeciesCodes } from "../data/usBirds.js"
import axios from 'axios'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render(`profiles/index`, {
      profiles,
      title: 'All Watchers'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}
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

async function show(req,res) {
  try {
    const profile = await Profile.findById(req.params.id)
    const self = await Profile.findById(req.user.profile._id)
    const isSelf = await self._id.equals(profile._id)
    const usSpecies = await getSpeciesNames()
    res.render(`profiles/show`,{
        profile,
        title: `${profile.name}'s Profile`,
        states,
        usSpecies,
        isSelf
        },
      )
  } catch (error) {
    console.log(error)
    res.redirect(`/profiles`)
  }
}

async function showSighting(req,res) {
  try {
  const profile = await Profile.findById(req.params.id)
  const self = await Profile.findById(req.user.profile._id)
  const isSelf = await self._id.equals(profile._id)
  const sighting = await profile.sightings.find(sight => String(sight._id) === req.params.sightingId)
  const usSpecies = await getSpeciesNames()
        res.render(`profiles/showSighting`,{
        profile,
        title: 'Sighting Details',
        isSelf,
        sighting,
        usSpecies
        },
      )
  } catch (error) {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
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

async function createSighting(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    let dateSighted = new Date(req.body.date)
    req.body.date = dateSighted.toUTCString()
    req.body.birds = []
    const bird = await getBird(req.body.bird)
    req.body.birds.push(bird)
    profile.sightings.push(req.body)
    profile.save()
    res.redirect(`/profiles/${req.params.id}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  }
}

function editSighting(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    
    const sighting = profile.sightings.find(sight => (String(sight._id) === req.params.sightingId))
    res.render(`profiles/editSighting`, {
      profile,
      sighting,
      states,
      title: `Edit Sighting Details`
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  })
}

function updateSighting(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const sighting = profile.sightings.find(sighting => req.params.sightingId === String(sighting._id))
    const sightingIndx = profile.sightings.findIndex(sighting => req.params.sightingId === String(sighting._id))
  
    const birds = sighting.birds
    let dateSighted = new Date(req.body.date)
    req.body.birds = birds
    req.body.date = dateSighted.toUTCString()
    profile.sightings[sightingIndx].date = req.body.date
    profile.sightings[sightingIndx].city = req.body.city
    profile.sightings[sightingIndx].notes = req.body.notes
    profile.sightings[sightingIndx].birds = req.body.birds

    profile.save()

    .then(() => {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  })
}

function deleteSighting(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.sightings.remove({_id:req.params.sightingId})
    profile.save()
  })
  .then(() => {
    res.redirect(`/profiles/${req.params.id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  })

}

async function createBird(req, res) {
  try {
    console.log(req.params)
    const profile = await Profile.findById(req.params.id)
    const sightingIndx = await profile.sightings.findIndex(sight => String(sight._id) === req.params.sightingId)
    const newBird = await getBird(req.body.bird)
    profile.sightings[sightingIndx].birds.push(newBird)
    profile.save()
    res.redirect(`/profiles/${req.params.id}/${req.params.sightingId}`)

  } catch(error) {
    console.log(error)
  }
}

async function deleteBird(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    const sightingIndx = await profile.sightings.findIndex(sight => String(sight._id) === req.params.sightingId)
    profile.sightings[sightingIndx].birds.remove({_id:req.params.birdId})
    profile.save()
    res.redirect(`/profiles/${req.params.id}/${req.params.sightingId}`)
  } catch(error) {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}/${req.params.sightingId}`)
  }
}

export {
  index,
  show,
  createSighting,
  showSighting,
  editSighting,
  updateSighting,
  deleteSighting,
  createBird,
  deleteBird
}