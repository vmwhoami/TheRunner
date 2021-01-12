import "./styles/style.scss";
import Phaser from 'phaser';
// import config from './config/config';
// import GameScene from './scenes/GameScene';

function preload() {
  this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
  this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
  this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
  this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
}

const gameState = {
  score: 0
};

function create() {
  gameState.player = this.physics.add.sprite(225, 200, 'codey').setScale(.5);

  const platforms = this.physics.add.staticGroup();

  platforms.create(225, 400, 'platform')

  gameState.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms);

  gameState.cursors = this.input.keyboard.createCursorKeys();

  const bugs = this.physics.add.group();

  function bugGen() {
    const xCoord = Math.random() * 800;
    bugs.create(xCoord, 10, 'bug3');
  }


  const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
  const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  // const loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 0%').setOrigin(0.5);

  gameState.scoreText = this.add.text(screenCenterX, 480, 'Score: 0', { fontSize: '15px', fill: '#000000' }).setOrigin(0.5, 0.5).setOrigin(0.5);

  let bugGenLoop = this.time.addEvent({
    delay: 150,
    callback: bugGen,
    callbackScope: this,
    loop: true
  })
  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy()
    gameState.score += 1
    gameState.scoreText.setText(`Score: ${gameState.score}`)
  })

  this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy()
    this.physics.pause()
    this.add.text(screenCenterX, screenCenterY, 'Game over', {
      fontSize: '50px',
      fill: '#000000'
    }).setOrigin(0.5)
  })
}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(160);
  } else if (gameState.cursors.up.isDown) {
    gameState.player.setVelocityY(-160);
  }
  else {
    gameState.player.setVelocityX(0);
  }
}
let cont = document.querySelector('.container')
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: cont,
  autoCenter: 1,
  scaleMode: 3,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
