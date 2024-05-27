import db from "../DBconnection.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

export async function create(){
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50) NOT NULL ,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL
        )`;
        
        const [result]=await db.query(query);
        
        if(result)
            {
                return 200;
            }

    }
    catch(ex){
        return 500;
    }
}
export async function insert(data){
    try{
        const saltRounds = 10;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data={...data,password:hashedPassword}
         const query=`INSERT INTO users SET ?`

        const [result] =await db.query(query,data)

        if(result)
            {   const obj={success:"inserted succesfull"}
                return obj;
            }
            else{
                const obj={error:"some internal server error"}
                return obj;
            }
    }
    catch(ex)
    {   
        const obj={error:"some internal server error"}
        return obj;
    }
}