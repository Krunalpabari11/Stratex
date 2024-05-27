import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
// import mysql from 'mysql'
const db=mysql.createPool({
   
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME   

});
(
async () => {
    try {
        await db.query('show databases'); // Execute a simple query to check the connection
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();

export default db