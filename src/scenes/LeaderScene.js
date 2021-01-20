import Phaser from 'phaser';
import Button from './Button';
import placeImg from '../jslogic/placeImg';
import scoreGetter from '../jslogic/scoresGetter';
import { key } from '../config/key';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class LeaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderScene' });
  }

  preload() {
    this.load.image('leader', 'assets/sky.jpg');
  }

  create() {
    placeImg(this, 'leader', 0);
    const replay = new Button(this, 'div', 'btn', 'replay', 100);
    replay.addListener('click').on('click', () => {
      this.scene.start('GameScene');
    });

    const mainMenu = new Button(this, 'div', 'btn', 'Main Menu', 150);
    mainMenu.addListener('click').on('click', () => {
      this.scene.start('BootScene');
    });

    const settingScore = async () => {
      this.add.text(350, 100, 'RANK    SCORE    NAME');
      const response = await scoreGetter(key);
      const sortedresult = response.result.sort((a, b) => (a.score > b.score ? -1 : 1));

      let count = 0;
      let position = 130;
      sortedresult.forEach(result => {
        count += 1;
        let st;
        if (count < 10) {
          if (count === 1) {
            st = 'st';
          } else if (count === 2) {
            st = 'nd';
          } else if (count > 3) {
            st = 'th';
          } else {
            st = 'd';
          }
          this.add.text(300, position, `     ${count} ${st}     ${result.score}      ${result.user}`).setTint(0xffffff);
          position += 25;
        }
      });
    };
    settingScore();
  }
}
