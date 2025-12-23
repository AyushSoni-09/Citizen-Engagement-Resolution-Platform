//routes/department.routes.js

// src/routes/departments.js
import { Router } from 'express';
import db from '../config/db.js';
import { auth, authorize } from '../middleware/auth.middleware.js';
const r = Router();

r.post('/', auth, authorize('admin'), async (req, res) => {
  const { dept_name } = req.body;
  if (!dept_name) return res.status(400).json({ error: 'dept_name required' });
  try {
    const [result] = await db.query(
      'INSERT INTO departments (dept_name) VALUES (?)',
      [dept_name]
    );
    res.status(201).json({ dept_id: result.insertId, dept_name });
  } catch {
    res.status(409).json({ error: 'Department exists' });
  }
});

r.get('/', auth, authorize('admin','staff'), async (_req, res) => {
  const [rows] = await db.query('SELECT * FROM departments ORDER BY dept_name');
  res.json(rows);
});

export default r;