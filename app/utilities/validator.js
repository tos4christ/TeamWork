import { Validator } from 'node-input-validator';

const validate = {};

validate.createUser = (req, res, next) => {
  const v = new Validator(req.body, {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'required|string',
    gender: 'required|string',
    jobRole: 'required|string',
    department: 'required|string',
    address: 'required|string',
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.signin = (req, res, next) => {
  const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required|string'
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.postGifs = (req, res, next) => {
  req.body.image = req.files.image;
  const v = new Validator(req.body, {
    image: 'required|mime:gif',
    title: 'required|string',
    'appr_status': 'boolean'
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.postArticles = (req, res, next) => {
  const v = new Validator(req.body, {
    article: 'required|string',
    title: 'required|string',
    'appr_status': 'boolean'
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.patchArticles = (req, res, next) => {
  const v = new Validator(req.body, {
    article: 'required|string',
    title: 'required|string'
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.postArtCom = (req, res, next) => {
  const v = new Validator(req.body, {
    comment: 'required|string',
    'appr_status': 'boolean'
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

validate.postGifCom = (req, res, next) => {
  const v = new Validator(req.body, {
    comment: 'required|string',
  });
  v.check()
    .then( (matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
}

export default validate;
