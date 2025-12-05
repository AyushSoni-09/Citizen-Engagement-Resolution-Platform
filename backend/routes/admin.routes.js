//routes/admin.routes.js

const express = require('express');
const routes = express.Router();

const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');
const router = require('./auth.routes');

//Admin-only routes

router.get('/complaints' , auth("admin") , adminController.getAllComplaints);
router.put('/complaints/:id' , auth("admin") , adminController.updateStatus);

module.exports = router;