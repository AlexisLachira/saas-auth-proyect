import express from 'express'
import authRoutes from './routes/auth.routes.js'
import organizationRoutes from './routes/organization.routes.js'
import taskRoutes from './routes/task.routes.js'
import projectRoutes from './routes/projects.routes.js'
import { verifyToken } from './middlewares/auth.middlewares.js'

const app = express()

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/organizations', organizationRoutes)
app.use('/', taskRoutes)
app.use('/', projectRoutes)
app.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId })
})

export default app