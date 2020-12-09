const express = require('express');
const Chili = require('./models/Chili.js');
const app = express();

app.use(express.json());

// our CRUD route
app.post('/chilis', (req, res, next) => {
  Chili
    .insert(req.body)
    .then(chili => res.sendStatus(chili)) 
    .catch(next);
});

app.get('/chilis/:id', (req, res, next) => {
  Chili
    .findById(req.params.id)
    .then(chili => res.send(chili))
    .catch(next);
});

app.get('/chilis', (req, res, next) => {
  Chili
    .find()
    .then(chilis => res.send(chilis))
    .catch(next);
});

app.put('/chilis/:id', (req, res, next) => {
  Chili
    .update(req.params.id, req.body)
    .then(chili => res.send(chili))
    .catch(next);
});

app.delete('/chilis/:id', (req, res, next) => {
  Chili
    .delete(req.params.id)
    .then(chili => res.send(chili))
    .catch(next);
});

module.exports = app;
