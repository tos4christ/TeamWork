import { v2 as cloudinary } from 'cloudinary';
import pool from '../Models/poolConnection';
import userDetails from '../utilities/getTokenUser';
import gifSchema from '../Models/gifSchema';

const gifController = {};

gifController.createGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const { gif_title, appr_status } = req.body;
  const filename = req.files.gifPost.path;

  cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
    .then((file) => {
      const fileUrl = file.url;
      const filePublicId = file.public_id;
      const date = Date().split('GMT')[0];
      pool.query(gifSchema.getEmployeeId, [user.username])
        .then((id) => {
          pool.query(gifSchema.newGif,
            [gif_title, fileUrl, appr_status, id.rows[0].employee_id, date, filePublicId])
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

gifController.deleteAGif = (req, res, next) => {
  // delete an article from cloudinary
  // cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

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
  // request comes with gifId
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
  pool.query(gifSchema.flagGif, [req.body.appr_status, req.params.articleId])
    .then((gif) => {
      res.status(200).json({
        status: "success",
        data: {
          message: "article successfully flagged",
          gif,
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

export default gifController;
