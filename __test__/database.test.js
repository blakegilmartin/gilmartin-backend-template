const database = require('../src/database');

beforeAll(() => {
  process.env.DEBUG = 'database';
});

describe('Add', () => {
  test('Add empty Object', () => {
    const addedEntry = database.addData('data4', {});
    expect(Object.keys(addedEntry)[0]).toBe('data4');
    expect(addedEntry.data4.num).toBe(0);
    expect(addedEntry.data4.str).toBe('');
  });
  test('Add Object that only has num', () => {
    const addedEntry = database.addData('data5', { num: 4 });
    expect(Object.keys(addedEntry)[0]).toBe('data5');
    expect(addedEntry.data5.num).toBe(4);
    expect(addedEntry.data5.str).toBe('');
  });
  test('Add Object that only has str', () => {
    const addedEntry = database.addData('data6', { str: 'test' });
    expect(Object.keys(addedEntry)[0]).toBe('data6');
    expect(addedEntry.data6.num).toBe(0);
    expect(addedEntry.data6.str).toBe('test');
  });
  test('Add Object that has both', () => {
    const addedEntry = database.addData('data7', { str: 'test', num: 33 });
    expect(Object.keys(addedEntry)[0]).toBe('data7');
    expect(addedEntry.data7.num).toBe(33);
    expect(addedEntry.data7.str).toBe('test');
  });
  test('Add Object that has extra properties', () => {
    const addedEntry = database.addData('data8', { str: 'test', num: 33, bad: 33 });
    expect(Object.keys(addedEntry.data8).includes('bad')).toBeFalsy();
  });
});

describe('UPDATE', () => {
  test('Update str', () => {
    database.addData('data9', {});
    const updatedData = database.updateData('data9', 'str', 'test');
    expect(updatedData.data9.str).toBe('test');
  });
  test('Update num', () => {
    database.addData('data10', {});
    const updatedData = database.updateData('data10', 'num', 8);
    expect(updatedData.data10.num).toBe(8);
  });
});

afterAll(() => {
  delete process.env.DEBUG;
});
