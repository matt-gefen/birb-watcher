import {Profile} from "../models/profile.js"
import {states} from "../data/states.js"

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

function show(req,res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render(`profiles/show`,{
        profile,
        title: `${profile.name}'s Profile'`,
        states,
        isSelf
        },
      )
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles`)
  })
}

function showSighting(req,res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      const sighting = profile.sightings.find(sight => String(sight._id) === req.params.sightingId)
      res.render(`profiles/showSighting`,{
        profile,
        title: 'Sighting Details',
        isSelf,
        sighting
        },
      )
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles`)
  })
}

function createSighting(req, res) {

  Profile.findById(req.params.id)
  .then(profile => {
    let dateSighted = new Date(req.body.date)
    req.body.date = dateSighted.toUTCString()
    profile.sightings.push(req.body)
    profile.save()
    res.redirect(`/profiles/${req.params.id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  })

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
    let dateSighted = new Date(req.body.date)
    req.body.date = dateSighted.toUTCString()
    const sighting = profile.sightings.findIndex(sight => (String(sight._id) === req.params.sightingId))
    // console.log(req.body)
    profile.sightings[sighting] = req.body
    profile.save()
    // console.log(profile.sightings[sighting])
  })
  .then(() => {
    res.redirect(`/profiles/${req.params.id}`)
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

export {
  index,
  show,
  createSighting,
  showSighting,
  editSighting,
  updateSighting,
  deleteSighting
}