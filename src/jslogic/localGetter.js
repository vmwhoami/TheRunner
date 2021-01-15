
const localGetter = () => {

  let name = localStorage.getItem('runner')
  return JSON.parse(name)

}

export default localGetter;