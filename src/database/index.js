const logger = require('debug')('database');

const templateDatabase = {
  data1: { num: 1, str: 'one' },
  data2: { num: 2, str: 'two' },
  data3: { num: 3, str: 'three' },
};

const defaultObject = {
  num: 0,
  str: '',
};

module.exports.addData = (data, object) => {
  let newEntry = {
    num: object.num,
    str: object.str,
  };
  Object.keys(newEntry).forEach((key) => {
    if (!newEntry[key]) {
      delete newEntry[key];
    }
  });
  newEntry = { ...defaultObject, ...newEntry };
  templateDatabase[data] = newEntry;
  const obj = {};
  obj[data] = newEntry;
  logger(`Received ${data}, ${JSON.stringify(object)} and created ${JSON.stringify(obj)}`);
  return obj;
};

module.exports.updateData = (data, field, value) => {
  const obj = {};
  templateDatabase[data][field] = value;
  obj[data] = templateDatabase[data];
  logger(`Received update for ${data}, field: ${field}, value: ${value}`);
  return obj;
};

module.exports.getDatas = () => Object.keys(templateDatabase);

module.exports.getFields = (data) => Object.keys(templateDatabase[data]);

module.exports.deleteData = (data) => {
  const deletedData = { data: templateDatabase[data] };
  delete templateDatabase[data];
  return deletedData;
};

module.exports.getDatabaseObject = () => templateDatabase;
