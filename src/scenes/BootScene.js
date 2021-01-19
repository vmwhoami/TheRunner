import Phaser from 'phaser';
import playerName from '../jslogic/playerName';
import placeImg from '../jslogic/placeImg';
import localGetter from '../jslogic/localGetter';
import Button from './Button'
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.music = this.sound.add('bgmusic', { loop: true, volume: 0.06 });
    this.music.play();
  }

  create() {
    placeImg(this, 'startbg', 0);
    placeImg(this, 'runnertxt', -200);

    const { width } = this.scale;
    const { height } = this.scale;
    let play = new Button(this, "div", 'btn', "replay", 100)
    let replay = new Button(this, "div", 'btn', "Leaderboard", 150)

    let changeName = new Button(this, "div", 'btn', "Change Name", 0)
    const name = localGetter();
    if (name) {

    } else {
      playerName(this);
    }
  }
}
