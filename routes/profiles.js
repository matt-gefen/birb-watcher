import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id', isLoggedIn, profilesCtrl.createSighting)
router.get('/:id/:sightingId', isLoggedIn, profilesCtrl.showSighting)
router.get('/:id/:sightingId/edit', isLoggedIn, profilesCtrl.editSighting)
router.patch('/:id/:sightingId', isLoggedIn, profilesCtrl.updateSighting)
router.delete('/:id/:sightingId', isLoggedIn, profilesCtrl.deleteSighting)
router.post('/:id/:sightingId', isLoggedIn, profilesCtrl.createBird)

export {
  router
}