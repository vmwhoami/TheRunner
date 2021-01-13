import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import GameScene from '../scenes/GameScene';

const cont = document.querySelector('.container')
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  backgroundColor: "#5DACD8",
  parent: cont,
  autoCenter: 1,
  scaleMode: 3,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800
      },
      enableBody: true,
      debug: true
    }
  },
  scene: [GameScene]
}

export default config;