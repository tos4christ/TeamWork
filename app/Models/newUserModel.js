const userModel = {};

userModel.newUser = 'INSERT INTO employees("firstName", "lastName", email, password, gender, "jobRole", address, department, creation_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

export default userModel;
