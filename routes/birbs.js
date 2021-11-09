import { Router } from 'express'
import * as birbsCtrl from "../controllers/birbs.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router() 

export {
  router
}