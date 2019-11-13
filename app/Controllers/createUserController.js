import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import newUserQuery from '../Models/newUserModel';

const createUser = (req, res, next) => {
  const {
    firstname, lastname, email, gender, jobrole, employee_no, department, employee_password,
  } = req.body;
  // check if email and password was sent
  if (!email || !employee_password) {
    res.status(400).json({
      status: 'error',
      error: ' Email or Password field cannot be empty',
    });
    next();
  }
  const hash = bcrypt.hashSync(employee_password, 9);
  const creation_date = Date().split('GMT')[0];
  pool.query(newUserQuery,
    [firstname, lastname, email, hash, gender, jobrole, employee_no, department, creation_date])
    .then((user) => {
      const token = jwt.sign({
        sub: user.rows[0].employee_no,
        email: user.rows[0].email,
      }, process.env.TOKENKEY, { expiresIn: 1440 });
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token,
          userId: user.rows[0].employee_no,
        },
      });
    })
    .catch(e => next(e));
};

export default createUser;
