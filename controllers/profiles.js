import {Profile} from "../models/profile.js"

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
    title: `${profile.name}'s Profile'`})
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/profiles`)
  })
}

export {
  index,
  show
}