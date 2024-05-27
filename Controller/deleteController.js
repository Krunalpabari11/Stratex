import { del} from "../models/deleteBook.js";

export async function deleteController(req,res)
{
    try{
        
        const id=req.params.id
        const seller_id=req.user.id
        const obj={
            id:id,
            seller_id:seller_id
        }
        
        const data=await del(obj)
        if(data.noexist)
            {
                res.status(404).json({error:"no such book exits"})
            }
        if(data.result)
            {
                res.status(200).json({result:"deleted successfully"})

            }
        if(data.error)
            {
                res.status(500).json({error:"some internal server error"})
            }
    }
    catch(ex)
    {
        res.status(500).json({error:"some internal server error"})
    }
}