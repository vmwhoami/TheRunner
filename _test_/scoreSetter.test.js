import scoreSetter from '../src/jslogic/scoreSetter';
import testingkey from '../src/config/key';


describe('The score scoreSetter should make valid api calls', () => {
  const test = {
    name: 'Tester',
  };
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      result: 'Scores updated successfuly.',
    }),
  }));
  it('Is getting a response from the server ', async () => {
    scoreSetter(test, testingkey).then(response => {
      expect(response).toStrictEqual({
        result: 'Scores updated successfuly.',
      });
    });
  });

  it('Is not supposed to have a different value ', async () => {
    scoreSetter(test, testingkey).then(response => {
      expect(response).not.toStrictEqual({
        result: 'Game with ID: 9GmKrLBObRWdbPoSjEWO added.',
      });
    });
  });
});