
import { Router } from 'express'
import { createProject, getProjectsByOrganization } from '../controllers/project.controller.js'
import { verifyToken } from '../middlewares/auth.middlewares.js'
import { verifyOrganizationAccess } from '../middlewares/organizations.middleware.js'
import { requireRole } from '../middlewares/role.middleware.js'

const router = Router()


router.post('/organizations/:orgId/projects',
    verifyToken, verifyOrganizationAccess,
    requireRole('owner', 'admin'),
    createProject)

router.get('/organizations/:orgId/projects', verifyToken, getProjectsByOrganization)

// router.delete('/organizations/:orgId/projects/:projectId',
//     verifyToken, verifyOrganizationAccess,
//     requireRole('owner'),
//     deleteProject)

export default router
