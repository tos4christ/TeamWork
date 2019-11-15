import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import newUserQuery from '../Models/newUserModel';
import userDetails from '../utilities/getTokenUser';

const createUser = (req, response, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  } else {
    token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJ1c2VybmFtZSI6ImduenRyYWRlc0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM4MTg2MDYsImV4cCI6MTU3NTI1ODYwNn0.WF9MzgO4RLNuVRwS-EczJeT-ARY3623RLJUN-NxTAWc`
  }
  const userToken = userDetails(token);
  if(userToken.role !== 'admin') {
    response.status(401).send({
      status: 'error',
      error: 'Only an Admin user can create new employees',
    });
    return;
  }
  const theBody = {
    firstName: 'OLUWATOSIN', lastName: 'fetuga', email: 'gnztraders@gmail.com', gender: 'Male', jobRole: 'I.T', department: 'I.T', address: 'Lagos Nigeria', password: 'adminTosin'
  }
  const {
    firstName, lastName, email, gender, jobRole, department, address, password
  } = theBody;
  // check if email and password was sent
  // if (!email || !password) {
  //   response.status(400).send({
  //     status: 'error',
  //     error: ' Email or Password field cannot be empty',
  //   });
  //   return;
  // }

  const hash = bcrypt.hashSync(password, 9);
  const creation_date = Date().split('GMT')[0];
  pool.query(newUserQuery.newUser,
    [firstName, lastName, email, hash, gender, jobRole, address, department, creation_date])
    .then((user) => {
      const token = jwt.sign({
        sub: user.rows[0].employee_id,
        email: user.rows[0].email,
      }, process.env.TOKENKEY, { expiresIn: 1440 });
      response.status(201).send({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token,
            userId: user.rows[0].employee_id,
          },
      });
    })
    .catch(e => {
      response.status(400).send({
        "status": "error",
        "error": e.message
      });
    });
};

export default createUser;
