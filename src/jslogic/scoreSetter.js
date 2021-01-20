import 'core-js/stable';
import 'regenerator-runtime/runtime';



const scoreSetter = (data) => {
  const key = 'Vd577d8KnhidtL176AM0';
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  const setGame = async () => {
    try {
      const response = await fetch(url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        });
      return await response.json();
    } catch (error) {
      return error;
    }
  };


  setGame().then(key => key);

  // class Scoring {
  //   constructor(name, score) {
  //     this.key = 'Vd577d8KnhidtL176AM0';
  //     this.name = name;
  //     this.score = score;
  //   }

  //   setScore(score) {
  //     return score;
  //   }
  // }
};

export default scoreSetter;