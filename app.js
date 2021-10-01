const fs = require('fs');
const http = require('http');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');


app = express();
bodyParser = require('body-parser');
port = process.env.PORT || 9001;
const morgan = require('morgan');
const short = require('short-uuid');

app.use(morgan('dev'));

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb",extended: true ,parameterLimit:50000}));
app.use(fileUpload());

let  authRoutes=require('./routes/authRoutes')
authRoutes(app);

let  cartRoutes=require('./routes/cartRoutes')
cartRoutes(app);


const httpServer = http.createServer(app);
httpServer.listen(port);





