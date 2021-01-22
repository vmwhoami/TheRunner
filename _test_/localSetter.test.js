import localSetter from '../src/jslogic/localSetter';


describe('The local setter should set to the local storage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });
  it('It is expected to call the setItem 1 time ', () => {
    const data = 'the data';
    localSetter(data);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('is called with given data', () => {
    const data = 'the data';
    localSetter(data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'runner',
      `"${data}"`,
    );
  });
});
