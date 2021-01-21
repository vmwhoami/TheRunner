import Phaser from 'phaser';
import placeImg from '../jslogic/placeImg';
import Button from './Button';
import gameState from '../config/gameState';


export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.music = this.sound.add('bgmusic', { loop: true, volume: 0.06 });
    this.game.sound.stopAll();
    placeImg(this, 'menu', 0);
    const { width } = this.scale;
    const { height } = this.scale;
    const gameOver = this.add.text(width / 2, height / 2, 'GAME OVER!', { fontFamily: 'Trebuchet MS', fontSize: '40px', fill: '#000000' });
    gameOver.setOrigin(0.5, 0.5);
  }

  create() {
    if (gameState.music) {
      this.music.play();
    }
    gameState.lives = 3;
    const replay = new Button(this, 'div', 'otherBtn', 'replay', 100);
    const leadearboard = new Button(this, 'div', 'otherBtn', 'leaderboard', 50);
    const mainMenu = new Button(this, 'div', 'otherBtn', 'main menu', 150);

    mainMenu.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('BootScene');
    });

    leadearboard.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('LeaderScene');
    });


    replay.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('GameScene');
    });
  }
}