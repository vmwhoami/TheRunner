import Phaser from 'phaser';
import Button from './Button';
import placeImg from '../jslogic/placeImg'
import scoreGetter from '../jslogic/scoresGetter'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class LeaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderScene' })
  }

  preload() {
    this.load.image('leader', 'assets/sky.jpg');

  }
  create() {
    let settingScore = async () => {
      let response = await scoreGetter();
      response.result.forEach(element => {
        console.log(element.score);
      });
    }
    settingScore()
    placeImg(this, 'leader', 0);
    const replay = new Button(this, "div", 'btn', "replay", 100);
    replay.addListener('click').on('click', () => {
      this.scene.start('GameScene');
    })


  }
}
