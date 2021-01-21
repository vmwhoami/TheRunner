import Phaser from 'phaser';
import placeImg from '../jslogic/placeImg';
import playerName from '../jslogic/playerName';
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
    const changeName = new Button(this, 'div', 'otherBtn', 'Change Name', 45);
    const turnoffSound = new Button(this, 'div', 'otherBtn', 'music off', 90);
    const turnOffEffects = new Button(this, 'div', 'otherBtn', 'effects on/off', 135);
    const mainmenu = new Button(this, 'div', 'otherBtn', 'Main menu', 180);

    changeName.addListener('click').on('click', () => {
      playerName(this);
    });
    let btn = document.querySelectorAll('.otherBtn');

    turnoffSound.addListener('click').on('click', () => {
      if (gameState.music) {
        this.music.stop();
        btn[1].textContent = "music on"
        gameState.music = false
      } else {
        btn[1].textContent = "music off"
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