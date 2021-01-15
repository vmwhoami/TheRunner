import { Scene } from 'phaser';
import playerName from '../jslogic/playerName';

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" })
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');

    this.load.image("bg", "assets/background.png");
    this.load.image('platform', 'assets/ground_grass.png')
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json')
    this.load.html("form", "assets/form.html");
  }

  create() {

    let centerText = (text, offset) => {
      const x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const y = this.cameras.main.worldView.y + this.cameras.main.height / 2 + offset;
      const loadingText = this.add.text(x, y, text).setOrigin(0.5);
    }

    this.add.image(450, 300, 'startbg')
    centerText('The Runner', -150)

    centerText('Loading: 20%', 0)

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


    playerName(this)


    // this.input.on('pointerup', () => {
    //   this.scene.start("GameScene");
    // })

  }
  update() { }


}



