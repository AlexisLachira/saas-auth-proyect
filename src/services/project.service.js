

import pool from "../config/db.js";


export const createProjectService = async (name, orgId) => {
    const projectResult = await pool.query(
        `INSERT INTO projects (name, organization_id)
         VALUES ($1, $2)
         RETURNING *`,
        [name, orgId]
    )
    return projectResult.rows[0]
}


export const getProjectsByOrganizationService = async (orgId) => {
    const projectsResult = await pool.query(
        `SELECT id, name, created_at
         FROM projects
         WHERE organization_id = $1
         ORDER BY created_at DESC`,
        [orgId]
    )
    return projectsResult.rows
}