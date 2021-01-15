import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload')
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');
    this.load.image("bg", "assets/background.png");
    this.load.image('platform', 'assets/ground_grass.png')
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json')
  }

  create() {



    this.anims.create({
      key: 'runner', // name of this animation
      // helper to generate frames
      frames: this.anims.generateFrameNames('runner', {
        start: 1,
        end: 6,
        prefix: 'runner',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 20,
      repeat: -1 // -1 to loop forever
    })
    this.scene.start("GameScene");
  }

}