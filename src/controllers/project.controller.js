import pool from "../config/db.js";
import { createProjectService, getProjectsByOrganizationService  } from "../services/project.service.js";


export const createProject = async (req, res) => {
    const { name} = req.body
    const { orgId } = req.params


    try {
        // Crear el proyecto
        const project = await createProjectService(name, orgId)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getProjectsByOrganization = async (req, res) => {
  const { orgId } = req.params
  const userId = req.userId

  try {
  
    // 2️⃣ Listar proyectos
    const projects = await getProjectsByOrganizationService(orgId)
    res.json(projects)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}  