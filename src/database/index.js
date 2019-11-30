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
  let newData = {
    num: object.num,
    str: object.str,
  };
  newData = Object.keys(newData).forEach((key) => {
    if (!newData[key]) {
      delete newData[key];
    }
  });
  templateDatabase[data] = { ...defaultObject, ...newData };
  return { data: templateDatabase[data] };
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
