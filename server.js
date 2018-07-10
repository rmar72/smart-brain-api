const   express = require('express'),
        bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send('this is working')
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