import Phaser from 'phaser';
import localGetter from '../jslogic/localGetter';
import gameOptions from '../jslogic/gameOptions';
import getRightmostMountain from '../jslogic/getRightmostMountain';

const gameState = {
  score: 0,
  lives: 3,
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // preload() {

  // }

  create() {
    gameState.name = localGetter();

    // group with all active mountains.
    gameState.mountainGroup = this.add.group();
    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // group with all active coins.
    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    // coin pool
    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    // group with all active firecamps.
    this.fireGroup = this.add.group({

      // once a firecamp is removed, it's added to the pool
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    // fire pool
    this.firePool = this.add.group({

      // once a fire is removed from the pool, it's added to the active fire group
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    // adding a mountain
    this.addMountains();

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player so far


    this.runnerJumps = 0;
    // adding a platform to the game, the arguments are platform width, x position and y position
    const { width } = this.scale;
    const { height } = this.scale;
    this.addPlatform(width, width / 2, height * gameOptions.platformVerticalLimit[1]);


    this.runner = this.physics.add.sprite(gameOptions.playerStartPosition, height * 0.1, 'runner');
    this.runner.setDepth(2);
    this.runner.setGravityY(gameOptions.playerGravity);


    // the player is not dying
    gameState.dying = false;

    // setting collisions between the player and the platform group
    this.platformCollider = this.physics.add.collider(this.runner, this.platformGroup, () => {
      // play "run" animation if the player is on a platform
      if (!this.runner.anims.isPlaying) {
        this.runner.anims.play('runner');
      }
    }, null, this);


    // setting collisions between the player and the coin group
    this.physics.add.overlap(this.runner, this.coinGroup, (player, coin) => {
      this.tweens.add({
        targets: coin,
        y: coin.y - 200,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        },
      });
    }, null, this);

    // setting collisions between the player and the fire group
    this.physics.add.overlap(this.runner, this.fireGroup, () => {
      gameState.dying = true;
      this.runner.anims.stop();
      this.runner.setFrame(2);
      this.runner.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }


  // adding mountains
  addMountains() {
    const rightmostMountain = getRightmostMountain(gameState);
    const { width } = this.scale;
    const { height } = this.scale;
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (rightmostMountain < width * 3) {
      const posX = rightmostMountain + randomInt(100, 350);
      const posY = height + randomInt(0, 100);
      const mountain = this.physics.add.sprite(posX, posY, 'mountain');
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      gameState.mountainGroup.add(mountain);
      if (randomInt(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(randomInt(0, 3));
      this.addMountains();
    }
  }


  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      // const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 80, 'platform');
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
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      // is there a fire over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 100;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 75, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  // and obviously if the player is not dying
  jump() {
    if ((!gameState.dying) && (this.runner.body.touching.down || (this.runnerJumps > 0 && this.runnerJumps < gameOptions.jumps))) {
      if (this.runner.body.touching.down) {
        this.runnerJumps = 0;
      }
      this.runner.setVelocityY(gameOptions.jumpForce * -1);
      this.runnerJumps += 1;

      // stops animation
      this.runner.anims.stop();
    }
  }

  update() {
    // game over
    if (this.runner.y > this.scale.height) {
      this.scene.start('GameScene');
    }

    this.runner.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = this.scale.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = this.scale.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling coins
    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // recycling fire
    this.fireGroup.getChildren().forEach((fire) => {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    // recycling mountains
    gameState.mountainGroup.getChildren().forEach((mountain) => {
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = getRightmostMountain(gameState);
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = this.scale.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, this.scale.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}