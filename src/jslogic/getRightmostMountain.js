
const getRightmostMountain = (gameState) => {
  let rightmostMountain = -200;
  gameState.mountainGroup.getChildren().forEach((mountain) => {
    rightmostMountain = Math.max(rightmostMountain, mountain.x);
  });
  return rightmostMountain;
};

export default getRightmostMountain;