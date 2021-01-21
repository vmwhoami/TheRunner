import Phaser from 'phaser';
import placeImg from '../jslogic/placeImg';
import Button from './Button';
import gameState from '../config/gameState';
export default class Settings extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  preload() {
    this.music = this.sound.add('bgmusic', { loop: true, volume: 0.05 });
  }

  create() {
    placeImg(this, 'settingsimg', 0);
    const mainmenu = new Button(this, 'div', 'otherBtn', 'Main menu', 50);
    const turnoffSound = new Button(this, 'div', 'otherBtn', 'Switch music', 0);
    console.log(turnoffSound);
    turnoffSound.addListener('click').on('click', () => {
      if (gameState.music) {
        this.music.stop();
        gameState.music = false
      } else {
        this.music.play()
        gameState.music = true
      }

    });
    mainmenu.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('BootScene');
    });
  }
}