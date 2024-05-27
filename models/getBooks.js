import db from "../DBconnection.js";

export async function get(data)
{
    try{
        const query=`select * from books where title=?`
       const [result]= await db.query(query,data)
        
        if(result.length==0)
            {
                const obj={noexist:"sorry no such book exists"}
                return obj
            }
       if(result)
            {   const obj={result:result}
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

export async function getAll()
{
    try{
        const query="select * from books"
        const [result]=await db.query(query)

        if(result.length==0)
            {
                const obj={noorg:"no books exits"}
                return obj
            }
        if(result)
            {
                const obj={result:result}
                return obj;
            }
            else{
                const obj={error:"some internal server error"}
                return obj
            }
    }
    catch(ex)
    {
        const obj={error:"some internal server error"}
        return obj
    }
}
