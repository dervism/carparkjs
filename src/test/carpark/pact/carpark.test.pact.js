
const Matchers = require('@pact-foundation/pact').Matchers;
const getCars = require('./mockBackend').getCars;

const EXPECTED_BODY = [
  {
    type: 'car1',
    licenseNr: 'AB12345'
  },
  {
    type: 'car2',
    licenseNr: 'AB54321'
  }
];

describe('pact test', () => {
  beforeEach(() => {
      const interaction = {
        state: 'i have a list of cars',
        uponReceiving: 'a request for cars',
        withRequest: {
          method: 'GET',
          path: '/cars',
          headers: {
            'Accept': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: EXPECTED_BODY
        }
      }

      return provider.addInteraction(interaction)
    })

    it('returns a successful body', () => {
      return getCars({
          url: pactMockServerUrl,
          port: pactMockServerPort
        })
      .then(response => {
        expect(response.headers['content-type']).toEqual('application/json')
        expect(response.data).toEqual(EXPECTED_BODY)
        expect(response.status).toEqual(200)
      })
      .then(() => provider.verify())
    })
});
