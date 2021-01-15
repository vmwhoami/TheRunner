
const playerName = (context) => {
  const x = context.cameras.main.worldView.x + context.cameras.main.width / 2;
  const y = context.cameras.main.worldView.y + context.cameras.main.height / 2;

  context.nameInput = context.add.dom(x, y).createFromCache("form")
  context.returnKey = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  context.returnKey.on("down", event => {
    let name = context.nameInput.getChildByName("name");
    if (name.value != "") {
      context.scene.start("Preload");
    }
  });

}

export default playerName;