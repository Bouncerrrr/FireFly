class preloader extends Phaser.Scene {
	constructor() {
		super('boot')
	}

	//Loading up the assets
	preload() {
		this.load.image('bg', 'assets/background.png');
		this.load.image('ffBlue', 'assets/firefly_blue.png');
		this.load.image('ffGreen', 'assets/firefly_green.png');
		this.load.image('ffRed', 'assets/firefly_red.png');
		this.load.image('ffYellow', 'assets/firefly_yellow.png');
		this.load.image('net', 'assets/net.png');
		this.load.image('bubble', 'assets/bubble.png');
		this.load.image('playBut', 'assets/playBut.png');
		this.load.atlas('frog', 'assets/frog.png', 'assets/frog.json');
	}

	//Creating animations using frog.json as a guide - which frame corresponds which pixel set
	create() {
		this.anims.create({
			key: 'frogIdle',
			frameRate: 0,
			frames: [{ key: 'frog', repeat: '1' }],
			repeat: 0,
		})
		this.anims.create({
			key: 'frogTalk',
			frameRate: 8,
			frames: [
				{ key: 'frog', frame: '1' },
				{ key: 'frog', frame: '2' },
			],
			repeat: -1,
		})
		this.scene.start('menu');
	}
}
