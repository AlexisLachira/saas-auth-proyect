

import pool from "../config/db.js";


export const createOrganizationService = async (name, userId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // 1️⃣ Crear organización
    const orgResult = await client.query(
      `INSERT INTO organizations (name)
       VALUES ($1)
       RETURNING *`,
      [name]
    )

    const organization = orgResult.rows[0]

    // 2️⃣ Relacionar usuario como owner
    await client.query(
      `INSERT INTO user_organization (user_id, organization_id, role)
       VALUES ($1, $2, 'owner')`,
      [userId, organization.id]
    )

    await client.query('COMMIT')

  } catch (error) {
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }

}  

export const getOrganizationService = async (req, res) => {
  const userId = req.userId

  try {
    const result = await pool.query(
      `SELECT o.id, o.name FROM organizations o
       JOIN user_organization uo ON o.id = uo.organization_id
       WHERE uo.user_id = $1`,
      [userId]
    )
    res.json({ organizations: result.rows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
