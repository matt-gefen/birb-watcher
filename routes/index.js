import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  // res.render('index', { title: 'Home Page', user: req.user ? req.user : null })
  const user = req.user ? req.user : null
  if (user) {
    res.redirect(`/profiles/${user.profile._id}`)
  }
  else {
    res.render('index', { 
      title: 'Home Page', 
      user: user
    })
  }
})

export {
  router
}
