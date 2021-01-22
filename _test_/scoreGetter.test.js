import scoreGetter from '../src/jslogic/scoresGetter';


describe('it is se', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      result: [
        {
          user: 'John Doe',
          score: 42,
        },
        {
          user: 'Peter Parker',
          score: 35,
        },
        {
          user: 'Wonder Woman',
          score: 50,
        },
      ],
    }),
  }));

  beforeEach(() => {
    fetch.mockClear();
  });

  it('calls fetch one time and return an object', async () => {
    const obj = await scoreGetter();
    expect(typeof obj.result).toEqual('object');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns not an empty object', async () => {
    const obj = await scoreGetter();
    expect(obj.result.length).not.toEqual(0);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('it returns the first person in the object', async () => {
    const obj = await scoreGetter();
    const first = obj.result[0];
    const name = first.user;
    expect(name).toEqual('John Doe');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('It is returning the second peron when called', async () => {
    const obj = await scoreGetter();
    const second = obj.result[1];
    const name = second.user;
    expect(name).not.toEqual('John Doe');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns the second score as expected', async () => {
    const obj = await scoreGetter();
    const first = obj.result[0];
    const { score } = first;
    expect(score).toEqual(42);
    expect(fetch).toHaveBeenCalledTimes(1);
  });


  it('returns the second score as expected', async () => {
    const obj = await scoreGetter();
    const second = obj.result[1];
    const { score } = second;
    expect(score).not.toEqual(42);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});