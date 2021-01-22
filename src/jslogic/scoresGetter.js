import 'core-js/stable';
import 'regenerator-runtime/runtime';


const scoreGetter = async (key) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  try {
    const response = await fetch(url,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    return await response.json();
  } catch (error) {
    return error;
  }
};


export default scoreGetter;