import 'core-js/stable';
import 'regenerator-runtime/runtime';



const scoreGetter = async () => {
  const key = 'Vd577d8KnhidtL176AM0';
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  try {
    const response = await fetch(url,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-ur
      });
    return await response.json();
  } catch (error) {
    return error;
  }
};



export default scoreGetter;