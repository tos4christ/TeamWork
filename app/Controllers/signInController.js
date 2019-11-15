import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import signInQuery from '../Models/signInModel';

const signIn = (req, response, next) => {
  console.log('Sign in req body' ,req.body);
  const theBody = {email: 'gnztrades@gmail.com', password: 'adminTosin'}
  const { email, password } = theBody;
  
  if (!email || !password) {
    response.status(400).send({
      status: 'error',
      error: 'Please input the correct username and password',
    });
    return;
  }
  pool.query(signInQuery, [email])
    .then((users) => {
      if (!users.rows[0]) {
        response.status(401).send({
          status: 'error',
          error: 'user not Found',
        });
        return;
      }
      if (users.rows[0]) {
        const passed = bcrypt.compareSync(password, users.rows[0].password);
        if (passed) {
          const token = jwt.sign({
            sub: users.rows[0].employee_id,
            username: users.rows[0].email,
            role: users.rows[0].role,
          }, 
          process.env.TOKENKEY, 
          { expiresIn: 1440000 }
          );
          response.status(200).send({
              status: 'success',
              data: {
                token,
                userId: users.rows[0].employee_id,
              },
          });
        } else {
          response.status(400).send({
            status: 'error',
            error: 'Password is incorrect',
          });
        }
      } else {
        response.status(400).send({
          status: 'error',
          error: 'Invalid username and password',
        });
      }
    })
    .catch( e => {
      response.status(400).send({
        "status": "error",
        "error": e.message
      });
    });
};

export default signIn;
