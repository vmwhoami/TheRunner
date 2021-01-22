import localGetter from '../src/jslogic/localGetter';


describe('The local setter should set to the local storage', () => {
  beforeEach(() => {
    JSON.parse = jest.fn().mockImplementationOnce(() => ({ data: 'data' }));
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });
  it('It is expected to call the getItem 1 time ', () => {
    localGetter();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });


  it('It is expected something ', () => {
    expect(localGetter()).toStrictEqual({ data: 'data' });
  });
});