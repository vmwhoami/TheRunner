import 'core-js/stable';
import 'regenerator-runtime/runtime';

const scoreSetter = async (data, key) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  try {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};

export default scoreSetter;