// controller/auth.controller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

exports.register = async(req , res)=>{
    try{
        const { name , email , password , role }=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:'all fields requires'});        
        }

        //Check if user exists
        const [ existing] = await pool.query('Select id from user Where email=?',[email]);
        if(existing.length){
            return res.status(400).json({message: 'Emial already registerd'});
        }
        //hased password
        const hashed = await bcrypt.hash(password , 10);
       //insert user
        const[result] = await pool.query('Insert into users (name , email , password , role) values (?,?,?,?)' , [ name , email , hashed , role]);

        res.json({message:' User Registered' , UserId : result.insertId});
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});      
    }
};

exports.login = async(req  , res)=>{
    try{
        const { email , password} = req.body;
        if(!email || !password)return res.status(400).json({message:'All Fields Required'});
        //find user
        const [rows] = await pool.query('Select * from user Where email=?',[email]);
        if(!rows.length){
            return res.status(400).json({message:'invalid Email and Password'})
        }

        const user = rows[0];
        //compare password
        const match = await bcrypt.compare(password , user.password);
        if(!match){
            return res.status(400).json({message:' Invalid password'});

        }
        //sign token( id and role) JWT tokens ko generate kr rhe h 
        const token = jwt.sign(
                            {id: user.id , role: user.role},  //user ki role or id 
                            process.env.JWT_SECRET , //signature jo secret key se banega 
                            {expiresIn:'7d'}); //7 day me expire ho jayega mean hr 7 din me fir se login krna padega new JWT k liye 
        res.json({token, user:{ id:user.id , name: user.name , email : user.email , role: user.role}}); 

    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
        
    }
};
