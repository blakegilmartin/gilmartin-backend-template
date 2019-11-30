const express = require('express');
const { validationResult } = require('express-validator');
const database = require('../../database');
const validate = require('./middleware');

const router = express.Router();

// gets the entire database object
router.get('/getDatabase', (req, res) => {
  try {
    return res.status(200).send(database.getDatabaseObject());
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// updates data
router.post('/update', validate('/update'), (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const updatedData = database.updateData(
      req.query.data,
      req.query.field,
      req.body.value,
    );
    return res.status(200).send(updatedData);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// deletes {req.body.data} key from database object
router.delete('/delete', validate('/delete'), (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const deletedData = database.deleteData(req.query.data);
    return res.status(200).send({
      message: 'Successfully deleted',
      deletedData,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
