import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  const user = req.user ? req.user : null
  if (user) {
    res.redirect(`/profiles/${user.profile._id}`)
  }
  else {
    res.render('index', { 
      title: 'BirbWatcher', 
      user: user
    })
  }
})

export {
  router
}
