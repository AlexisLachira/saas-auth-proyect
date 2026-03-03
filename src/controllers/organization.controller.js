import pool from '../config/db.js'
import { createOrganizationService, getOrganizationService } from '../services/organizations.service.js'

export const createOrganization = async (req, res) => {
  const { name } = req.body
  const userId = req.userId

  try {
    const organization = await createOrganizationService(name, userId)
    res.status(201).json({
      message: 'Organización creada',
      organization
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getOrganizations = async (req, res) => {
  try {
    await getOrganizationService(req, res)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} 