import Phaser from 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" })
  }

  preload() {
    this.load.image('startbg', 'assets/startGameImg.jpg')
  }

  create() {
    let centerText = (text, offset) => {
      const x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const y = this.cameras.main.worldView.y + this.cameras.main.height / 2 + offset;
      const loadingText = this.add.text(x, y, text).setOrigin(0.5);
    }

    this.add.image(450, 300, 'startbg')
    centerText('The Runner', -150)

    // this.add.text(450, 300, "this is the text")

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 20%').setOrigin(0.5);

    this.input.on('pointerup', () => {
      this.scene.start("GameScene");
    })

  }
  update() { }


}



