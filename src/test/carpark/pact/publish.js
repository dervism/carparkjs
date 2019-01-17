let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  tags: 'DEV',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost',
  pactBrokerUsername: process.env.PACT_USERNAME,
  pactBrokerPassword: process.env.PACT_PASSWORD,
  consumerVersion: '2.0.0'
};

publisher.publishPacts(opts).then(() => done());
