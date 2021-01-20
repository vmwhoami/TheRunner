import scoreSetter from '../src/jslogic/scoreSetter';
import testingkey from '../src/config/key'


describe('The score scoreSetter should make valid api calls', () => {

  let test = {
    user: "test",
    score: 100,
  }

  it('it is setting the name and ', async () => {
    scoreSetter(test, testingkey).then(response => {
      expect(response).toBe("fuck of")
    })
  });
});