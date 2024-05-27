import bcrypt from 'bcrypt';
import db from '../DBconnection.js';

export default async function validate(data) {
    try {
        const name = data.name;
        const password = data.password;
        // console.log("username" + username);
        
        const query = `SELECT * FROM users WHERE name = ?`;
        const [rows] = await db.query(query, [name]);
        if (!rows || rows.length === 0) {
            return 404; // User not found
        }

        
        const hashedPassword = rows[0].password;
        const match = await bcrypt.compare(password, hashedPassword);
    
        if (match) {
            const obj = {result:rows[0]}
            return obj; // Successful login
        } else {
            const obj={didntmatch:"incorrect password"}
            return obj; // Incorrect password
        }
    } catch (err) {
        console.error(err);
        const obj={error:"some internal server error"}
        return obj; // Internal server error
    }
}
