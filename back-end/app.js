import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// Connection to Database
const uri = 'mongodb://localhost:27017/udemy'
//const uri = 'mongodb+srv://anutibara:anutibara@scraping-cluster-7dtgt.gcp.mongodb.net/udemy?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
};

mongoose.connect(uri, options).then(
    () => { console.log('Database connected successfully') },
    err => { console.log(err) }
  );

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/grade'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

// Middleware for Vue.js router history mode
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('App listening on port: http://localhost:' + app.get('port'));
});