import Phaser from 'phaser';

const gameState = {}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  preload() {
    this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png')
    this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png')
    this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png')
    this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png')
    this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png')
  }

  create() {
    // Add your code below: 
    gameState.codey = this.physics.add.sprite(400, 10, 'codey')

    gameState.codey.setCollideWorldBounds(true);
  }

}