const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: 'e335640338224000ba3d1826e422aedb'
});

const handleApiCall = (req, res) => {
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, pg_db) => {
    let { id } = req.body;
    pg_db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = { handleImage, handleApiCall }