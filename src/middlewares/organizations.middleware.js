

import pool from "../config/db.js";


export const verifyOrganizationAccess = async (req, res, next) => {
    const { orgId } = req.params
    const userId = req.userId
    try {
        const result = await pool.query(
            `SELECT role FROM user_organization 
             WHERE user_id = $1 AND organization_id = $2`,
            [userId, orgId]
        )
        if (result.rows.length === 0) {
            return res.status(403).json({ message: "No tienes acceso a esta organización" })
        }
        // Guardamos el rol en request para usarlo en otros middlewares o controladores
        req.userRole = result.rows[0].role
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }   
}