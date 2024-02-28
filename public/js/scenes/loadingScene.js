class Loading_Scene extends Phaser.Scene {
  flag = true;
  flag2 = true;
  menuText = {};
  menuText2 = {};
  menuText3 = {};
  menuText4 = {};

  constructor() {
    super({ key: "Loading_Scene", active: false });
  }

  create() {
    this.background = this.add.tileSprite(
      400,
      300,
      config.width,
      config.height,
      "loading_bg"
    );
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.menuText = this.add.text(225, 300, "Press space bar to start...", {
      font: "2pc Impact",
      fill: "#ffff00",
    });

    this.menuText3 = this.add.text(225, 300, "Press space bar to start ...", {
      font: "2pc Impact",
      fill: "#ffff00",
    });

    this.menuText2 = this.add.text(
      200,
      400,
      " New feature has been unlocked !!",
      {
        font: "2pc Impact",
        fill: "#66ff33",
      }
    );
    this.menuText4 = this.add.text(
      200,
      500,
      " Use space bar to throw the delights ",
      {
        font: "2pc Impact",
        fill: "#ffff00",
      }
    );

    player = this.add.sprite(100, 450, "dude5").setScale(3);

    this.anims.create({
      key: "loading_anim",
      frames: this.anims.generateFrameNumbers("punch", { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });
  }

  preload() {
    this.load.image("loading_bg", "public/assets/vapur.png");
    this.load.spritesheet("punch", "public/assets/punch.png", {
      frameWidth: 73,
      frameHeight: 110,
    });
    this.load.audio("background_music", "public/assets/q.mp3");
  }

  update() {
    this.background.tilePositionX += 0.2;
    if (spacebar.isDown) {
      this.scene.start("Scene3");
    }

    if (this.flag) {
      player.anims.play("loading_anim");
      this.flag = false;
    }

    if (this.flag2) {
      this.flag2 = false;
      setTimeout(() => {
        if (this.menuText.style.color == "#ffffff") {
          this.menuText.setTint("#000000");
          this.menuText.style.color = "#000000";
        } else {
          this.menuText.clearTint();
          this.menuText.style.color = "#ffffff";
        }
        this.flag2 = true;
      }, 250);
    }
    //console.log(this.menuText.style.color);
    //this.menuText.style.color == '#ffffff' ? this.menuText.setTint('#000000') : this.menuText.setTint('#ff0000');
    // if (this.menuText.style.color == '#ffffff') {
    // 	this.menuText.setTint('#000000');
    // 	this.menuText.style.color = '#000000';
    // } else {
    // 	console.log('Hey girrrlll');
    // 	this.menuText.setTint('#ffffff');
    // 	this.menuText.style.color = '#ffffff';
    // }
  }
}
