import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

//pool.query('UPDATE articles SET tag=$1 WHERE article_id=$2', ['commerce', 137] );

export default pool;
