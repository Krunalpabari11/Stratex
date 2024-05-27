import express from 'express';
import dotenv from 'dotenv';
import { create, insert } from '../models/signup.js';
dotenv.config();

export async function createController(req, res) {
    try {
        const val = await create();
      
        if (val === 500) {
            return res.status(500).json({ error: "Some internal server error" });
        }
           
        const name=req.body.name
        const password=req.body.password
        const role=req.body.role

        const obj={
                name:name,
                password:password,
                role:role
        }
            
        const result = await insert(obj);
      
        
        if (result.success) {
            return res.status(200).json({ success: "Inserted successfully" });
        }
        if(result.error)
            {
                res.status(500).json({ error: "Some internal server error" });
            }
    } catch (ex) {
        res.status(500).json({ error: "Some internal server error" });
    }
}
