import "core-js/stable";
import "regenerator-runtime/runtime";
import Phaser, { Game } from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.WEB_GL,
  width: 900,
  height: 600,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 },
      debug: true
    }
  },
  scene: [
    BootScene,
    GameScene
  ]
};

const game = new Game(config);


// let data = { "name": "TheRunner" }
// const setGame = async () => {
//   const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/'
//   try {
//     const response = await fetch(url,
//       {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data)
//       })
//     let res = await response.json()
//     return res.result.split(' ')[3]
//   } catch (error) {
//     console.log(error);
//   }

// }

// setGame().then(key => {
//   console.log(key);
// })

// let setScore = async (key) => {
//   const set = await fetch()
// }