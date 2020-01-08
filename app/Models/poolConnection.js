import { config } from 'dotenv';
import { Pool } from 'pg';
import feedSchema from './feedSchema';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// pool.query('UPDATE gif_table SET gif_url=$1 WHERE gif_id=9', ['https://res.cloudinary.com/tos4christ/image/upload/v1574065216/f1akv59t1lbjhveeq1aa.gif']);
// +async function() {

//   const { rows: articleComments } = await pool.query(feedSchema.articleComments);
    
//   const { rows: gifComments } = await pool.query(feedSchema.gifComments);
//   console.log(articleComments, gifComments);

// }()

// pool.query('DELETE FROM employees where employee_id=4');
// pool.query('DELETE FROM employees where employee_id=29');
// pool.query('DELETE FROM employees where employee_id=39');



// pool.query('ALTER TABLE employees ADD COLUMN profile_pic text');

    
export default pool;
