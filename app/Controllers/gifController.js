import { v2 as cloudinary } from 'cloudinary';
import pool from '../Models/poolConnection';
import userDetails from '../utilities/getTokenUser';
import gifSchema from '../Models/gifSchema';

const gifController = {};

gifController.createGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const { title, appr_status } = req.body;
  const filename = req.files.image.path;

  cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
    .then((file) => {
      const fileUrl = file.url;
      const filePublicId = file.public_id;
      const date = Date().split('GMT')[0];
      pool.query(gifSchema.getEmployeeId, [user.username])
        .then((id) => {
          pool.query(gifSchema.newGif,
            [title, fileUrl, appr_status, id.rows[0].employee_id, date, filePublicId])
            .then((gif) => {
              res.status(201).json({
                status: 'success',
                data: {
                  message: 'GIF image successfully posted',
                  gifId: gif.rows[0].gif_id,
                  createdOn: gif.rows[0].creation_date,
                  title: gif.rows[0].gif_title,
                  imageUrl: gif.rows[0].gif_url,
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
    });
};
gifController.getAGif = (req, res, next) => {
  pool.query(gifSchema.getAGif, [req.params.gifId])
    .then((gif) => {
      pool.query(gifSchema.getAGifComment, [req.params.gifId])
        .then((comments) => {
          res.status(200).json({
            status: 'success',
            data: {
              id: gif.rows[0].id,
              createdOn: gif.rows[0].createdOn,
              title: gif.rows[0].title,
              url: gif.rows[0].url,
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
gifController.getAllGif = (req, res, next) => {
  pool.query(gifSchema.getAGif, [req.params.gifId])
    .then((gif) => {
      pool.query(gifSchema.getAGifComment, [req.params.gifId])
        .then((comments) => {
          res.status(200).json({
            status: 'success',
            data: {
              id: gif.rows[0].id,
              createdOn: gif.rows[0].createdOn,
              title: gif.rows[0].title,
              url: gif.rows[0].url,
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
gifController.deleteAGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  pool.query(gifSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(gifSchema.deleteAGif, [req.params.gifId, id.rows[0].employee_id])
        .then((gif) => {
          cloudinary.uploader.destroy(gif.rows[0].gif_public_id);
          res.status(200).json({
            status: 'success',
            data: {
              message: 'gif post successfully deleted',
              'deleted message': gif.rows[0],
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
gifController.postAGifComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const date = Date().split('GMT')[0];

  const { comment } = req.body;
  pool.query(gifSchema.getEmployeeId, [user.username])
    .then((id) => {
      pool.query(gifSchema.postAGifComment, [comment, id.rows[0].employee_id, date])
        .then((comments) => {
          pool.query(gifSchema.updateGifCommentTable,
            [req.params.gifId, comments.rows[0].comment_id, comments.rows[0].employee_id])
            .then(() => {
              pool.query(gifSchema.getAGif, [req.params.gifId])
                .then((gif) => {
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'comment successfully created',
                      createdOn: comments.rows[0].creation_date,
                      gifTitle: gif.rows[0].title,
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
gifController.flagGif = (req, res, next) => {
  pool.query(gifSchema.flagGif, [req.body.appr_status, req.params.gifId])
    .then((gif) => {
      res.status(200).json({
        status: "success",
        data: {
          message: "gif successfully flagged",
          gif: gif.rows[0],
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
gifController.flagComment = (req, res, next) => {
  pool.query(gifSchema.getCommentId, [req.params.gifId])
    .then((id) => {
      pool.query(gifSchema.flagGifComment, [req.body.appr_status , id.rows[0].id])
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
gifController.deleteFlaggedGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if (!userToken.admin) {
    res.status(401).json({
      status: 'error',
      error: 'Only an Admin user can delete a flagged Gif',
    });
    return;
  }
  pool.query(gifSchema.getFlaggedGif, [req.params.gifId])
    .then((gif) => {
      if (gif.rows[0].appr_status) {
        pool.query(gifSchema.deleteFlaggedGif, [req.params.gifId])
          .then( () => {
              res.status(200).json({
                "status": "success",
                "data": {
                  message: "flagged gif successfully deleted"
                }
              });
            })
      }  else {
          res.status(401).json({
            status: "error",
            error: {
              message: "Admin can only delete flagged gifs",
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
gifController.deleteFlaggedComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const userToken = userDetails(token);
  if (!userToken.admin) {
    res.status(401).json({
      status: 'error',
      error: 'Only an Admin user can delete a flagged Comment',
    });
    return;
  }
  pool.query(gifSchema.getCommentId, [req.params.gifId])
    .then((id) => {
      pool.query(gifSchema.getFlaggedComment, [id.rows[0].id])
        .then( (comment) => {
          if(comment.rows[0].appr_status) {
            pool.query(gifSchema.deleteFlaggedComment, [comment.rows[0].comment_id])
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

export default gifController;
