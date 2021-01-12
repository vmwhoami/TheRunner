import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" })
  }

  preload() { }
  create() {
    this.add.text(20, 20, "hello", {

    })
  }
  update() { }


}



export default BootScene;