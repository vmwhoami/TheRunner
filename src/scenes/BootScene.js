import { Scene } from 'phaser';
import playerName from '../jslogic/playerName';
import placeImg from '../jslogic/placeImg';

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');
    this.load.image('bg', 'assets/background.png');
    this.load.image('runnertxt', 'assets/therunnertext.png');
    this.load.image('platform', 'assets/ground_grass.png');
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json');
    this.load.html('form', 'assets/form.html');
  }

  create() {
    placeImg(this, 'startbg', 0);
    placeImg(this, 'runnertxt', -200);
    playerName(this);
  }
}
