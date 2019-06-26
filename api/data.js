const faker = require('faker');
const {sample} = require('lodash');
const nanoid = require('nanoid');

function createUser() {
  return {
    id: nanoid(7),
    name: faker.name.findName(),
    avatar: 'https://via.placeholder.com/100',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName(),
    role: sample(roles),
  };
}

const roles = [
  {
    id: 'wUvgSzC',
    title: 'Senior Developer',
  },
  {
    id: 'InGBywU',
    title: 'Developer',
  },
  {
    id: '_EWrS-v',
    title: 'Designer',
  },
  {
    id: 'HVfzOi',
    title: 'Product Manager',
  },
];

module.exports = () => {
  return {
    users: Array.from({length: 10}, () => createUser()),
  };
};
