//server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const complaintRoutes = require('./routes/complaint.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

//create a upload folder for storing image , if not exist create it
if(!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}


app.use(cors()); //allow requests form frontend 
app.use(express.json()); //parse JSON body
app.use('/uploads' , express.static('uploads')); //serve or save uploaded files


//Routes

app.use('/api/auth' , authRoutes);
app.use('/api/complaints' , complaintRoutes);
// app.use('/api/admin' , adminRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port,()=>console.log(`Server running on port ${Port}`));
