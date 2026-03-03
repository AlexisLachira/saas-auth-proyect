import pool from '../config/db.js'

export const verifyProjectAccess = async (req, res, next) => {
  const { projectId } = req.params
  const userId = req.userId

  try {
    const result = await pool.query(
      `
      SELECT uo.role
      FROM projects p
      JOIN organizations o ON p.organization_id = o.id
      JOIN user_organization uo ON uo.organization_id = o.id
      WHERE p.id = $1 AND uo.user_id = $2
      `,
      [projectId, userId]
    )

    if (result.rows.length === 0) {
      return res.status(403).json({
        message: 'No tienes acceso a este proyecto'
      })
    }

    // 🔥 Guardamos el rol en request
    req.userRole = result.rows[0].role
    req.projectId = projectId

    next()

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}