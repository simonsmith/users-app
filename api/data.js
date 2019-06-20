const faker = require('faker');
const {sample} = require('lodash');

function createUser() {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName(),
    role: sample(roles),
  };
}

const roles = [
  {
    id: 'e9b3bc64-1cdf-4722-8eea-decdfc3760de',
    title: 'Senior Developer',
  },
  {
    id: '63e9f38e-8389-4c56-89bc-f4be72a86c53',
    title: 'Developer',
  },
  {
    id: 'a69e4241-ffa7-42ec-a62d-c5d0bf7be054',
    title: 'Designer',
  },
  {
    id: '3f893018-b3b5-408d-9a20-69ee9187e257',
    title: 'Product Manager',
  },
];

module.exports = () => {
  return {
    users: Array.from({length: 10}, () => createUser()),
  };
};
