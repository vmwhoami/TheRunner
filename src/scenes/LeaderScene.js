import Phaser from 'phaser';
import Button from './Button';
import placeImg from '../jslogic/placeImg'
import scoreGetter from '../jslogic/scoresGetter'

export default class LeaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderScene' })
  }

  preload() {
    this.load.image('leader', 'assets/sky.jpg');

  }
  create() {

    placeImg(this, 'leader', 0);
    const replay = new Button(this, "div", 'btn', "replay", 100);
    replay.addListener('click').on('click', () => {
      this.scene.start('GameScene');
    })


  }
}
