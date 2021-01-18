import 'phaser';
import placeImg from '../jslogic/placeImg';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver')
  }
  preload() {


    placeImg(this, 'menu', 0);

    const width = this.scale.width
    const height = this.scale.height

    const gameOver = this.add.text(width / 2, height / 2, 'GAME OVER!', { fontFamily: 'Trebuchet MS', fontSize: '40px', fill: '#000000' });
    gameOver.setOrigin(.5, .5)
  }

  create() { }
}