import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardamos el userId en la request
    req.userId = decoded.userId
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}