import Phaser from 'phaser';
import placeImg from '../jslogic/placeImg';
import Button from './Button';

export default class Settings extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  preload() {
    this.music = this.sound.add('bgmusic', { loop: true, volume: 0.06 });
    this.music.play();
  }

  create() {
    placeImg(this, 'settingsimg', 0);
    const mainmenu = new Button(this, 'div', 'otherBtn', 'Main menu', 50);

    mainmenu.addListener('click').on('click', () => {
      this.music.stop();
      this.scene.start('BootScene');
    });
  }
}