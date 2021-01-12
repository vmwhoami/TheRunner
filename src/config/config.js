import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import GameScene from '../scenes/GameScene';

const cont = document.querySelector('.container')
const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  backgroundColor: "c34111",
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
  scene: [BootScene, GameScene]
}

export default config;