//controllers/complaint.controller.js

const pool = require('../config/db');


// USER: Create complaint
exports.createComplaint = async(req , res)=>{
    try{
        const {title , description , category} = req.body;
        if(!title)return res.status(400).json({message:"Title is required"});

        // req.user is set by auth middleware
        const userId = req.user && req.userId ? req.user.id : null;
        if(!userId) return res.status(401).json({message:'Unauthorized'});

        const image = req.file?req.file.filename:null;
        
        const [result] = await pool.query(
            'Insert into complaints (user_id , title , description , category , image) values(?,?,?,?,?)',
            [userId , title , descritption ||null , category||null , image]
        );

        res.json({message:'Complaint resgistered' , complaintId: result.insertId});
    }catch(err){
        console.error('Create Complaint error',err);
        res.status(500).json({message:'Server error'});
        
    }
};

// USER: My complaints
exports.getUserComplaints = async(req , res)=>{
    try {
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [rows] = await pool.query(
      'SELECT id, title, description, category, status, image, created_at FROM complaints WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Get user complaints error:', err);
    res.status(500).json({ message: 'Server error' });
  } 
};

exports.getComplaintById = async( req , res)=>{
   try {
    const { id } = req.params;
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [rows] = await pool.query(
      'SELECT c.*, u.name AS user_name, u.email FROM complaints c JOIN users u ON c.user_id = u.id WHERE c.id = ?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Complaint not found' });

    const complaint = rows[0];
    // Ensure normal user can only view own complaint
    if (req.user.role !== 'admin' && complaint.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(complaint);
  } catch (err) {
    console.error('Get complaint by id error:', err);
    res.status(500).json({ message: 'Server error' });
  }  
}


// STAFF: View all complaints
exports.allComplaints = (req, res) => {
    if (req.user.role !== 'staff') return res.status(403).send("Not Allowed");

    db.query("SELECT * FROM complaints", (err, rows) => {
        if (err) return res.status(400).send(err);
        res.json(rows);
    });
};

// STAFF: Assign complaint
exports.assignComplaint = (req, res) => {
    const { staffId } = req.body;
    const { id } = req.params;

    const sql = "UPDATE complaints SET assigned_to = ? WHERE id = ?";

    db.query(sql, [staffId, id], (err) => {
        if (err) return res.status(400).send(err);
        res.send("Assigned Successfully");
    });
};

// STAFF: Update status
exports.updateStatus = (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const sql = "UPDATE complaints SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err) => {
        if (err) return res.status(400).send(err);
        res.send("Status Updated");
    });
};

// ADMIN: View all users
exports.allUsers = (req, res) => {
    if (req.user.role !== "admin") return res.status(403).send("Not Allowed");

    db.query("SELECT * FROM users", (err, rows) => {
        if (err) return res.status(400).send(err);
        res.json(rows);
    });
};