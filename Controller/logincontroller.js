// import authenticate from '../authenticateToken.js'
import  validate  from '../models/userlogin.js'
// const {validate} =require('../models/loginuser')
import dotenv 
from 'dotenv'

dotenv.config()
import express from 'express'
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser'
const app=express()
app.use(cookieParser())
// app.use(authenticateToken)
function login(req,res){

    const data={
        name:req.body.name,
        password:req.body.password
    }
    console.log(data)
   validate(data).then(status=>{
        

        if(status.didntmatch)
            {
                res.json({error:"password doesnt match"})
            }
        if(status.error)
            {
                res.json("{internal server error}")
            }
        if(status.result)
            {   
                const obj={
                    name:req.body.name,
                    time:new Date().toISOString(),
                    id:status.result.id,
                    role:status.result.role
                }
              
                const expire=15*24*60*60
                const token=jwt.sign(obj,process.env.secrret_key,{expiresIn:expire});
                
                res.cookie('token',token,{httpOnly:true,maxAge:expire})
                res.json("{login successful}")
            }
    }).catch(err=>{
        res.json({error:"internal server error"})
    })


}
export default login