const userQuery = {};

userQuery.employee = 'SELECT * FROM employees WHERE email=$1';
userQuery.admin = 'SELECT * FROM admin_table WHERE email=$1'

export default userQuery;
