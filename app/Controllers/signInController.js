import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import signInQuery from '../Models/signInModel';

const signIn = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      status: 'error',
      error: 'Error: Please input the correct username and password',
    });
    return;
  }
  pool.query(signInQuery, [username])
    .then((user) => {
      if (user) {
        const passed = bcrypt.compareSync(password, user.rows[0].employee_password);
        if (passed) {
          const token = jwt.sign({
            sub: user.rows[0].employee_no,
            username: user.rows[0].email,
          }, process.env.TOKENKEY, { expiresIn: 1440000 });

          res.status(200).json({
            status: 'success',
            data: {
              token,
              userId: user.rows[0].employee_id,
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
    .catch((e) => {
      next(e);
    });
};

export default signIn;
