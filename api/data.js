const faker = require('faker');

module.exports = () => {
  return {
    users: Array.from({length: 10}, () => faker.helpers.createCard()),
  };
};
