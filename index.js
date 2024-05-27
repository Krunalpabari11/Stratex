import { createController } from "./Controller/signupcontroller.js";
import login from "./Controller/logincontroller.js";
import multer from 'multer';
import { uploadfromCsv } from "./Controller/selleruploadcontroller.js";
import { updateController } from "./Controller/updateController.js";
import authenticate from "./authenticateToken.js";
import { getAllController } from "./Controller/getController.js";
import { getController } from "./Controller/getController.js";
import { deleteController } from "./Controller/deleteController.js";
import express from 'express'
import cookieParser from "cookie-parser";
const app=express();
app.use(express.json())
app.use(cookieParser())
app.post('/signup',createController)
app.post('/login',login)
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), authenticate,uploadfromCsv);
app.post('/update',authenticate,updateController)
app.get('/get/:name',authenticate,getController)
app.get('/get',authenticate,getAllController)
app.get('/delete/:id',authenticate,deleteController)
app.listen(5000,()=>{
    console.log("listening")
})