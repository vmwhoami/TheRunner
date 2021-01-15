
const playerName = (key) => {
  key.nameInput = key.add.dom(640, 360).createFromCache("form")

  key.returnKey = key.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


  key.returnKey.on("down", event => {
    let name = key.nameInput.getChildByName("name");
    if (name.value != "") {
      key.scene.start("GameScene");
    }
  });

}

export default playerName;