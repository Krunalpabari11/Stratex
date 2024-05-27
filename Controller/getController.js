import dotenv from 'dotenv'
import { get } from '../models/getBooks.js'
import { getAll } from '../models/getBooks.js';
export async function getController(req,res)
{   try{
    const name=req.params.name
    
    console.log(name)
    const val=await get(name);
    if(val.noexist)
        {
            res.status(404).json({error:"no such book exists"})
        }
    if(val.error)
        {
            res.status(200).json({error:"some internal server error"})
        }
    if(val.result)
        {
            res.status(200).json({result:val.result})
        }
    }
    catch(ex)
    {
        return res.status(500).json({error:"some internal server error"})
    }
}
export async function getAllController(req,res){
    try{
        const result=await getAll()
        if(result.error)
            {
                res.status(500).json({error:"some internal server error"})
            }
        if(result.noorg)
            {
                res.status(404).json({error:"no such books exists"})
            }
        if(result.result)
            {
                res.status(200).json({resulst:result.result})
            }
    }
    catch(ex)
    {
        res.status(500).json({error:"some internal server error"})
    }
}