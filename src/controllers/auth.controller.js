import pool from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async(req, res) =>{
    const { username, email, password } = req.body
    try {
        // Verificar si el usuario ya existe
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)
        // Registrar al nuevo usuario
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        )
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const login = async(req,res) => {
    const {email, password} = req.body
    
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(result.rows.length === 0){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const user = result.rows[0]
        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ message: 'Login successful', token })


    } catch (error) {
         res.status(500).json({ message: 'Internal server error' })   
    }
}