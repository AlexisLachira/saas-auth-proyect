import pool from '../config/db.js'

export const createTaskService = async (title, projectId) => {
  const result = await pool.query(
    `
    INSERT INTO tasks (title, project_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [title, projectId]
  )

  return result.rows[0]
}