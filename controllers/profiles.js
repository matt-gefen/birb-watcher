import {Profile} from "../models/profile.js"
import {states} from "../data/states.js"
import { usBirdSpeciesCodes } from "../data/usBirds.js"
// import axios from 'axios'
// import fs from 'fs'
import {birdData} from "../data/birbdata.js"

const usSpecies = birdData

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

function getDefaultDate() {
  let defaultDate = new Date()
  let defaultMonth = defaultDate.getUTCMonth()
  let defaultDay = defaultDate.getUTCDate()
  let defaultYear = defaultDate.getUTCFullYear()
  defaultDate = `${defaultYear}-${defaultMonth + 1}-${defaultDay}`
  return defaultDate
}

async function show(req,res) {
  try {
    const profile = await Profile.findById(req.params.id)
    const self = await Profile.findById(req.user.profile._id)
    const isSelf = await self._id.equals(profile._id)
    let defaultDate = getDefaultDate()
    res.render(`profiles/show`,{
        profile,
        title: `${profile.name}'s Profile`,
        states,
        usSpecies,
        isSelf,
        defaultDate
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
  const sighting = await profile.sightings.id(req.params.sightingId)
        res.render(`profiles/showSighting`,{
        profile,
        title: 'Sighting Details',
        isSelf,
        sighting,
        usSpecies,
        },
      )
  } catch (error) {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  }
}

async function createSighting(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    let dateSighted = new Date(req.body.date)
    req.body.date = dateSighted.toUTCString()
    let birdArr = req.body.bird.split(',')
    let birdObj = {
      commonName: birdArr[1],
      speciesCode:birdArr[0]
    }
    req.body.bird = ''
    req.body.birds = []
    req.body.birds.push(birdObj)
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
    const sighting = profile.sightings.id(req.params.sightingId)
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
    const sighting = profile.sightings.id(req.params.sightingId)
    const birds = sighting.birds
    let dateSighted = new Date(req.body.date)
    req.body.birds = birds
    req.body.date = dateSighted.toUTCString()
    sighting.date = req.body.date
    sighting.city = req.body.city
    sighting.notes = req.body.notes
    sighting.birds = req.body.birds

    profile.save()

    .then(() => {
      res.redirect(`/profiles/${req.params.id}/${req.params.sightingId}`)
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
    console.log(req.body)
    console.log(req.params)
    let bird = usSpecies.find(bird => bird.speciesCode === req.body.bird)
    console.log(bird)
    bird = {
      commonName: bird.comName,
      speciesCode: bird.speciesCode
    }
    console.log(bird)
    const profile = await Profile.findById(req.params.id)
    const sighting = await profile.sightings.id(req.params.sightingId)
    sighting.birds.push(bird)
    profile.save()
    res.redirect(`/profiles/${profile._id}/${sighting._id}`)
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