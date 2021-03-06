import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import newUserQuery from '../Models/newUserModel';
import userDetails from '../utilities/getTokenUser';

const createUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if(userToken.role !== 'admin') {
    res.status(401).json({
      status: 'error',
      error: 'Only an Admin user can create new employees',
    });
    return;
  }
  const {
    firstName, lastName, email, gender, jobRole, department, address, password,
  } = req.body;
  // check if email and password was sent
  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      error: ' Email or Password field cannot be empty',
    });
    return;
  }
  const hash = bcrypt.hashSync(password, 9);
  const creation_date = Date().split('GMT')[0];
  pool.query(newUserQuery.newUser,
    [firstName, lastName, email, hash, gender, jobRole, address, department, creation_date])
    .then((user) => {
      const token = jwt.sign({
        sub: user.rows[0].employee_id,
        email: user.rows[0].email,
      }, process.env.TOKENKEY, { expiresIn: 1440 });
      const body = {
        status: 'success',
        data: {
          message: 'User account successfully created',
          token,
          userId: user.rows[0].employee_id,
          jobRole: user.rows[0].jobRole
      }
    };
      res.status(201).json(body);
    })
    .catch(e => {
      console.log('Create user error', e);
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
};

export default createUser;
