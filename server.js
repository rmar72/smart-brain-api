const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        knex = require('knex'),
        bcrypt = require('bcrypt-nodejs'),
        register = require('./controllers/register')
        
const pg_db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'passaward',
        database : 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    pg_db.select('*').from('users').then(users => res.json(users));
});

app.post('/signin', (req, res) => {
    pg_db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid) {
                return pg_db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));
});

app.post('/register', (req, res) => { register.handleRegister(req, res, pg_db, bcrypt) } ); // nice use of dependency injection

app.get('/profile/:id', (req, res) => {
    let { id } = req.params;
    pg_db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) res.json(user[0])
            else res.status(400).json('Not Found')
        })
        .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
    let { id } = req.body;
    pg_db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
});

app.listen(3007, () => {
    console.log('app is running on port 3007');
});