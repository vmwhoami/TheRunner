import Phaser from 'phaser';
import GameScene from './GameScene';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" })
  }

  preload() { }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const loadingText = this.add.text(screenCenterX, screenCenterY, 'Fuck you: 20%').setOrigin(0.5);
    this.add.text(20, 20, "hello", {

    })
    this.time.addEvent({
      delay: 1000,
      loop: false,
      callback: () => {
        this.scene.start("GameScene");
      }
    })
  }
  update() { }


}



export default BootScene;