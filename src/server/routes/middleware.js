const { body, query } = require('express-validator');
const database = require('../../database');

const dataValidator = query('data').custom((data) => {
  if (!database.getDatas().includes(data)) {
    throw new Error('data value entered does not exist');
  }
  return true;
});

const updateValidator = () => [
  dataValidator,
  query('field')
    .isIn(['num', 'str'])
    .withMessage('field is not num or str'), // TODO: use database.getFields for this
  body('value')
    .exists()
    .withMessage('value must exist'),
];

const deleteValidator = () => [dataValidator];

const validate = (route) => {
  switch (route) {
    case '/update':
      return updateValidator();
    case '/delete':
      return deleteValidator();
    default:
      return [];
  }
};

module.exports = validate;
