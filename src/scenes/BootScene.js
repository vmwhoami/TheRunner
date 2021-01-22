import Phaser from 'phaser';
import playerName from '../jslogic/playerName';
import placeImg from '../jslogic/placeImg';
import localGetter from '../jslogic/localGetter';
import gameState from '../config/gameState';
import Button from './Button';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.music = this.sound.add('bgmusic', { loop: true, volume: 0.06 });
    if (gameState.music) {
      this.music.play();
    }
  }

  create() {
    placeImg(this, 'startbg', 0);
    placeImg(this, 'runnertxt', -200);
    const replay = new Button(this, 'div', 'btn', 'play', 150);
    const leaderboard = new Button(this, 'div', 'btn', 'Leaderboard', 200);

    const settings = new Button(this, 'div', 'btn', 'Settings', 100);

    settings.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('Settings');
    });
    replay.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('GameScene');
    });

    leaderboard.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('LeaderScene');
    });


    const name = localGetter();

    if (!name) {
      playerName(this);
    }
  }
}
