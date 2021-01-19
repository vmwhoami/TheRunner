import Phaser from 'phaser';
import Preload from '../scenes/Preload';
import BootScene from '../scenes/BootScene';
import GameScene from '../scenes/GameScene';
import GameOver from '../scenes/GameOver'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

const cont = document.querySelector('.container');
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  backgroundColor: 0x000000,
  parent: cont,
  autoCenter: 1,
  scaleMode: 3,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {

      enableBody: true,
      debug: true,
    },
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },

  scene: [Preload, BootScene, GameScene, GameOver],
};

export default config;