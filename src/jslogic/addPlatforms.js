

// addPlatform(platformWidth, posX, posY) {
//   this.addedPlatforms += 1;
//   let platform;
//   if (this.platformPool.getLength()) {
//     platform = this.platformPool.getFirst();
//     platform.x = posX;
//     platform.y = posY;
//     platform.active = true;
//     platform.visible = true;
//     this.platformPool.remove(platform);
//     // const newRatio = platformWidth / platform.displayWidth;
//     platform.displayWidth = platformWidth;
//     platform.tileScaleX = 1 / platform.scaleX;
//   } else {
//     platform = this.add.tileSprite(posX, posY, platformWidth, 80, 'platform');
//     this.physics.add.existing(platform);
//     platform.body.setImmovable(true);
//     platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
//     platform.setDepth(2);
//     this.platformGroup.add(platform);
//   }
//   this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

//   // if this is not the starting platform...
//   if (this.addedPlatforms > 1) {
//     // is there a coin over the platform?
//     if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
//       if (this.coinPool.getLength()) {
//         const coin = this.coinPool.getFirst();
//         coin.x = posX;
//         coin.y = posY - 96;
//         coin.alpha = 1;
//         coin.active = true;
//         coin.visible = true;
//         this.coinPool.remove(coin);
//       } else {
//         const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
//         coin.setImmovable(true);
//         coin.setVelocityX(platform.body.velocity.x);
//         coin.anims.play('rotate');
//         coin.setDepth(2);
//         this.coinGroup.add(coin);
//       }
//     }

//     // is there a fire over the platform?
//     if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
//       if (this.firePool.getLength()) {
//         const fire = this.firePool.getFirst();
//         fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
//         fire.y = posY - 100;
//         fire.alpha = 1;
//         fire.active = true;
//         fire.visible = true;
//         this.firePool.remove(fire);
//       } else {
//         const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 75, 'fire');
//         fire.setImmovable(true);
//         fire.setVelocityX(platform.body.velocity.x);
//         fire.setSize(8, 2, true);
//         fire.anims.play('burn');
//         fire.setDepth(2);
//         this.fireGroup.add(fire);
//       }
//     }
//   }
// }