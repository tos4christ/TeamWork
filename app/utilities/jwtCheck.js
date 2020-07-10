import jwt from 'jsonwebtoken';

const jwtCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      status: 'error',
      error: 'Unauthorized access 1',
    });
    return;
  }
  if (req.headers.authorization) {
    const toks = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    jwt.verify(toks, process.env.TOKENKEY, (err, tokers) => {
      if (err) {
        res.status(401).json({
          status: 'error',
          error: err.message,
        });
        return;
      }
      if (!tokers) {
        res.status(410).json({
          status: 'error',
          error: 'Unauthorized access 2',
        });
      } else if (tokers) {
        next();
      }
    });
  }
};

export default jwtCheck;
