import {Router} from 'express'
import { createTask } from '../controllers/task.controller.js'
import { verifyToken } from '../middlewares/auth.middlewares.js'
import { verifyProjectAccess } from '../middlewares/project.middleware.js'
import { requireRole } from '../middlewares/role.middleware.js'


const router = Router()

router.post(
    '/projects/:projectId/tasks',
    verifyToken,
    verifyProjectAccess,
    requireRole('owner', 'admin', 'editor'),
    createTask)

export default router