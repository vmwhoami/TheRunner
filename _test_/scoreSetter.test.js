import scoreSetter from '../src/jslogic/scoreSetter';
import testingkey from '../src/config/key';


describe('The score scoreSetter should make valid api calls', () => {
  test = {
    name: 'Tester',
  };
  global.fetch = jest.fn((data, key) => Promise.resolve({
    json: () => Promise.resolve({
      result: 'Scores updated successfuly.',
    }),
  }));
  it('it is setting the name and the ', async () => {
    scoreSetter(test, testingkey).then(response => {
      expect(response).toStrictEqual({
        result: 'Scores updated successfuly.',
      });
    });
  });


  it('it is setting the name and ', async () => {
    scoreSetter(test, testingkey).then(response => {
      expect(response).not.toStrictEqual({
        result: 'Game with ID: 9GmKrLBObRWdbPoSjEWO added.',
      });
    });
  });
});