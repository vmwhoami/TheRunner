/* eslint-disable no-undef */
import config from '../config/config';
import 'phaser';

export default class Button {
  constructor(content, position, startScene, actualScene, scoreCondition = false, dead = false) {
    this.content = content;
    this.position = position;
    this.startScene = startScene;
    this.actualScene = actualScene;
    this.scoreCondition = scoreCondition;
    this.dead = dead;
  }

  create() {
    const button = this.actualScene.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(button, this.position);
    const text = this.actualScene.add.text(0, 0, this.content, { fontSize: '22px', fill: '#fff' });
    this.centerButtonText(text, button);
    button.on('pointerdown', () => {
      if (this.scoreCondition) {
        prop.gameProperty.score = prop.gameProperty.lastScore;
      }

      this.actualScene.scene.start(this.startScene);
    });

    this.actualScene.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.actualScene.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.actualScene.add
        .zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}

