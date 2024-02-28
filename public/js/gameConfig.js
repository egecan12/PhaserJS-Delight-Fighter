var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300,
      },
      debug: false,
    },
  },
  scene: [OpeningScene, Episode1, Loading_Scene, Scene3],
  //add Scene1, Scene2, Loading_Scene,
};
let game = new Phaser.Game(config);
