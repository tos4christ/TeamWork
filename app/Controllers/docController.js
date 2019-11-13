const docurl = 'https://documenter.getpostman.com/view/3725188/SW7UbVfk';

const docController = (req, res) => {
  res.redirect(301, docurl);
};

export default docController;
