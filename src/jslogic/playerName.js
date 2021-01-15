
const playerName = (self) => {
  const x = self.cameras.main.worldView.x + self.cameras.main.width / 2;
  const y = self.cameras.main.worldView.y + self.cameras.main.height / 2;

  self.nameInput = self.add.dom(x, y).createFromCache("form")
  self.returnKey = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  self.returnKey.on("down", event => {
    let name = self.nameInput.getChildByName("name");
    if (name.value != "") {
      self.scene.start("GameScene");
    }
  });

}

export default playerName;