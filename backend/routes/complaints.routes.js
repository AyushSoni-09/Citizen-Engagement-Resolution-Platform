//routes/complaints.routes.js

// src/routes/complaints.js
import { Router } from 'express';
import db from '../config/db.js';
import { auth, authorize } from '../middleware/auth.middleware.js';
const r = Router();

// User raises complaint
r.post('/', auth, authorize('user'), async (req, res) => {
  const { title, description, dept_id } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'title/description required' });
  const [result] = await db.query(
    'INSERT INTO complaints (user_id, title, description, dept_id) VALUES (?,?,?,?)',
    [req.user.user_id, title, description, dept_id || null]
  );
  res.status(201).json({ complaint_id: result.insertId, status: 'pending' });
});

// User’s own complaints
r.get('/mine', auth, authorize('user'), async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.user_id]
  );
  res.json(rows);
});

// Admin/staff list complaints
r.get('/', auth, authorize('admin','staff'), async (req, res) => {
  const [rows] = await db.query('SELECT * FROM complaints ORDER BY created_at DESC');
  res.json(rows);
});



// Admin assigns complaint
r.post('/:id/assign', auth, authorize('admin'), async (req, res) => {
  const { staff_id, dept_id } = req.body;
  const complaint_id = req.params.id;

  await db.query(
    `INSERT INTO complaint_assignment (complaint_id, admin_id, staff_id, dept_id)
     VALUES (?,?,?,?)`,
    [complaint_id, req.user.user_id, staff_id, dept_id]
  );
  await db.query(
    `UPDATE complaints SET status = 'assigned', dept_id = ?, updated_at = NOW() WHERE complaint_id = ?`,
    [dept_id, complaint_id]
  );
  res.json({ complaint_id, staff_id, dept_id, status: 'assigned' });
});

// Staff updates status
r.put('/:id/status', auth, authorize('staff','admin'), async (req, res) => {
  const { new_status } = req.body;
  const complaint_id = req.params.id;
  await db.query(
    `UPDATE complaints SET status = ?, updated_at = NOW() WHERE complaint_id = ?`,
    [new_status, complaint_id]
  );
  res.json({ complaint_id, status: new_status });
});



export default r;


