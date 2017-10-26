const model = require('../models/index')

class PostCtrl {
  static read(req, res, next) {
    model.Post.read().then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next) {
    model.Post.readOne(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static create(req, res, next) {
    req.body.fileUrl = req.file.cloudStoragePublicUrl
    model.Post.create(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static update(req, res, next) {
    req.body._id = req.params.id;
    if(req.file){
      req.body.fileUrl = req.file.cloudStoragePublicUrl
    }
    model.Post.update(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static delete(req, res, next) {
    model.Post.delete(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = PostCtrl;
