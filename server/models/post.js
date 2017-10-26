var idvalidator = require('mongoose-id-validator');

var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-jlkah.mongodb.net:27017,cluster0-shard-00-01-jlkah.mongodb.net:27017,cluster0-shard-00-02-jlkah.mongodb.net:27017/mini?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
// mongoose.Promise = global.Promise;
var postSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  love: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  }],
  comment: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: String
  }]
});

postSchema.plugin(idvalidator)

var Post = mongoose.model('Post', postSchema);

class Model {
  static read() {
    return new Promise((resolve, reject) => {
      Post.find().populate('posted_by').populate('comment.user').then((data) => {
        var obj = {
          message: 'Data Found',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Post.findOne({
        "_id": id
      }).then((data) => {
        var obj = {
          message: 'Data Found',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert, file) {
    return new Promise((resolve, reject) => {
      Post.create({
        post: insert.post,
        posted_by: insert.posted_by,
        fileUrl: insert.fileUrl,
        created_at: Date.now()
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    var post = {
      post: update.post
    }
    if (update.fileUrl) {
      post.fileUrl = update.fileUrl
    }
    return new Promise((resolve, reject) => {
      Post.findOneAndUpdate({
        "_id": update._id
      }, post).then((data) => {
        var obj = {
          message: 'Update Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      Post.findOneAndRemove({
        "_id": id
      }).then((data) => {
        var obj = {
          message: 'Delete Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static addComment(comment) {
    return new Promise((resolve, reject) => {
      Post.findOneAndUpdate({
        "_id": comment._id
      }, {
        $push: {
          comment: {
            user:comment.user,
            comment:comment.comment
          }
        }
      }, {
        safe: true,
        upsert: true
      },).then((data) => {
        var obj = {
          message: 'Add Comment Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static giveLove(love){
    return new Promise((resolve, reject) => {
      Post.findOne({"_id":love._id}).then((post)=>{
        var ada = ""
        post.love.forEach(p =>{
          if(p.user.toString() == love.user){
            ada = "ada"
          }
        })
        if(ada == "ada") {
          reject('Already loved');
        }
        else {
          Post.findOneAndUpdate({
            "_id": love._id
          }, {
            $push: {
              love: {
                user:love.user,
              }
            }
          }, {
            safe: true,
            upsert: true
          },).then((data) => {
            var obj = {
              message: 'Add Love Success',
              data: data
            }
            resolve(obj)
          }).catch((err) => {
            reject(err)
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
    })
  }
}

module.exports = Model;
