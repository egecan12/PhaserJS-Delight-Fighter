class Scene3 extends Phaser.Scene {
  gameOverText = {};
  winnerText = {};

  constructor() {
    super({
      key: "episode2",
      active: false,
    });
  }
  preload() {
    this.load.image("level2_background", "public/assets/level2.png");
    this.load.image("wave1", "public/assets/wave1.png");
    this.load.image("wave2", "public/assets/wave2.png");
    this.load.image("wave3", "public/assets/wave3.png");
    this.load.image("clouds", "public/assets/clouds.png");

    this.load.image("ship_buttom", "public/assets/ship_buttom.png");
    this.load.image("ship_top", "public/assets/ship_top.png");

    this.load.spritesheet("dude", "public/assets/dude2.png", {
      frameWidth: 50,
      frameHeight: 110,
    });
    this.load.spritesheet("punch", "public/assets/punch.png", {
      frameWidth: 75,
      frameHeight: 110,
    });
    this.load.spritesheet("jump", "public/assets/dude2.png", {
      frameWidth: 45,
      frameHeight: 110,
    });
    this.load.spritesheet("dudeLeft", "public/assets/dudeLeft.png", {
      frameWidth: 55,
      frameHeight: 110,
    });
    this.load.image("star", "public/assets/delight.png");
    this.load.image("bullet", "public/assets/bullet.png");
    this.load.spritesheet("bird", "public/assets/bird3.png", {
      frameWidth: 110,
      frameHeight: 100,
    });
    this.load.spritesheet(
      "bird_explosion",
      "public/assets/bird_explosion3.png",
      {
        frameWidth: 90,
        frameHeight: 100,
      }
    );
  }

  create() {
    var Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet");
        this.speed = Phaser.Math.GetSpeed(400, 1);
        this.outOfBoundsKill = true;
      },
      fire: function (x, y) {
        this.setPosition(x, y - 70);
        this.setActive(true);
        this.setVisible(true);
      },
      update: function (time, delta) {
        this.x += this.speed * delta;
        if (this.y < -50) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.background = this.add.tileSprite(
      400,
      300,
      config.width,
      config.height,
      "level2_background"
    );
    this.wave1 = this.add.tileSprite(
      500,
      715,
      config.width,
      config.height,
      "wave1"
    );
    this.wave2 = this.add.tileSprite(
      500,
      745,
      config.width,
      config.height,
      "wave2"
    );
    this.wave3 = this.add.tileSprite(
      500,
      775,
      config.width,
      config.height,
      "wave3"
    );
    this.clouds = this.add.tileSprite(
      400,
      -100,
      config.width,
      config.height,
      "clouds"
    );

    this.gameOverText = this.add.text(-50, -50, "GameOver", {
      font: "2pc Impact",
      fill: "#ffff00",
      zindex: 2,
    });
    this.winnerText = this.add.text(-50, -50, "Mission Completed !", {
      font: "2pc Impact",
      fill: "#ffff00",
      zindex: 2,
    });

    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#ffff00",
    });

    birds = this.physics.add.group();

    //create all the birds here

    this.bird = birds.create(800, 100, "bird").setScale(1);
    this.bird2 = birds.create(900, 300, "bird").setScale(0.5);
    this.bird3 = birds.create(400, 500, "bird").setScale(1);
    this.bird4 = birds.create(760, 178, "bird").setScale(0.8);
    this.bird5 = birds.create(400, 200, "bird").setScale(0.7);
    this.bird6 = birds.create(780, 300, "bird").setScale(0.6);
    this.bird7 = birds.create(670, 140, "bird").setScale(0.5);

    this.bird.setBounce(1);
    this.bird.setCollideWorldBounds(true);
    this.bird.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird.allowGravity = false;
    //
    this.bird2.setBounce(1);
    this.bird2.setCollideWorldBounds(true);
    this.bird2.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird2.allowGravity = false;
    //
    this.bird3.setBounce(1);
    this.bird3.setCollideWorldBounds(true);
    this.bird3.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird3.allowGravity = false;
    //
    this.bird4.setBounce(1);
    this.bird4.setCollideWorldBounds(true);
    this.bird4.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird4.allowGravity = false;

    //
    this.bird5.setBounce(1);
    this.bird5.setCollideWorldBounds(true);
    this.bird5.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird5.allowGravity = false;
    //
    this.bird6.setBounce(1);
    this.bird6.setCollideWorldBounds(true);
    this.bird6.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird6.allowGravity = false;
    //
    this.bird7.setBounce(1);
    this.bird7.setCollideWorldBounds(true);
    this.bird7.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.bird7.allowGravity = false;

    //- create all the birds finish here

    platforms = this.physics.add.staticGroup();
    var boat = this.add.image(200, 345, "ship_top");
    platforms.create(200, 500, "ship_buttom");

    // The player and its settings
    player = this.physics.add.sprite(10, 150, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(30, 100, 0, 100);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dudeLeft", {
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "dude",
          frame: 4,
        },
      ],
      frameRate: 10,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [
        {
          key: "jump",
          frame: 3,
        },
      ],
      frameRate: 24,
    });
    this.anims.create({
      key: "down",
      frames: [
        {
          key: "dude",
          frame: 0,
        },
      ],
      frameRate: 24,
    });
    this.anims.create({
      key: "punching",
      frames: [
        {
          key: "punch",
          frame: 2,
        },
      ],
      frameRate: 10,
    });
    this.anims.create({
      key: "wing",
      frames: this.anims.generateFrameNumbers("bird", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("bird_explosion", {
        start: 0,
        end: 3,
      }),
      frameRate: 22,
      repeat: 0,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //
    stars = this.physics.add.group({
      classType: Bullet,
      key: "stars",
      maxSize: 10000000000000,
      runChildUpdate: true,
    });
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, birds, hitBird, null, this);
    this.physics.add.collider(stars, birds, killBird, null, this);
    this.physics.add.collider(birds, platforms);

    this.bird.anims.play("wing", true);
    this.bird2.anims.play("wing", true);
    this.bird3.anims.play("wing", true);
    this.bird4.anims.play("wing", true);
    this.bird5.anims.play("wing", true);
    this.bird6.anims.play("wing", true);
    this.bird7.anims.play("wing", true);
  }

  update(time, delta) {
    this.background.tilePositionX -= 2;
    this.wave1.tilePositionX -= 2;
    this.wave2.tilePositionX += 1;
    this.wave3.tilePositionX -= 2;
    this.clouds.tilePositionX -= 0.7;
    player.body.enable = true;
    player.body.setSize(30, 100, 0, 100);

    if (gameOver) {
      this.background.tilePositionX = 0;
      this.gameOverText.x = 100;
      this.gameOverText.y = 100;
      //that makes the form unvisible
      document.getElementById("wrapper").removeAttribute("hidden");
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else if (cursors.down.isDown) {
      player.anims.play("down");
      player.body.enable = false;
    } else if (spacebar.isDown && time > lastFired) {
      var bullet = stars.get();

      if (bullet) {
        bullet.fire(player.x + 40, player.y);
        player.anims.play("punching");

        lastFired = time + 150; // the sequence speed of the bullets
      }
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-330);
      player.anims.play("jump");
    }

    if (death_kill_count >= 5 && totalOfBirdsRespawn < 20) {
      return (
        (this.birdHuge = birds.create(700, 80, "bird").setScale(1)),
        (totalOfBirdsRespawn = totalOfBirdsRespawn + 1),
        this.birdHuge.setBounce(1),
        this.birdHuge.body.setSize(85, 85, 50, 25),
        this.birdHuge.setCollideWorldBounds(true),
        this.birdHuge.setVelocity(Phaser.Math.Between(-200, 200), 20),
        (this.birdHuge.allowGravity = true),
        this.birdHuge.anims.play("wing", true)
      );
    }

    if (totalOfBirdsRespawn == 0) {
      this.background.tilePositionX = 0;
      this.winnerText.x = 100;
      this.winnerText.y = 100;
      //that makes the form unvisible
      document.getElementById("wrapper").removeAttribute("hidden");
      return;
    }
  }
}
