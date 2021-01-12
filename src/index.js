import "./styles/style.scss";
import Phaser from 'phaser';




function preload() {
  this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png')
  this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png')
  this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png')
  this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png')
  this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png')
}

const gameState = {};

function create() {
  // Add your code below: 
  gameState.codey = this.physics.add.sprite(400, 10, 'codey')

  gameState.codey.setCollideWorldBounds(true);
}

function update() {
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  backgroundColor: "c34111",
  autoCenter: 1,
  scaleMode: 3,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: -300,
        y: 300
      },
      enableBody: true,
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

const game = new Phaser.Game(config)
