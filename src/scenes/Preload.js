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

    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70
    });

    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet("coin", "assets/coin.png", {
      frameWidth: 20,
      frameHeight: 20
    });

    this.load.spritesheet("mountain", "assets/mountain.png", {
      frameWidth: 512,
      frameHeight: 512
    });
  }

  create() {


    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 4
      }),
      frameRate: 15,
      repeat: -1
    });




    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });
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