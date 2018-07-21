const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        knex = require('knex'),
        bcrypt = require('bcrypt-nodejs'),
        register = require('./controllers/register'),
        signIn = require('./controllers/signin'),
        profile = require('./controllers/profile'),
        image = require('./controllers/image');
        
const pg_db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('app is working') );

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, pg_db, bcrypt) } ); // nice use of dependency injection

app.post('/register', (req, res) => { register.handleRegister(req, res, pg_db, bcrypt) } ); 

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, pg_db) } );

app.put('/image',  (req, res) => { image.handleImage(req, res, pg_db) } );
app.post('/imageURL',  (req, res) => { image.handleApiCall(req, res) } );

app.listen(process.env.PORT || 3007, () => {
    console.log('App is up and running!');
});