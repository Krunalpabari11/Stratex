import db from "../DBconnection.js";

export async function del(data)
{
    try{
        
        const query="delete from books where id=? AND seller_Id=?"
        const obj=[data.id,data.seller_id]
       
        const [result]=await db.query(query,obj)

        if(result.affectedRows==0)
            {
                const obj={noexist:"no such user exists"};
                return obj
            }
        if(result)
            {
                const obj={result:result}
                return obj;
            }
    }
    catch(ex)
    {   const obj={error:"some internal server error"}
        return obj;
    }
}