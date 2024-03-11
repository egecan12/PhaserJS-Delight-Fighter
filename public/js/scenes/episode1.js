class Episode1 extends Phaser.Scene {
  gameOverText = {};
  constructor() {
    super({ key: "episode1", active: false });
  }
  isCrouched = false;

  create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");
    this.background = this.add.tileSprite(
      400,
      300,
      config.width,
      config.height,
      "sky"
    );
    this.gameOverText = this.add.text(-50, -50, "GameOver", {
      font: "2pc Impact",
      fill: "#ffff00",
      zindex: 1,
    });

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // The player and its settings
    player = this.physics.add.sprite(100, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(40, 90, 50, 25);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dudeLeft", { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "shine",
      frames: this.anims.generateFrameNumbers("star", { start: 0, end: 9 }),
      frameRate: 24,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "jump", frame: 3 }],
      frameRate: 24,
    });
    this.anims.create({
      key: "down",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 24,
    });
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (pointer.x < config.width / 2) {
          player.setVelocityX(-160);
          player.anims.play("left", true);
        } else {
          player.setVelocityX(160);
          player.anims.play("right", true);
        }
      },
      this
    );

    this.input.on(
      "pointerup",
      function () {
        player.setVelocityX(0);
        player.anims.play("turn");
      },
      this
    );
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setScale(1.5);
      child.anims.play("shine", true);
    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#ffff00",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
  }

  preload() {
    this.load.image("sky", "public/assets/episode1/sky2.png");
    this.load.image("ground", "public/assets/episode1/platform4.png");
    this.load.spritesheet("star", "public/assets/episode1/delight.png", {
      frameWidth: 32,
      frameHeight: 64,
      endFrame: 11,
    });
    this.load.image("bomb", "public/assets/episode1/cat-pixel2.png");
    this.load.spritesheet("dude", "public/episode1/assets/dude2.png", {
      frameWidth: 50,
      frameHeight: 110,
    });
    this.load.spritesheet("jump", "public/assets/episode1/dude2.png", {
      frameWidth: 45,
      frameHeight: 110,
    });
    this.load.spritesheet("dudeLeft", "public/assets/episode1/dudeLeft.png", {
      frameWidth: 55,
      frameHeight: 110,
    });
  }

  update() {
    if (score > 250) {
      this.scene.start("Loading_Scene");
    }
    if (gameOver) {
      if (this.gameOverText.x != 200) {
        this.gameOverText.x = 100;
        this.gameOverText.y = 100;

        //that makes the form unvisible
        document.getElementById("wrapper").removeAttribute("hidden");
      }
      return;
    }
    if (cursors.down.isDown && cursors.right.isDown) {
      if (this.isCrouched) {
        this.isCrouched = false;
        player.body.y -= 20;
        player.y -= 50;
        player.setScale(1, 1);

        // every member of the static physic group gonna be effected by that loop
        for (let item of platforms.children.entries) {
          item.x -= 2;
          item.body.x -= 2;
        }
        // every member of the stars physic group gonna be effected by that loop

        for (let item of stars.children.entries) {
          item.x -= 2;
          item.body.x -= 2;
        }
        for (let item of bombs.children.entries) {
          item.x -= 2;
          item.body.x -= 2;
        }
      }
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
      this.background.tilePositionX -= 2;
      for (let item of platforms.children.entries) {
        item.body.x += 2;
        item.x += 2;
      }
      for (let item of stars.children.entries) {
        item.x += 2;
        item.body.x += 2;
      }
      for (let item of bombs.children.entries) {
        item.x += 2;
        item.body.x += 2;
      }
      if (this.isCrouched) {
        this.isCrouched = false;
        player.body.y -= 20;
        player.y -= 50;
        player.setScale(1, 1);
      }
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
      this.background.tilePositionX += 2;
      // every member of the static physic group gonna be effected by that loop
      for (let item of platforms.children.entries) {
        item.x -= 2;
        item.body.x -= 2;
      }
      // every member of the stars physic group gonna be effected by that loop

      for (let item of stars.children.entries) {
        item.x -= 2;
        item.body.x -= 2;
      }
      for (let item of bombs.children.entries) {
        item.x -= 2;
        item.body.x -= 2;
      }
    } else if (cursors.down.isDown) {
      player.anims.play("down");
      player.body.velocity.y += 20;
      player.setScale(1, 0.5);

      if (!this.isCrouched) {
        //comelt

        this.isCrouched = true;
        player.body.y -= 75;

        player.setScale(1, 0.5);
      }
      //player.setDisplaySize(player)
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
      if (this.isCrouched) {
        this.isCrouched = false;
        player.body.y -= 20;
        player.y -= 50;
        player.setScale(1, 1);
      }
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-330);
      player.anims.play("jump");
    }
  }
}
