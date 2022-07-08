const router = require('express').Router();
let User = require('../models/shortUrl');

router.route('/').get((req, res) => {
  console.log("inside get")
  User.find()
    .then(user => {console.log("user"+user);res.json(user)})
    //.catch(err => {console.log("error"+err);  res.status(400).json('Error: ' + err)});
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const sub_cat=req.body.sub_cat;
  const newUser = new User({username,sub_cat});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;