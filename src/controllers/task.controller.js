
import { createTaskService } from '../services/task.service.js'

export const createTask = async (req, res) => {
  const { title } = req.body
  const projectId = req.projectId

  try {
    const task = await createTaskService(title, projectId)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
