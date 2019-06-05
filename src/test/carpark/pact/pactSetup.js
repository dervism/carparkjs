const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

global.pactMockServerPort = 8991;
global.pactMockServerUrl = 'http://localhost';

global.provider = new Pact({
  port: global.pactMockServerPort,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'carpark-consumer',
  provider: 'carpark-provider'
});
