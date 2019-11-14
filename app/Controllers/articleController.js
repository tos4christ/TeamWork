import pool from '../Models/poolConnection';
import userDetails from '../utilities/getTokenUser';
import articleSchema from '../Models/articleSchema';

const articleController = {};

articleController.createArticle = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const {
    title, article, appr_status,
  } = req.body;
  const date = Date().split('GMT')[0];

  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.newArticle,
        [title, article, appr_status, id.rows[0].employee_id, date])
        .then((articles) => {
          res.status(201).json({
            status: 'Success',
            data: {
              message: 'Article successfully posted',
              articleId: articles.rows[0].article_id,
              createdOn: articles.rows[0].creation_date,
              title: articles.rows[0].article_title,
            },
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

articleController.postAnArticleComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const date = Date().split('GMT')[0];

  const { comment } = req.body;
  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.postAnArticleComment, [comment, id.rows[0].employee_id, date])
        .then((comments) => {
          pool.query(articleSchema.updateArticleCommentTable,
            [req.params.articleId, comments.rows[0].comment_id, comments.rows[0].employee_id])
            .then(() => {
              pool.query(articleSchema.getAnArticleText, [req.params.articleId])
                .then((article) => {
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'comment successfully created',
                      createdOn: comments.rows[0].creation_date,
                      articleTitle: article.rows[0].title,
                      article: article.rows[0].article,
                      comment: comments.rows[0].comment_text,
                    },
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

articleController.getAnArticle = (req, res, next) => {
  pool.query(articleSchema.getAnArticleText, [req.params.articleId])
    .then((article) => {
      pool.query(articleSchema.getAnArticleComment, [req.params.articleId])
        .then((comments) => {
          res.status(200).json({
            status: 'success',
            data: {
              id: article.rows[0].id,
              createdOn: article.rows[0].createdOn,
              title: article.rows[0].title,
              article: article.rows[0].article,
              comments: comments.rows,
            },
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

articleController.updateAnArticle = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);

  const { title, article } = req.body;

  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.updateAnArticle,
        [title, article, req.params.articleId, id.rows[0].employee_id])
        .then((articles) => {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Article successfully updated',
              title: articles.rows[0].article_title,
              article: articles.rows[0].article_text,
            },
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

articleController.deleteAnArticle = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);

  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.deleteAnArticle, [req.params.articleId, id.rows[0].employee_id])
        .then((resp) => {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Article successfully deleted',
            },
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

articleController.flagArticle = (req, res, next) => {
  pool.query(articleSchema.flagArticle, [req.body.appr_status, req.params.articleId])
    .then((article) => {
      res.status(200).json({
        status: "success",
        data: {
          message: "article successfully flagged",
          article,
        }
      });
    })
    .catch( e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
}

export default articleController;
