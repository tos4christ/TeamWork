const verify = (body) => {
  const a = typeof body.firstName == 'string';
  const b = typeof body.gender == 'string';
  const c = typeof body.lastName == 'string';
  const d = typeof body.email == 'string';
  const e = typeof body.jobRole == 'string';
  const f = typeof body.department == 'string';
  const g = typeof body.address == 'string';
  const h = typeof body.password == 'string';
  return a && b && c && d && e && f && g && h;
}

// const body = {firstName: 'to', gender: 'm', lastName: 'l', email: 'a', jobRole: 's', department: 'r', address: 'f', password: 'r' };
// console.log(verify(body));

export default verify;
