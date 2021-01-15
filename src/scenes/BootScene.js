import { Scene } from 'phaser';
import playerName from '../jslogic/playerName';

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" })
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');

    this.load.image("bg", "assets/background.png");
    this.load.image("runnertxt", "assets/therunnertext.png")
    this.load.image('platform', 'assets/ground_grass.png')
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json')
    this.load.html("form", "assets/form.html");
  }

  create() {

    let placeObject = (context, obj, offset) => {
      const x = context.cameras.main.worldView.x + context.cameras.main.width / 2;
      const y = context.cameras.main.worldView.y + context.cameras.main.height / 2 + offset;
      context.add.image(x, y, obj).setOrigin(0.5);
    }

    placeObject(this, 'startbg', 0)
    placeObject(this, 'runnertxt', -200)


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




  }



}



