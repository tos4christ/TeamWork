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

  const { comment, appr_status } = req.body;
  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.postAnArticleComment, [comment, id.rows[0].employee_id, date, appr_status])
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
              tag: article.rows[0].tag,
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
articleController.getAllArticle = (req, res, next) => {
  pool.query(articleSchema.getAllArticleText, [req.params.userId])
    .then((articles) => {
      let artNo = [];
      articles.rows.forEach( article => {
        artNo[article.id] = {
          id: article.id,
          createdon: article.createdon,
          title: article.title,
          article: article.article
        }
      });
      const Articles = artNo.filter( no => no.id !== null );
      const num = Articles.length;
      for(let j=0; j < num; j++) {
        let comments = [];
        const article = articles.rows.filter( article => article.id == Articles[j].id);
        for(let i in article) {
          const newComment = {
            "status": article[i].status,
            "commentid": article[i].commentid,
            "comment": article[i].comment,
            "createdon": article[i].createdon,
            "authorid": article[i].authorid
          }
          comments.push(newComment);
        }
        Articles[j].comments = comments;
      }
      pool.query(articleSchema.getAllArticleNoComment,[req.params.userId])
        .then(articlesNoComm => {
          Articles.push(...articlesNoComm.rows);
          res.status(200).json({
            status: 'success',
            data: {
              articles: Articles
            },
          });
        })
        .catch( e => {
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
          article: article.rows[0],
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
articleController.flagComment = (req, res, next) => {
  pool.query(articleSchema.getCommentId, [req.params.articleId])
    .then((id) => {
      pool.query(articleSchema.flagArticleComment, [req.body.appr_status , id.rows[0].id])
        .then( (flaggedComment) => {
          res.status(200).json({
            status: "success",
            data: {
              message: "comment successfully flagged",
              comment: flaggedComment.rows[0],
            }
          });
        })
        .catch( e => {
          res.status(400).json({
            "status": "error",
            "error": e.message
          });
        })
    })
    .catch( e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
}
articleController.deleteFlaggedArticle = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if (!userToken.admin) {
    res.status(401).json({
      status: 'error',
      error: 'Only an Admin user can delete a flagged Article',
    });
    return;
  }
  pool.query(articleSchema.getFlaggedArticle, [req.params.articleId])
    .then((article) => {
      if (article.rows[0].appr_status) {
        pool.query(articleSchema.deleteFlaggedArticle, [req.params.articleId])
          .then( () => {
              res.status(200).json({
                "status": "success",
                "data": {
                  message: "flagged article successfully deleted"
                }
              });
            })
      }  else {
          res.status(401).json({
            status: "error",
            error: {
              message: "Admin can only delete flagged articles",
            }
          });
      }
    })
    .catch( e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
}
articleController.deleteFlaggedComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if (!userToken.admin) {
    res.status(401).json({
      status: 'error',
      error: 'Only an Admin user can delete a flagged Comment',
    });
    return;
  }
  pool.query(articleSchema.getCommentId, [req.params.articleId])
    .then((id) => {
      pool.query(articleSchema.getFlaggedComment, [id.rows[0].id])
        .then( (comment) => {
          if(comment.rows[0].appr_status) {
            pool.query(articleSchema.deleteFlaggedComment, [comment.rows[0].comment_id])
              .then( () => {
                res.status(200).json({
                  status: "success",
                  data: {
                    message: "flagged comment successfully deleted",
                  }
                });
              })
              .catch( e => {
                res.status(400).json({
                  "status": "error",
                  "error": e.message
                });
              });
          } else {
            res.status(401).json({
              status: "error",
              error: {
                message: "Admin can only delete flagged comments",
              }
            });
          }
        })
        .catch( e => {
          res.status(400).json({
            "status": "error",
            "error": e.message
          });
        });
    })
    .catch( e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
}
articleController.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  
  pool.query(articleSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(articleSchema.deleteComment, [req.params.commentId, id.rows[0].employee_id])
        .then((result) => {
          res.status(200).json({
            "status": "success",
            "data": {
              result,
              message: "comment successfully deleted"
            }
          });
        })
        .catch( e => {
          console.log(e.message);
          res.status(400).json({
            "status": "error",
            "error": e.message
          });
        });
    })
    .catch( e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });

}
articleController.getArticleByTag = (req, res, next) => {

  pool.query(articleSchema.getTagArticleText, [req.query.tag])
    .then((article) => {
      pool.query(articleSchema.getAnArticleComment, [article.rows[0].article_id])
        .then((comments) => {
          res.status(200).json({
            status: 'success',
            data: {
              article: article.rows,
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

export default articleController;
