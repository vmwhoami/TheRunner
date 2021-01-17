import getRightmostMountain from './getRightmostMountain'
import gameOptions from '../config/gameOptions'
const movingBg = (context) => {
  const rightmostMountain = getRightmostMountain(gameState);
  const { width } = context.scale;
  const { height } = context.scale;
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (rightmostMountain < width * 3) {
    const posX = rightmostMountain + randomInt(100, 350);
    const posY = height + randomInt(0, 100);
    const mountain = context.physics.add.sprite(posX, posY, 'mountain');
    mountain.setOrigin(0.5, 1);
    mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
    gameState.mountainGroup.add(mountain);
    if (randomInt(0, 1)) {
      mountain.setDepth(1);
    }
    mountain.setFrame(randomInt(0, 3));
    movingBg();
  }
}

export default movingBg