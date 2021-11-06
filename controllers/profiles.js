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
    res.render(`profiles/show`,{
    profile,
    title: `${profile.name}'s Profile'`,
    states},
    )
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles`)
  })
}

function createSighting(req, res) {

  Profile.findById(req.params.id)
  .then(profile => {
    profile.sightings.push(req.body)
    profile.save()
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles/${req.params.id}`)
  })

}

export {
  index,
  show,
  createSighting
}