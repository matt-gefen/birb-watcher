import { Router } from 'express'
import * as birbsCtrl from "../controllers/birbs.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router() 

router.get('/', isLoggedIn, birbsCtrl.index)
router.get('/:id', isLoggedIn, birbsCtrl.show)
router.post('/', isLoggedIn, birbsCtrl.findBird)

export {
  router
}