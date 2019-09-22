const express = require('express');
const should = require('should');
const database = require('../../database');

const router = express.Router();

// returns an object of the req body and query you sent
// sends an error if you sent nothing in either
router.get('/get', (req, res) => {
  try {
    req.query.should.be.an.Object().and.not.empty();
    req.body.should.be.an.Object().and.not.empty();
    res.status(200).send({ query: req.query, body: req.body });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// gets the entire database object
router.get('/getDatabase', (req, res) => {
  res.status(200).send(database.getDatabaseObject());
});

// updates data
router.post('/update', (req, res) => {
  try {
    should(database.getDatas()).containDeep([req.body.data]);
    should(database.getFields(req.body.data)).containDeep([req.body.field]);
    should(req.body.value).not.be.Undefined();
    database.updateData(req.body.data, req.body.field, req.body.value);
    res.status(200).send('Update received');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// deletes {req.body.data} key from database object
router.delete('/delete', (req, res) => {
  try {
    should(database.getDatas()).containDeep([req.body.data]);
    database.deleteData(req.body.data);
    res.status(200).send('Successfully deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
