import { Scene } from 'phaser';
import gameOptions from '../jslogic/gameOptions'

import config from '../config/config';
const gameState = {
  score: 0,
}



export default class GameScene extends Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("bg", "assets/cartoonsky.png");

    this.load.image('platform', 'assets/ground_grass.png')
    // this.load.spritesheet("player", "assets/player.png", 37, 45, 18);
  }
  create() {

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)




    const platforms = this.physics.add.staticGroup()

    for (let i = 0; i < 4; ++i) {
      const x = Phaser.Math.Between(100, 800)
      const y = 560
      const platform = platforms.create(x, y, 'platform')
      platform.setScale(x, .5)
      const body = platform.body
      body.updateFromGameObject()
    }



    // group with all active platorms.
    // this.platformGroup = this.add.group({

    //   // once a platform is removed, it's added to the pool
    //   removeCallback: function (platform) {
    //     platform.scene.platformPool.add(platform)
    //   }
    // });

    // // pool
    // this.platformPool = this.add.group({

    //   //   // once a platform is removed from the pool, it's added to the active platforms group
    //   removeCallback: function (platform) {
    //     platform.scene.platformGroup.add(platform)
    //   }
    // });

    // // number of consecutive jumps made by the player
    // this.playerJumps = 0;

    // // adding a platform to the game, the arguments are platform width and x position
    // this.addPlatform(this.width, this.width / 2);

    // // adding the player;
    // this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "player");
    // this.player.setGravityY(gameOptions.playerGravity);

    // setting collisions between the player and the platform group
    // this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    // this.input.on("pointerdown", this.jump, this);
  }

  // the core of the script: platform are added from the pool or created on the fly
  // addPlatform(platformWidth, posX) {
  //   let platform;
  //   if (this.platformPool.getLength()) {
  //     platform = this.platformPool.getFirst();
  //     platform.x = posX;
  //     platform.active = true;
  //     platform.visible = true;
  //     this.platformPool.remove(platform);
  //   }
  //   else {
  //     platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
  //     platform.setImmovable(true);
  //     platform.setVelocityX(gameOptions.platformStartSpeed * -1);
  //     this.platformGroup.add(platform);
  //   }
  //   platform.displayWidth = platformWidth;
  //   this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  // }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  // jump() {
  //   if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
  //     if (this.player.body.touching.down) {
  //       this.playerJumps = 0;
  //     }
  //     this.player.setVelocityY(gameOptions.jumpForce * -1);
  //     this.playerJumps++;
  //   }
  // }
  // update() {

  //   // game over
  //   if (this.player.y > game.config.height) {
  //     this.scene.start("GameScene");
  //   }
  //   this.player.x = gameOptions.playerStartPosition;

  //   // recycling platforms
  //   let minDistance = game.config.width;
  //   this.platformGroup.getChildren().forEach(function (platform) {
  //     let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
  //     minDistance = Math.min(minDistance, platformDistance);
  //     if (platform.x < - platform.displayWidth / 2) {
  //       this.platformGroup.killAndHide(platform);
  //       this.platformGroup.remove(platform);
  //     }
  //   }, this);

  //   // adding new platforms
  //   if (minDistance > this.nextPlatformDistance) {
  //     var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
  //     this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
  //   }
  // }
};