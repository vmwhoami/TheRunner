import { Scene } from 'phaser';

class GameScene extends Scene {

  constructor() {
    super("scene-game");
  }

  create() {
    // Add, scale, and make up a speed for our creature
    this.sky = this.add.image(0, 0, "sky")

    this.cat = this.physics.add.sprite(50, 240, 'cat');



    this.cat.body.setAllowGravity(false);
    this.cat.setScale(0.4);
    this.catSpeed = 200;
    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(50, 50, "Fuck you mother-fucker")
  }

  update() {
    // Listen for keyboard input
    // const { left, right, up, down } = this.cursors;
    // if (left.isDown) {
    //   this.cat.setVelocityX(-this.catSpeed);
    // }
    // else if (right.isDown) {
    //   this.cat.setVelocityX(this.catSpeed);
    // }
    // else {
    //   this.cat.setVelocityX(0);
    // }
    // if (up.isDown) {
    //   this.cat.setVelocityY(-this.catSpeed);
    // }
    // else if (down.isDown) {
    //   this.cat.setVelocityY(this.catSpeed);
    // }
    // else {
    //   this.cat.setVelocityY(0);
    // }

    this.cat.setCollideWorldBounds(true);
  }

}
export default GameScene;
