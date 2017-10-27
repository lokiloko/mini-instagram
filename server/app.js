var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var bodyParser = require('body-parser')

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
var user = require('./routes/user');
var auth = require('./routes/auth');
var post = require('./routes/post');
// your express configuration here
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/posts', post);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
// httpsServer.listen(443);
