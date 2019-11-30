const templateDatabase = {
  data1: { num: 1, str: 'one' },
  data2: { num: 2, str: 'two' },
  data3: { num: 3, str: 'three' },
};

module.exports.updateData = (data, field, value) => {
  templateDatabase[data][field] = value;
  return { data: templateDatabase[data] };
};

module.exports.getDatas = () => Object.keys(templateDatabase);

module.exports.getFields = (data) => Object.keys(templateDatabase[data]);

module.exports.deleteData = (data) => {
  const deletedData = { data: templateDatabase[data] };
  delete templateDatabase[data];
  return deletedData;
};

module.exports.getDatabaseObject = () => templateDatabase;
