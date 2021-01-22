import Phaser from 'phaser';


export default class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg');
    this.load.image('sky', 'assets/cartoonsky.png');
    this.load.image('menu', 'assets/menu.jpg');
    this.load.image('bg', 'assets/background.png');
    this.load.image('platform', 'assets/rocksendless.png');
    this.load.image('settingsimg', 'assets/settingimg.jpg');
    this.load.image('heart', 'assets/heart.png');
    this.load.atlas('runner', 'assets/character/runner.png',
      'assets/character/runner.json');
    this.load.image('runnertxt', 'assets/therunnertext.png');
    this.load.html('form', 'assets/form.html');
    this.load.audio('bgmusic', ['assets/heromusicbg.mp3']);
    this.load.audio('jumpsound', ['assets/jump.mp3']);
    this.load.audio('diesound', ['assets/dievoice1.mp3']);
    this.load.audio('diesfallsound', ['assets/dievoice.mp3']);
    this.load.audio('run!', ['assets/Run!.mp3']);
    this.load.audio('score', ['assets/score.wav']);


    this.load.spritesheet('fire', 'assets/fire.png', {
      frameWidth: 40,
      frameHeight: 70,
    });

    this.load.spritesheet('coin', 'assets/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

    this.load.spritesheet('mountain', 'assets/buildings.png', {
      frameWidth: 512,
      frameHeight: 512,
    });


    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.6);
    progressBox.fillRect(280, 270, 320, 50);


    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 60,
      text: 'LOADING...',
      style: {
        font: '25px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);


    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);


    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(290, 280, 300 * value, 30);
      percentText.setText(`${parseInt(value * 100, 10)}%`);
    });

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      assetText.destroy();
      percentText.destroy();
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


    this.scene.start('BootScene');
  }
}