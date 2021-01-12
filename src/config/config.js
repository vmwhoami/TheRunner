import Phaser from 'phaser';

const cont = document.querySelector('.container')
export default {
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
        x: -300,
        y: 300
      },
      enableBody: true,
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

