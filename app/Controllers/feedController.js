import pool from '../Models/poolConnection';
import feedSchema from '../Models/feedSchema';

const getFeed = (req, res, next) => {
  console.log('Feed req body' ,req.body);
  pool.query(feedSchema.article)
    .then((article) => {
      pool.query(feedSchema.gif)
        .then((gif) => {
          const feedRow = [...article.rows, ...gif.rows];
          feedRow.sort((a, b) => b.createdOn - a.createdOn);
          res.status(200).json({
            status: 'success',
            data: feedRow,
          });
        })
        .catch(e => {
          res.status(400).json({
            "status": "error",
            "error": e.message
          });
        });
    })
    .catch(e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
};

export default getFeed;
