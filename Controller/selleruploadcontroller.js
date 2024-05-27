import { createBooks } from "../models/sellerupload.js";
import { uploadBooks } from "../models/sellerupload.js";
export async function uploadfromCsv(req,res)
{   
    const result=await createBooks();
     if(result!=200)
        {
            res.status(500).json({error:"some internal server error"})
        }

    await uploadBooks(req,res);
}