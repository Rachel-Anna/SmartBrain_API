const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
//const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      connectionString: process.env.DATABASE_URL, //modify according to hosted platform
      ssl: {
        rejectUnauthorized: false
      }
    }
});


  const app = express();
  app.use(bodyParser.json({limit: '3500kb', extended: true}));
  app.use(cors());
  
  app.get('/', (req, res) => { res.json('App is running') });
  app.post('/signin', signin.handleSignin(db, bcrypt));
  app.post('/register', register.handleRegister(db, bcrypt));
  //app.get('/profile/:id', profile.handleProfileGet(db));
  app.put('/image', image.handleImage(db));
  app.post('/image-url', image.handleApiCall);


  
  const port = process.env.PORT || 3001;
  app.listen(port, () => { console.log(`App is running on port ${port}`) })
//knex is referring to the object we made in line 5
// db.select("*").from('users').then(data => {
//     console.log(data);
// });


