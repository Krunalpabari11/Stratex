import { updateBook } from "../models/updatebook.js"
export async function updateController(req,res)
{   
    if(req.user.role=="seller"){
    try{
        const id=req.body.id
        const title=req.body.title
        const author=req.body.author
        const publishedDate=req.body.publishedDate
        const  price=req.body.price
        const seller_id=req.user.id
        const obj={
             id:id,
             title:title,
             author:author,
             publishedDate:publishedDate,
              price:price,
             seller_id:seller_id
        }
       
        const result=await updateBook(obj)
        if(result.error)
            {
                res.status(500).json({error:"some internal server error"})
            }
        if(result.success)
            {
                res.status(200).json({result:"updation done"})
            }
        if(result.fail) 
            {
                res.status(500).json({error:"no such book exists"})
            }
    }
    catch(ex)
    {
        res.send(500).json({error:"some internal server error"})
    }
    }
    else{
        res.status(500).json({error:"sorry only sellers are allowed to upload"})
    }
}