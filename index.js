
var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 960,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: { debug: false },
	},
	scene: [preloader, menu, main],
	pixelArt: true,
}

var game = new Phaser.Game(config)
