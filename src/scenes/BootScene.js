import 'phaser';
import playerName from '../jslogic/playerName';
import placeImg from '../jslogic/placeImg';
import localGetter from '../jslogic/localGetter';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.music = this.sound.add("bgmusic", { loop: true, volume: 0.02 });
    this.music.play()
  }

  create() {

    placeImg(this, 'startbg', 0);
    placeImg(this, 'runnertxt', -200);

    const name = localGetter();
    if (name) {
      playerName(this);
    } else {
      playerName(this);
    }
  }
}
