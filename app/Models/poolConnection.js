import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://bncamlwesysfrq:70aa1093d8b60709294c6286d8cddf3431fcf90dafe9eb2b14c0b590fb82e5e9@ec2-174-129-253-144.compute-1.amazonaws.com:5432/d1pe9mpgmslihs',
  ssl: true,
});

export default pool;
