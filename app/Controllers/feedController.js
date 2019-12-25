import pool from '../Models/poolConnection';
import feedSchema from '../Models/feedSchema';

const getFeed = async (req, res, next) => {
  const { rows: articleComment } = await pool.query(feedSchema.articleComments);
  const {rows: gifComment} = await pool.query(feedSchema.gifComments);
  pool.query(feedSchema.article)
    .then((article) => {  
      const Articles = [];
      for(let a of article.rows) {
        const comments = articleComment.filter( ac => ac.articleid == a.id);
        if(comments.length > 0) {
          a.comments = comments;
        }
        Articles.push(a);
      }
      pool.query(feedSchema.gif)
        .then((gif) => {
          const Gifs = [];
          for(let g of gif.rows) {
            const comments = gifComment.filter( gc => gc.gifid == g.id);
            if(comments.length > 0) {
              g.comments = comments;
            }
            Gifs.push(g);
          }
          const feedRow = [...Articles, ...Gifs];
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
