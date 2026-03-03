export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        message: 'No tienes permisos suficientes'
      })
    }

    next()
  }
}