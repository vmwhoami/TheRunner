
const localSetter = (data) => {
  let game = 'runner'

  localStorage.setItem(game, JSON.stringify(data))

}

export default localSetter;