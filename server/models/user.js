var FB = require('fb');
var idvalidator = require('mongoose-id-validator');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-jlkah.mongodb.net:27017,cluster0-shard-00-01-jlkah.mongodb.net:27017,cluster0-shard-00-02-jlkah.mongodb.net:27017/mini?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
mongoose.Promise = global.Promise;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
});

userSchema.plugin(idvalidator)
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

class Model {
  static read() {
    return new Promise((resolve, reject) => {
      User.find().then((data) => {
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
      User.findOne({
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
  static create(insert) {
    const secret = process.env.SALT_KEY;
    insert.password = crypto.createHmac('sha256', secret).update(insert.password).digest('hex');
    return new Promise((resolve, reject) => {
      User.create({
        name: insert.name,
        email: insert.email,
        username: insert.username,
        password: insert.password,
        role: insert.role
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
    const secret = process.env.SALT_KEY;
    update.password = crypto.createHmac('sha256', secret).update(insert.password).digest('hex');
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({
        "_id": update._id
      }, {
        name: update.name,
        email: update.email,
        username: update.username,
        password: update.password,
        role: update.role
      }, {
        runValidators: true, context: 'query'
      }).then((data) => {
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
      User.findOneAndRemove({
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
  static loginFB(accessToken, fb_id) {
    return new Promise((resolve, reject)=>{
      FB.options({
        accessToken: accessToken,
        appId: 507229999655345,
        appSecret: 'dafb592c0501e8bb92072d1e0c700607'
      });
      FB.api('/me?fields=name,email', function(res) {
        if (res && res.error) {
          if (res.error.code === 'ETIMEDOUT') {
            console.log('request timeout facebook')
            reject('request timeout');
          } else {
            console.log('error facebook', res.error)
            reject(res.error);
          }
        } else {
          if(fb_id != res.id){
            reject({message:'Access Token not Valid'})
          } else {
            User.findOne({
              email:res.email
            }).then((data)=>{
              if(data) {
                Model.login(data.username, '1').then((token)=>{
                  console.log(token)
                  resolve(token)
                }).catch((err)=>{
                  console.log(token)
                  reject(err)
                })
              } else {
                var insert = {
                  name: res.name,
                  email: res.email,
                  username: res.id,
                  password: '1',
                  role:'user'
                }
                Model.create(insert).then((data)=>{
                  Model.login(data.username, '1').then((token)=>{
                    console.log(token)
                    resolve(token)
                  }).catch((err)=>{
                    console.log(err)
                    reject(err)
                  })
                }).catch((err)=>{
                  reject(err)
                })
              }
            }).catch((err)=>{
              console.log(err)
              reject(err)
            })
          }
        }
      });
    })
  }
  static login(username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        "username": username,
      }).then((data) => {
        const secret = process.env.SALT_KEY;
        const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
        if (hash === data.password) {
          var token = jwt.sign({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
          }, process.env.JWT_KEY);
          resolve({
            token: token
          });
        } else {
          reject('gagal')
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static register(insert) {
    return new Promise((resolve, reject) => {
      User.create({
        name: insert.name,
        email: insert.email,
        username: insert.username,
        password: insert.password,
        role: 'user'
      }).then((data) => {
        var obj = {
          message: 'Register Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static isAdmin(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (decoded.role == 'admin') {
          resolve()
        } else {
          reject()
        }
      });
    })
  }
}

module.exports = Model;
