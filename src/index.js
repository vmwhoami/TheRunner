
import './styles/style.scss';
import Phaser from 'phaser';
import config from './config/config';
import scoreSetter from './jslogic/scoresGetter'


const g = {};
const game = new Phaser.Game(config);
g.game = game;



// let name = "melcadaaadada";
// let gainedscore = 100

// let a = {
//   user: name,
//   score: gainedscore
// }



// let response = async (data) => {
//   let call = await scoreSetter(data)
//   console.log(call);
// }

// response(a)

