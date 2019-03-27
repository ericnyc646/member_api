// Uses member.seeder.js and the json file to load the seed data into the database
// this process sets the database environmental settings and then calls the individual
//     table create/delete or seed in member.seeder.js

require('dotenv/config');

const { MemberSeeder } = require('./member.seeder');
const { DynamoDB } = require('aws-sdk');
const { DocumentClient } = DynamoDB;
const membersData = require('./members-test-data.json');

const dynamo = new DynamoDB({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const doclient = new DocumentClient({ service: dynamo });
const memberSeeder = new MemberSeeder(dynamo, doclient);

const log = (...mgs) => console.log('>>', ...mgs);

const seedMembers = async () => {
  log(`Checking if 'members' table exists`);

  const exists = await memberSeeder.hasTable();

  if (exists) {
    log(`Table 'members' exists, deleting`);
    await memberSeeder.deleteTable();
  }

  log(`Creating 'members' table`);
  await memberSeeder.createTable();

  log('Seeding data');
  await memberSeeder.seed(membersData);
};

seedMembers()
  .then(() => log('Done!'))
  .catch(err => console.log(err));