import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Phaser from 'phaser';
import gameState from '../config/gameState';
import localGetter from '../jslogic/localGetter';
import localSetter from '../jslogic/localSetter';
import gameOptions from '../config/gameOptions';
import placeImg from '../jslogic/placeImg';
import getRightmostMountain from '../jslogic/getRightmostMountain';
import { key } from '../config/key';
import scoreSetter from '../jslogic/scoreSetter';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    gameState.jumpSound = this.sound.add('jumpsound', { loop: false, volume: 0.04 });
    gameState.dieSound = this.sound.add('diesound', { loop: false, volume: 0.05 });
    gameState.dieSoundfall = this.sound.add('diesfallsound', { loop: false, volume: 0.05 });
    gameState.scoreSound = this.sound.add('score', { loop: false, volume: 0.03 });
    gameState.bgsound = this.sound.add('run!', { loop: true, volume: 0.07 });
    gameState.space = this.input.keyboard.addKey('SPACE');
  }

  create() {
    if (gameState.music) {
      gameState.bgsound.play();
    }


    placeImg(this, 'sky', 0);

    gameState.width = this.scale.width;
    gameState.height = this.scale.height;

    for (let i = gameState.lives; i > 0; i -= 1) {
      const heart = this.add.image(30 * i, 30, 'heart').setOrigin(0.5);
      heart.setScale(0.1);
    }

    gameState.playerName = localGetter();
    const names = ['Stinky', 'guy with small...', 'unnamed', 'I need a name', 'speedy'];
    if (!gameState.playerName) {
      gameState.playerName = names[Math.floor(Math.random() * names.length)];
      localSetter(gameState.playerName);
    }


    gameState.scoreText = this.add.text(700, 20, `${gameState.playerName}:  ${gameState.score}`,
      { fontFamily: 'Trebuchet MS', fontSize: 18, color: '#003300' });

    gameState.mountainGroup = this.add.group();
    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });


    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.coinGroup = this.add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });


    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });


    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });


    this.addMountains();


    this.addPlatform(gameState.width,
      gameState.width / 2, gameState.height * gameOptions.platformVerticalLimit[1]);

    gameState.runner = this.physics.add.sprite(gameOptions.playerStartPosition, gameState.height * 0.65, 'runner');
    gameState.runner.setDepth(2);
    gameState.runner.setScale(0.6);
    gameState.runner.setGravityY(gameOptions.playerGravity);

    gameState.dying = false;
    this.platformCollider = this.physics.add.collider(gameState.runner, this.platformGroup, () => {
      if (!gameState.runner.anims.isPlaying) {
        gameState.runner.anims.play('runner');
      }
    }, null, this);


    this.physics.add.overlap(gameState.runner, this.coinGroup, (runner, coin) => {
      if (gameState.effects) {
        gameState.scoreSound.play();
      }

      gameState.score += 10;
      gameState.scoreText.setText(`${gameState.playerName}:  ${gameState.score}`);
      coin.disableBody(true, true);
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


    this.physics.add.overlap(gameState.runner, this.fireGroup, () => {
      gameState.dying = true;
      if (gameState.effects) {
        gameState.dieSound.play();
      }
      gameState.runner.anims.stop();
      gameState.runner.setFrame(1);
      gameState.runner.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.input.on('pointerdown', GameScene.jump, this);
    gameState.space.on('down', GameScene.jump, this);
  }


  addMountains() {
    const rightmostMountain = getRightmostMountain(gameState);

    const { height } = this.scale;
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (rightmostMountain < gameState.width * 3) {
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

  addPlatform(platformWidth, posX, posY) {
    gameState.addedPlatforms += 1;
    let platform;


    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 80, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0],
        gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0], gameOptions.spawnRange[1],
    );


    if (gameState.addedPlatforms > 1) {
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


  static jump() {
    if ((!gameState.dying)
      && (gameState.runner.body.touching.down
        || (gameState.runnerJumps > 0 && gameState.runnerJumps < gameOptions.jumps))) {
      if (gameState.runner.body.touching.down) {
        gameState.runnerJumps = 0;
      }
      gameState.runner.setVelocityY(gameOptions.jumpForce * -1);
      gameState.runnerJumps += 1;
      gameState.runner.anims.stop();
      if (gameState.effects) {
        gameState.jumpSound.play();
      }
    }
  }

  update() {
    if (gameState.runner.y > this.scale.height) {
      gameState.lives -= 1;

      if (gameState.effects) {
        gameState.dieSoundfall.play();
      }
      gameState.bgsound.stop();
      this.scene.start('GameScene');
    }

    if (gameState.lives <= 0) {
      gameState.bgsound.stop();
      this.physics.pause();
      gameState.runner.anims.stop();

      const data = {
        user: gameState.playerName,
        score: gameState.score,
      };
      scoreSetter(data, key);
      gameState.score = 0;
      this.scene.stop();
      this.scene.start('GameOver');
    }

    gameState.runner.x = gameOptions.playerStartPosition;

    let minDistance = gameState.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = gameState.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    this.fireGroup.getChildren().forEach((fire) => {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

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

    if (minDistance > this.nextPlatformDistance) {
      const nextPlWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1],
      );
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(
        gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1],
      );
      const nextPlGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = this.scale.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlWidth, gameState.width + nextPlWidth / 2, nextPlatformHeight);
    }
  }
}