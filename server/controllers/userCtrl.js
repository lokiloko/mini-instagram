const model = require('../models/index')

class UserCtrl {
  static read(req, res, next) {
    model.User.read().then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next) {
    model.User.readOne(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static create(req, res, next) {
    model.User.create(req.body, req.file).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static update(req, res, next) {
    req.body._id = req.params.id;
    model.User.update(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static delete(req, res, next) {
    model.User.delete(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = UserCtrl;
