class Scene1 extends Phaser.Scene {
	flag = true;
	flag2 = true;
	menuText = {};
	menuText2 = {};
	menuText3 = {};
	menuText4 = {};

	constructor() {
		super({ key: 'Scene1', active: false });
	}

	create() {
		this.background = this.add.tileSprite(400, 300, config.width, config.height, 'sky2');
		var music = this.sound.add('background_music');
		music.setLoop(true);
		music.play();

		this.menuText = this.add.text(225, 300, 'Press any key to continue...', {
			font: '2pc Impact',
			fill: '#ffff00'
		});
		this.menuText2 = this.add.text(225, 500, 'Developed By Egecan Kahyaoglu & Brady Ward', {
			font: '1pc Impact',
			fill: '#ffff00'
		});
		this.menuText3 = this.add.text(225, 300, 'Press any key to continue...', {
			font: '2pc Impact',
			fill: '#ffff00'
		});
		this.menuText4 = this.add.text(100, 100, 'The Delights of Constantinople', {
			font: '3pc Impact',
			fill: '#ffff00'
		});
		this.input.keyboard.on('keydown', (event) => {
			this.scene.start('Scene2');
		});
		player = this.add.sprite(100, 450, 'dude5').setScale(2.7);
		this.anims.create({
			key: 'main_anim',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 8 }),
			frameRate: 4,
			repeat: -1
		});
	}

	preload() {
		this.load.image('sky2', 'assets/bg2.png');
		this.load.spritesheet('dude', 'assets/dude2.png', { frameWidth: 60, frameHeight: 110 });
		this.load.audio('background_music', 'assets/q.mp3');
	}

	update() {
		this.background.tilePositionX += 0.5;

		if (this.flag) {
			player.anims.play('main_anim');
			this.flag = false;
		}

		if (this.flag2) {
			this.flag2 = false;
			setTimeout(() => {
				if (this.menuText.style.color == '#ffffff') {
					this.menuText.setTint('#000000');
					this.menuText.style.color = '#000000';
				} else {
					this.menuText.clearTint();
					this.menuText.style.color = '#ffffff';
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
