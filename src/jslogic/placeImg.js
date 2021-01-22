
const placeImg = (context, obj, offset) => {
  const x = context.cameras.main.worldView.x + context.cameras.main.width / 2;
  const y = context.cameras.main.worldView.y + context.cameras.main.height / 2 + offset;
  context.add.image(x, y, obj).setOrigin(0.5);
};
export default placeImg;