import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// pool.query('INSERT INTO admin_table(firstname, lastname, email, admin_password, gender, department, jobrole, admin_no, creation_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', ["OLUWATOSIN", "FETUGA", "gnztrades@gmail.com", "adminTosin", "Male", "I.T", "I.T", 902307, "10-10-2019"], (err, resp, body) => {
//   if(err) console.log(err);

// });

export default pool;
