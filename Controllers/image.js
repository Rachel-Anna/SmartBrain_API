const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "0e5c1c48f98f4e2ba833f53b01908d40"
});

const handleApiCall = (req, res) => {
    if (req.body.input) {
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('Unable to work with API'));
    } else {
        res.status(400).json('Invalid image data');
    }
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries[0]) {
            res.json(entries[0]);
        } else {
            res.status(404).json('User not found');
        }
    })
    .catch(err => res.status(404).json('User not found'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}