import Phaser from 'phaser';
import placeImg from '../jslogic/placeImg';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');
    this.load.image('bg', 'assets/background.png');
    this.load.image('platform', 'assets/ground_grass.png');
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json');

    this.load.spritesheet('fire', 'assets/fire.png', {
      frameWidth: 40,
      frameHeight: 70,
    });

    this.load.spritesheet('coin', 'assets/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

    this.load.spritesheet('mountain', 'assets/mountain.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
    placeImg(this, 'startbg', 0);


    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.6);
    progressBox.fillRect(280, 270, 320, 50);


    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 60,
      text: 'LOADING...',
      style: {
        font: '25px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);


    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);


    this.load.on('progress', (value) => {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(290, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('fileprogress', (file) => {

      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {


      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy()
      assetText.destroy();
    });



  }

  create() {



    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });


    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: 'runner',
      frames: this.anims.generateFrameNames('runner', {
        start: 1,
        end: 6,
        prefix: 'runner',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 16,
      repeat: -1,
    });


    this.anims.create({
      key: 'jumper',
      frames: this.anims.generateFrameNames('runner', {
        start: 1,
        end: 6,
        prefix: 'jumper',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 24,
      repeat: -1,
    });


    //starting the loading scene

    this.scene.start('GameScene')

  }


}