let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;
let spacebar;

let bullets;
let speed;
let stats;
let lastFired = 0;
let birds;
let formisvisible = false;
let result = [];
let death_kill_count = 0;
let totalOfBirdsRespawn = 7;

function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);
  document.getElementById("myField").value = score;

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(700, 800)
        : Phaser.Math.Between(0, 1);

    var bomb = bombs.create(x, 1, "bomb").setScale(1.3);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("jump");

  gameOver = true;

  this.background.tilePositionX = 0;
}

function hitBird(player, bird) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("jump");

  gameOver = true;
}
//star is the variable for the deligts
function killBird(stars, birds) {
  score += 10;
  scoreText.setText("Score: " + score);
  document.getElementById("myField").value = score;

  totalOfBirdsRespawn = totalOfBirdsRespawn - 1;

  stars.body.destroy();
  stars.visible = false;
  death_kill_count = death_kill_count + 1;

  birds.anims.play("explosion");
  console.log(death_kill_count);
  console.log(totalOfBirdsRespawn);

  birds.once("animationcomplete", () => {
    birds.disableBody(true, true);
  });
}
