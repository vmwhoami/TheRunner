import './styles/style.scss';
import Phaser from 'phaser';
import config from './config/config';
import scoreGetter from './jslogic/scoresGetter'
import { async } from 'regenerator-runtime';

const g = {};
const game = new Phaser.Game(config);

g.game = game;



let score = async () => {
  let scores = await scoreGetter()
  console.log(scores.result);
}

score()