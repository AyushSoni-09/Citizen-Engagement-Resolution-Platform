//routes/complaint.routes.js

const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/complaint.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { verify } = require('jsonwebtoken');

//create a complaint(user must be logged in ) - image opteional
router.post('/create',auth(),upload.single('image'), ComplaintController.createComplaint);

//get all complaints for the logged-in user
router.get('/my' , auth(), ComplaintController.getUserComplaints);

// router.get('/' , auth() , ComplaintController.getAllComplaints);

//staff get all complaints
router.get("/staff/all" , auth() , ComplaintController.allComplaints);

//staff will assign complain through complain id
router.put("/assign/:id" , auth(), ComplaintController.assignComplaint);

//staff will update complain through complain id  from params and status from req.body
router.put("/status/:id" , auth() , ComplaintController.updateStatus);


//admin get all user list 
router.get("/admin/users" , auth() , ComplaintController.allUsers);


module.exports = router;