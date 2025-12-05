//controller/admin.controller.js

const pool = require('../config/db');

exports.getAllComplaints = async(req , res)=>{
     try {
    const [rows] = await pool.query(
      `SELECT c.id, c.title, c.description, c.category, c.status, c.image, c.created_at, u.id AS user_id, u.name AS user_name, u.email
       FROM complaints c
       JOIN users u ON c.user_id = u.id
       ORDER BY c.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Get all complaints error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req , res)=>{
    try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // update complaint status
    const [result] = await pool.query('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Complaint not found' });

    // optional: insert into complaint_updates table for timeline
    await pool.query('INSERT INTO complaint_updates (complaint_id, message) VALUES (?,?)', [id, `Status changed to ${status}`]);

    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}