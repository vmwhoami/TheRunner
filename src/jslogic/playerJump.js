const jump = () => {
  if ((!this.dying) && (this.runner.body.touching.down || (this.runnerJumps > 0 && this.runnerJumps < gameOptions.jumps))) {
    if (this.runner.body.touching.down) {
      this.runnerJumps = 0;
    }
    this.runner.setVelocityY(gameOptions.jumpForce * -1);
    this.runnerJumps++;

    // stops animation
    this.runner.anims.stop();
  }
};

export default jump;