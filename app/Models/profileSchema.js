const profileSchema = {};

profileSchema.addPic = 'UPDATE employees SET profile_pic=$1 WHERE email=$2 RETURNING *';

profileSchema.getProfile = 'SELECT * FROM employees WHERE employee_id=$1';

export default profileSchema;
