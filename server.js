const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        knex = require('knex');
        
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

//Mock DB
const db = {
    users: [
        {
            id:123,
            email: "jChan@gmail.com",
            password: "talismanKing",
            name: "Jackie",
            entries: 0,
            joined: new Date()
        },
        {
            id:124,
            email: "jadeChan@gmail.com",
            password: "talismanPrincess",
            name: "Jade",
            entries: 0,
            joined: new Date()
        },
    ]
};

app.get('/', (req, res) => {
    res.json(db);
});

app.post('/signin', (req, res) => {
    if(req.body.email === db.users[0].email && req.body.password === db.users[0].password){
        res.json(db.users[0]);
    } else {
        res.status(400).json("Wrong credentials, try again.");
    }
});

app.post('/register', (req, res) => {
    const { email, name} = req.body;
    pg_db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joined: new Date()
        })
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unable to register'));
});

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