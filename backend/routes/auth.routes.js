//routes/auth.routes.js



// src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
const r = Router();

// Register (open for all)
r.post('/register', async (req, res) => {
  const { name, email, password, roles } = req.body; 
  // roles = ['user'] OR ['user','staff']

  if (!name || !email || !password || !roles?.length) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    // Insert user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?,?,?)',
      [name, email, hash]
    );
    const userId = result.insertId;

    // Map roles
    for (const role of roles) {
      const [[roleRow]] = await db.query('SELECT role_id FROM roles WHERE role_name = ?', [role]);
      if (roleRow) {
        await db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?,?)', [userId, roleRow.role_id]);
      }
    }

    res.status(201).json({ user_id: userId, name, email, roles });
  } catch {
    res.status(409).json({ error: 'Email already exists' });
  }
});

//Login 
r.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [[user]] = await db.query(
    'SELECT * FROM users WHERE email = ?', [email]
  );
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  // Fetch roles
  const [roles] = await db.query(
    `SELECT r.role_name 
     FROM user_roles ur 
     JOIN roles r ON ur.role_id = r.role_id 
     WHERE ur.user_id = ?`,
    [user.user_id]
  );
  const roleNames = roles.map(r => r.role_name);

  const token = jwt.sign(
    { user_id: user.user_id, roles: roleNames, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, user: { user_id: user.user_id, name: user.name, roles: roleNames } });
});



//Profile
import { auth } from '../middleware/auth.middleware.js';

r.get('/me', auth, async (req, res) => {
  const [[user]] = await db.query(
    'SELECT user_id, name, email FROM users WHERE user_id = ?', 
    [req.user.user_id]
  );
  const [roles] = await db.query(
    `SELECT r.role_name 
     FROM user_roles ur 
     JOIN roles r ON ur.role_id = r.role_id 
     WHERE ur.user_id = ?`,
    [req.user.user_id]
  );
  res.json({ ...user, roles: roles.map(r => r.role_name) });
});

export default r;