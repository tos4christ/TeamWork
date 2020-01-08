import { v2 as cloudinary } from 'cloudinary';
import pool from '../Models/poolConnection';
import userDetails from '../utilities/getTokenUser';
import profileSchema from '../Models/profileSchema';

const profileController = {};

profileController.uploadPic = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const filename = req.files.image.path;
  cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
    .then((file) => {
      const fileUrl = file.url;
      pool.query(profileSchema.addPic,[ fileUrl, user.username])
        .then((pic) => {
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Profile Pic successfully added',
              imageUrl: pic.rows[0].profile_pic,
            },
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
profileController.getProfile = (req, res, next) => {
  pool.query(profileSchema.getProfile, [req.params.userId])
    .then((profile) => {
      res.status(200).json({
        status: 'success',
        data: {
          profile: profile.rows[0],
        },
      });
    })
    .catch(e => {
      res.status(400).json({
        "status": "error",
        "error": e.message
      });
    });
};

export default profileController;
