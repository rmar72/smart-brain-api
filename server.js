const   express = require('express'),
        bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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
    res.send('this is working');
});

app.post('/signin', (req, res) => {
    if(req.body.email === db.users[0].email && req.body.password === db.users[0].password){
        res.json('success');
    } else {
        res.status(400).json("Wrong credentials, try again.");
    }
});

app.listen(3007, () => {
    console.log('app is running on port 3007');
})

/* API design
   / (root route) --> GET
   /signin --> POST
   /register --> POST
   /profile/:userId --> GET = user
   /image --> PUT = user
   
*/