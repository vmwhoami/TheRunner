import Phaser from 'phaser';
import localSetter from './localSetter';

const playerName = (context) => {
  const x = context.cameras.main.worldView.x + context.cameras.main.width / 2;
  const y = context.cameras.main.worldView.y + context.cameras.main.height / 2;

  context.nameInput = context.add.dom(x, y).createFromCache('form');
  context.returnKey = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  context.returnKey.on('down', () => {
    const name = context.nameInput.getChildByName('name');
    if (name.value !== '') {
      localSetter(name.value);
      name.placeholder = `Name set to ${name.value}`;
      name.classList.add('placehold');
      name.blur();
      name.value = '';
    }
  });
};

export default playerName;