
const LeaderBoard = (data) => {
  let key = 'Vd577d8KnhidtL176AM0'


  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`
  const setGame = async () => {

    try {
      const response = await fetch(url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data)
        }
      )
      let res = await response.json()
      return res
    } catch (error) {
      console.log(error);
    }

  }

  setGame().then(key => {
    console.log(key);
  })

  class Scoring {
    constructor(name, score) {
      this.key = "Vd577d8KnhidtL176AM0"
      this.name = name,
        this.score = score
    }

    setScore(score) {

    }
  }
}

export default LeaderBoard;