import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import signInQuery from '../Models/signInModel';

const signIn = (req, res, next) => {
  let loggedUser, user, pass, query, mode, userNo, userPass;
  if (req.body.adminUser) {
    loggedUser = true;
    const { adminUser, password } = req.body;
    user = adminUser;
    pass = password;
    query = signInQuery.admin;
    mode = 1;
  } else if (req.body.username) {
    loggedUser = false;
    const { username, password } = req.body;
    user = username;
    pass = password;
    query = signInQuery.employee;
    mode = 2;
  }
  
  if (!user || !pass) {
    res.status(400).json({
      status: 'error',
      error: 'Please input the correct username and password',
    });
    return;
  }
  pool.query(query, [user])
    .then((users) => {
      if (mode == 1) {
        userNo = users.rows[0].admin_no;
        userPass = users.rows[0].admin_password;
      } else if (mode == 2) {
        userNo = users.rows[0].employee_no;
        userPass = users.rows[0].employee_password;
      }
      if (users) {
        const passed = bcrypt.compareSync(pass, userPass);
        if (passed) {
          const token = jwt.sign({
            sub: userNo,
            username: users.rows[0].email,
            admin: loggedUser,
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
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
};

export default signIn;
