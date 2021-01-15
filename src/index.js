import "./styles/style.scss";
import Phaser from 'phaser';
import config from './config/config';
import gameOptions from './jslogic/gameOptions';

const gam = new Phaser.Game(config);
let game


window.onload = function () {

  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: [preloadGame, playGame],
    backgroundColor: 0x0c88c7,

    // physics settings
    physics: {
      default: "arcade"
    }
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
}

// preloadGame scene
class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("platform", "assets/ground_grass.png");

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 24,
      frameHeight: 48
    });


    this.load.atlas('runner', 'assets/character/runner.png', 'assets/character/runner.json')
    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet("coin", "assets/coin.png", {
      frameWidth: 20,
      frameHeight: 20
    });

    // the firecamp is a sprite sheet made by 32x58 pixels
    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70
    });

    // mountains are a sprite sheet made by 512x512 pixels
    this.load.spritesheet("mountain", "assets/mountain.png", {
      frameWidth: 512,
      frameHeight: 512
    });
  }
  create() {

    // // setting player animation
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1
      }),
      frameRate: 8,
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

    // setting coin animation
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

    // setting fire animation
    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 4
      }),
      frameRate: 15,
      repeat: -1
    });

    this.scene.start("PlayGame");
  }
}

// playGame scene
class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {

    // group with all active mountains.
    this.mountainGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform)
      }
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform)
      }
    });

    // group with all active coins.
    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback: function (coin) {
        coin.scene.coinPool.add(coin)
      }
    });

    // coin pool
    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: function (coin) {
        coin.scene.coinGroup.add(coin)
      }
    });

    // group with all active firecamps.
    this.fireGroup = this.add.group({

      // once a firecamp is removed, it's added to the pool
      removeCallback: function (fire) {
        fire.scene.firePool.add(fire)
      }
    });

    // fire pool
    this.firePool = this.add.group({

      // once a fire is removed from the pool, it's added to the active fire group
      removeCallback: function (fire) {
        fire.scene.fireGroup.add(fire)
      }
    });

    // adding a mountain
    this.addMountains()

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player so far


    this.runnerJumps = 0;
    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(this.scale.width, this.scale.width / 2, this.scale.height * gameOptions.platformVerticalLimit[1]);


    // const runner = this.physics.add.sprite(
    //   width * 0.2,
    //   height * 0.3,
    //   'runner', // atlas key given in preload()
    //   'runner01.png'
    // ).play('runner')

    // adding the player;
    this.runner = this.physics.add.sprite(gameOptions.playerStartPosition, this.scale.height * 0.68, "runner")
    this.runner.setDepth(2)
    this.runner.setGravityY(gameOptions.playerGravity)


    // the player is not dying
    this.dying = false;

    // setting collisions between the player and the platform group
    this.platformCollider = this.physics.add.collider(this.runner, this.platformGroup, function () {

      // play "run" animation if the player is on a platform
      if (!this.runner.anims.isPlaying) {
        this.runner.anims.play("runner");
      }
    }, null, this);


    this.platformCollider = this.physics.add.collider(this.runner, this.platformGroup, function () {

      // play "run" animation if the player is on a platform
      if (!this.runner.anims.isPlaying) {
        this.runner.anims.play("run");
      }
    }, null, this);

    // setting collisions between the player and the coin group
    this.physics.add.overlap(this.runner, this.coinGroup, function (player, coin) {

      this.tweens.add({
        targets: coin,
        y: coin.y - 100,
        alpha: 0,
        duration: 800,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function () {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        }
      });

    }, null, this);

    // setting collisions between the player and the fire group
    this.physics.add.overlap(this.runner, this.fireGroup, function (player, fire) {

      this.dying = true;
      this.runner.anims.stop();
      this.runner.setFrame(2);
      this.runner.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);

    }, null, this);

    // checking for input
    this.input.on("pointerdown", this.jump, this);
  }

  // adding mountains
  addMountains() {
    let rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < this.scale.width * 3) {
      let mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), this.scale.height + Phaser.Math.Between(0, 100), "mountain");
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1)
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3))
      this.addMountains()
    }
  }

  // getting rightmost mountain x position
  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach(function (mountain) {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    })
    return rightmostMountain;
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      let newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    }
    else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

    // if this is not the starting platform...
    if (this.addedPlatforms > 1) {

      // is there a coin over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          let coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        }
        else {
          let coin = this.physics.add.sprite(posX, posY - 96, "coin");
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      // is there a fire over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          let fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        }
        else {
          let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true)
          fire.anims.play("burn");
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  // and obviously if the player is not dying
  jump() {
    if ((!this.dying) && (this.runner.body.touching.down || (this.runnerJumps > 0 && this.runnerJumps < gameOptions.jumps))) {
      if (this.runner.body.touching.down) {
        this.runnerJumps = 0;
      }
      this.runner.setVelocityY(gameOptions.jumpForce * -1);
      this.runnerJumps++;

      // stops animation
      this.runner.anims.stop();
    }
  }

  update() {

    // game over
    if (this.runner.y > this.scale.height) {
      this.scene.start("PlayGame");
    }

    this.runner.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = this.scale.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      let platformDistance = this.scale.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < - platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling coins
    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < - coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // recycling fire
    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < - fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    // recycling mountains
    this.mountainGroup.getChildren().forEach(function (mountain) {
      if (mountain.x < - mountain.displayWidth) {
        let rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = this.scale.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3))
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      let minPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, this.scale.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
};
function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
