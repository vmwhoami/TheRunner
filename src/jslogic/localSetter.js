
const localSetter = (data) => {
  const game = 'runner';

  localStorage.setItem(game, JSON.stringify(data));
};

export default localSetter;