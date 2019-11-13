import jwt from 'jsonwebtoken';

const details = (token) => {
  const toker = jwt.verify(token, process.env.TOKENKEY, (err, tokens) => {
    if (err) throw err;
    return tokens;
  });
  return toker;
};

export default details;
