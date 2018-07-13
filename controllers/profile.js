const handleProfile = (req, res, pg_db) => {
    let { id } = req.params;
    pg_db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) res.json(user[0])
            else res.status(400).json('Not Found')
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports = { handleProfile }