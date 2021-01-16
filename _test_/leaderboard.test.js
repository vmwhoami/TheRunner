import LeaderBoard from '../src/jslogic/leaderboard';

jest.mock('../src/jslogic/leaderboard');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  LeaderBoard.mockClear();
});

describe('expect the Category to be a class', () => {
  it('It expects to create a category instance', () => {
    // expect(LeaderBoard).toBeInstanceOf(Category);
  });
});