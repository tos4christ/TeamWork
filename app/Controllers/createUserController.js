import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Models/poolConnection';
import newUserQuery from '../Models/newUserModel';
import userDetails from '../utilities/getTokenUser';

const createUser = (req, response, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if(!userToken.admin) {
    response.status(401).send({
      status: 'error',
      error: 'Only an Admin user can create new employees',
    });
    return;
  }
  const {
    firstname, lastname, email, gender, jobrole, employee_no, department, employee_password,
  } = req.body;
  // check if email and password was sent
  if (!email || !employee_password) {
    response.status(400).send({
      status: 'error',
      error: ' Email or Password field cannot be empty',
    });
    return;
  }
  const hash = bcrypt.hashSync(employee_password, 9);
  const creation_date = Date().split('GMT')[0];
  pool.query(newUserQuery.newUser,
    [firstname, lastname, email, hash, gender, jobrole, employee_no, department, creation_date])
    .then((user) => {
      const token = jwt.sign({
        sub: user.rows[0].employee_no,
        email: user.rows[0].email,
      }, process.env.TOKENKEY, { expiresIn: 1440 });
      response.status(201).send({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token,
            userId: user.rows[0].employee_no,
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
