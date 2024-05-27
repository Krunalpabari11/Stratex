import db from "../DBconnection.js";

export async function updateBook(data)
{   try{
    const query = `UPDATE books SET title=?, author=?, publishedDate=?, price=? WHERE id=? AND seller_id=?`;

    const title=data.title;
    const author=data.author;
    const publishedDate=data.publishedDate;
    const price=data.price;
    const id=data.id;
    const seller_id=data.seller_id

    const [result]=await db.query(query,[title,author,publishedDate,price,id,seller_id]);

    if(result.affectedRows==0)
        {
            const obj={fail:"no such book exists"}
            return obj
        }
        if(result.affectedRows>0)
            {
                const obj={success:"updation successfull"}
                return obj;
            }
        }
        catch(ex)
        {
            const obj={error:"some internal server error"}
        return obj;
        }

}