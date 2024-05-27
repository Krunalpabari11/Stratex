import db from '../DBconnection.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

export async function createBooks() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                author VARCHAR(50) NOT NULL,
                publishedDate DATE NOT NULL,
                price INT NOT NULL,
                seller_id INT NOT NULL,
                FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `;

        const [result] = await db.query(query);
        if (result) {
            return 200;
        }
    } catch (ex) {
        return 500;
    }
}

export async function uploadBooks(req, res) {
    const filePath = req.file.path;
    console.log(req.file.path)

    let results = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', async () => {
            const additionalColumn1 = req.user.id; // Replace with your value
             // Replace with your value

          
            try {
               
                for (const row of results) {
                    const { title, author,publishedDate,price } = row;
                    const obj={
                        title:title,
                        author:author,
                        publishedDate:publishedDate,
                        price:price,
                        seller_id:additionalColumn1
                    }   
                    console.log(row)
                    await db.query(
                        'INSERT INTO books set ?',
                        obj
                    );
                }
               
                res.send('File uploaded and data inserted successfully!');
            } catch (error) {
                
                console.error('Error inserting data: ', error);
                res.status(500).send('Internal server error');
            } finally {
              
                fs.unlinkSync(filePath);  // Delete the file after processing
            }
        });
}
