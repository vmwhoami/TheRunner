
const localGetter = () => {
  const name = localStorage.getItem('runner');
  return JSON.parse(name);
};

export default localGetter;