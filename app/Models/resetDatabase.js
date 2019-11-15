import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// const hash = bcrypt.hashSync('adminTosin', 9);
// pool.query('UPDATE employees SET employee_password=$1 WHERE email=$2', [hash, 'gnztrades@gmail.com'], (err, resp) => {
//   if (err) console.log(err);
//   console.log('deleted successfuly', resp);
// });

pool.query('DELETE FROM gif_table WHERE gif_id=$1', [12])
  .then( response => {
    pool.query('INSERT INTO gif_table(gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES($1, $2, $3, $4, $5, $6, $7)', 
      [12, "new gif", "https://res.cloudinary.com/tos4christ/image/upload/v1573235762/joo8zm36uc1od5e4fg0k.jpg", false, 2, "10-10-2019", "joo8zm36uc1od5e4fg0k"])
      .then( res => {
        pool.query('DELETE FROM employees where email=$1', ["testing@examples.com"])
          .then( resp => {
            pool.query('INSERT INTO gif_table(gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES($1, $2, $3, $4, $5, $6, $7)', 
            [13, "newest gif", "https://res.cloudinary.com/tos4christ/image/upload/v1573235762/joo8zm36uc1od5e4fg0k.jpg", true, 29, "10-10-2019", "joo8zm36uc1od5e4fg0k"])
              .then( () => {
                console.log('Database has been reset');
              })
              .catch( e => console.log(e.message));
          })
          .catch( e => console.log(e.message));
      })
      .catch( e => console.log(e.message));
  })
  .catch( e => console.log(e.message));

export default pool;
