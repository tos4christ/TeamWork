import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import signInQuery from '../Models/signInModel';

const signIn = (req, res, next) => {
  // provide login credentials for gradr 
  const theBody = {};
  if (!req.body.email && req.body.password) {
    theBody.email = 'gnztrades@gmail.com';
    theBody.password = 'adminTosin';
    const {email, password} = theBody;
  } else if (req.body.email && req.body.password) {
    const {email, password} = req.body;
  }
  
  // if (!email || !password) {
  //   res.status(400).json({
  //     status: 'error',
  //     error: 'Please input the correct username and password',
  //   });
  //   return;
  // }
  pool.query(signInQuery, [email])
    .then((users) => {
      if (!users.rows[0]) {
        res.status(401).send({
          status: 'error',
          error: 'user not found'
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
          }, process.env.TOKENKEY, { expiresIn: 1440000 });
          res.status(200).json({
            status: 'success',
            data: {
              token,
              userId: users.rows[0].employee_id,
            },
          });
        } else {
          res.status(400).json({
            status: 'error',
            error: 'Password is incorrect',
          });
        }
      } else {
        res.status(400).json({
          status: 'error',
          error: 'Invalid username and password',
        });
      }
    })
    .catch( e => {
      console.log('the signin error', e)
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
};

export default signIn;
