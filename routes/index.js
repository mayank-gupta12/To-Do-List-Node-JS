var express = require('express');
var router = express.Router();
const Task = require("../model/taskModel")

router.get('/', function (req, res, next) {
  Task.find()
    .then((tasks) => res.render('show', { tasks }))
    .catch(() => res.send(err))
});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/add', function (req, res, next) {
  const { title, desc } = req.body;
  if (title.length < 5 || desc.length < 5) {
    return res.send("<h1> No input can be Empty </h1><a href='/create'>Back</a>")
  }
  Task.create({ title, desc })
    .then(() => {
      res.redirect("/")
    })
    .catch((err) => res.send(err))
});

router.get('/delete/:id', function (req, res, next) {
  Task.findByIdAndDelete(req.params.id)
    .then((Task) => {
      res.redirect("/")
    })
    .catch((err) => res.send(err));
});

router.get('/edit/:id', function (req, res, next) {
  Task.findById(req.params.id).then((task) => {
    res.render("edit", { task });
  }).catch((err) => res.send(err))
});

router.post('/edit/:id', function (req, res, next) {
  const { title, desc } = req.body;
  if (title.length < 5 || desc.length < 5) {
    return res.send("<h1> No input can be Empty </h1><a href='/'>Back</a>")
  }
  Task.findByIdAndUpdate(req.params.id,req.body).then(() => {
    res.redirect("/")
  })
    .catch((err) => res.send(err))
});

module.exports = router;