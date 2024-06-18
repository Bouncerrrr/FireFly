class menu extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	//Creating the menu screen with title, rules and play button
	create() {

		this.background = this.add.tileSprite(0, 0, config.width, config.height, "bg");
        this.background.setOrigin(0, 0);

		const titleText = this.add.text(config.width / 2, 50, "Fireflies", {

			fontSize: "50px",
			fontStyle: "bold",
			color: "#ffffff",

		  });

		  titleText.setOrigin(0.5);

		  const rulesText = this.add.text(
			config.width / 2,
			200,
			"Rules of the Game:\n\nCatch the fireflies that \nhave the correct answer.",
			{
			  fontSize: "30px",
			  color: "#ffffff",
			  align: "center",
			}
		  );
		  rulesText.setOrigin(0.5);

		this.playBut = this.add
			.sprite(260, 460, 'playBut')
			.setScale(8)
			.setOrigin(0)
			.setInteractive()
		this.playBut.on('pointerdown', () => {
			this.scene.start('main')
		});

	}
	
}
