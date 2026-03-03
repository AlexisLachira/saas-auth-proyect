import { Router } from 'express'
import { createOrganization, getOrganizations  } from '../controllers/organization.controller.js'
import { verifyToken } from '../middlewares/auth.middlewares.js'

const router = Router()

router.post('/', verifyToken, createOrganization)
router.get('/', verifyToken, getOrganizations)
export default router