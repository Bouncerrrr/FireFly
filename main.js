class main extends Phaser.Scene {
	constructor() {
		super('main')
	}

	//Creating the game logic itself
	create() {

		//Variables to keep track of questions and score
		this.score = 0;
		this.question = 0;

		//Setting up the background and frog sprite
		this.background = this.add.tileSprite(0, 0, config.width, config.height, "bg");
        this.background.setOrigin(0, 0);

		this.frog = this.add
			.sprite(180, 700, 'frog')
			.setOrigin(0)
			.setScale(4);
		this.countText = this.add.text(100, 22, '', { fontSize: '64px' }).setOrigin();

		//Setting up arrays of questions and answer. First is always question, second always correct answer, third, fourth and fith - incorrect answers
		this.questions = [
			['what is the color of the sky?', 'TBlue', 'FYellow', 'FGreen', 'Fpurple'],
			['what is the powerhouse of the cell?', 'TMitochondria', 'FNucleus', 'FLisosome', 'FMembrane'],
			['What is the fastest mammal?', 'TCheetah', 'FElephant', 'FTiger', 'FBear'],
		]

		this.speak(this.questions[this.question])

		//Setting up paths for fireflies to take
		this.path1 = this.add.path(0, 100);
		this.path1.lineTo(150, 100);
		this.path1.lineTo(660, 900);

		this.path2 = this.add.path(640, 100);
		this.path2.lineTo(490, 100);
		this.path2.lineTo(-20, 900);

		this.path3 = this.add.path(640, 250);
		this.path3.lineTo(490, 250);
		this.path3.lineTo(150, 250);
		this.path3.lineTo(150, 100);
		this.path3.lineTo(490, 100);
		this.path3.lineTo(490, 250);
		this.path3.lineTo(-20, 1000);

		this.path4 = this.add.path(0, 250);
		this.path4.lineTo(150, 250);
		this.path4.lineTo(490, 250);
		this.path4.lineTo(490, 100);
		this.path4.lineTo(150, 100);
		this.path4.lineTo(150, 250);
		this.path4.lineTo(660, 1000);
	}

	//Animations for frog to speak and question bubble to appear	
	speak(question) {

		this.frog.play('frogTalk');
		const bubble = this.add.sprite(40, 700, 'bubble').setDepth(99).setOrigin(0, 1);
		const text = this.add
			.text(bubble.x + 50, bubble.y - 50, '', {
				color: 'black',
				fontSize: '24px',
			})
			.setDepth(99);

		bubble.visible = text.visible = true;

		let letter = 0;

		this.time.addEvent({

			delay: 20,
			callback: () => {
				text.text += question[0].substring(letter, letter + 1);
				bubble.scaleX = text.width / bubble.width + 3;
				bubble.scaleY = (text.height * 1.3) / bubble.height + 2;
				letter++;

				if (letter % 35 == 0) {

					text.text = text.text.slice(0, letter) + '\n' + text.text.slice(letter);
					text.y -= 32;

				}

				if (letter == question[0].length) {

					this.countDown(bubble, text, question);
					this.frog.play('frogIdle');

				}
			},

			repeat: question[0].length,

		});

	}

	//Countdown for reading the question
	countDown(bubble, text, options) {

		let count = 5;

		this.countText.setPosition(320, 50);

		this.countText.text = '5';
		this.countText.setVisible(true);
		this.time.addEvent({
			delay: 1000,
			callback: () => {
				count--
				this.countText.text = count
				if (count == 0) {

					this.countText.setVisible(false);
					bubble.visible = text.visible = false;
					this.displayAnswers(options);

				}
			},

			repeat: 5,

		});

	}

	//Setting up answers - each random firefly gets a random answer
	displayAnswers(options) {

		for (let i = options.length - 1; i > 0; i--) {

			const j = 1 + Math.floor(Math.random() * i);
			const temp = options[i];
			options[i] = options[j];
			options[j] = temp;

		}

		let redOption = this.add.text(0, 0, options[1].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5);
		let blueOption = this.add.text(0, 0, options[2].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5);
		let greenOption = this.add.text(0, 0, options[3].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5);
		let yellowOption = this.add.text(0, 0, options[4].slice(1), { fontSize: '24px' }).setOrigin(0, 0.5);

		//Each firefly follows its own path
		let ffRed = this.add.follower(this.path1, 0, 100, 'ffRed')
		let ffBlue = this.add.follower(this.path2, 640, 100, 'ffBlue')
		let ffGreen = this.add.follower(this.path3, 640, 250, 'ffGreen')
		let ffYellow = this.add.follower(this.path4, 0, 250, 'ffYellow')

		//Addidng physics to detect collision
		this.physics.add.existing(ffRed);
		this.physics.add.existing(ffYellow);
		this.physics.add.existing(ffGreen);
		this.physics.add.existing(ffBlue);

		ffRed.startFollow(3000);
		ffBlue.startFollow(3000);
		ffGreen.startFollow(5000);
		ffYellow.startFollow(5000);

		//Text follows the firefly on its path as well
		this.time.addEvent({

			delay: 20,
			callback: () => {
				redOption.x = ffRed.x + 35;
				redOption.y = ffRed.y;
				blueOption.x = ffBlue.x + 35;
				blueOption.y = ffBlue.y;
				greenOption.x = ffGreen.x + 35;
				greenOption.y = ffGreen.y;
				yellowOption.x = ffYellow.x + 35;
				yellowOption.y = ffYellow.y;
			},

			loop: true,

		});

		//Firefly stop for a bit so players can read the answers
		this.time.addEvent({

			delay: 500,
			callback: () => {
				ffYellow.pauseFollow();
				ffRed.pauseFollow();
				ffGreen.pauseFollow();
				ffBlue.pauseFollow();
			},

		});

		this.time.addEvent({

			delay: 3500,
			callback: () => {
				ffYellow.resumeFollow();
				ffRed.resumeFollow();
				ffGreen.resumeFollow();
				ffBlue.resumeFollow();
				const net = this.physics.add.sprite(300, 1000, 'net');
				this.time.addEvent({
					delay: 20,
					callback: () => {
						if (net.x > 310) net.flipX = false;
						else net.flipX = true;
					},

					loop: true,

				});

				//Collision with net for each firefly
				//RED
				this.physics.add.overlap(net, ffRed, () => {

					ffRed.visible = redOption.visible = false;
					ffBlue.visible = blueOption.visible = false;
					ffYellow.visible = yellowOption.visible = false;
					ffGreen.visible = greenOption.visible = false;

					netMove.paused = true;

					net.destroy();

					if (options[1].charAt(0) === 'T'){

						this.score += 1;

					}

					if (this.question < this.questions.length - 1){

						this.speak(this.questions[++this.question]);

					}else {

						this.add.text(225, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						});

					}

				});

				//BLUE
				this.physics.add.overlap(net, ffBlue, () => {

					ffRed.visible = redOption.visible = false;
					ffBlue.visible = blueOption.visible = false;
					ffYellow.visible = yellowOption.visible = false;
					ffGreen.visible = greenOption.visible = false;

					netMove.paused = true;
					net.destroy();

					if (options[2].charAt(0) === 'T'){

						this.score += 1;
					
					}

					if (this.question < this.questions.length - 1){

						this.speak(this.questions[++this.question]);
					
					}else {

						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						});

					}

				});

				//GREEN
				this.physics.add.overlap(net, ffGreen, () => {

					ffRed.visible = redOption.visible = false;
					ffBlue.visible = blueOption.visible = false;
					ffYellow.visible = yellowOption.visible = false;
					ffGreen.visible = greenOption.visible = false;

					netMove.paused = true;
					net.destroy();

					if (options[3].charAt(0) === 'T'){
						
						this.score += 1;

					}

					if (this.question < this.questions.length - 1){ 

						this.speak(this.questions[++this.question]);

					}else {

						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						});
					
					}
				});

				//YELLOW
				this.physics.add.overlap(net, ffYellow, () => {

					ffRed.visible = redOption.visible = false;
					ffBlue.visible = blueOption.visible = false;
					ffYellow.visible = yellowOption.visible = false;
					ffGreen.visible = greenOption.visible = false;

					netMove.paused = true;
					net.destroy();

					if (options[4].charAt(0) === 'T'){

						this.score += 1;

					}

					if (this.question < this.questions.length - 1){
						
						this.speak(this.questions[++this.question]);
					
					}else {

						this.add.text(200, 564, 'SCORE: ' + this.score, {
							fontSize: '32px',
						});

					}

				});

				//Net being dragged by the mouse cursor
				const netMove = this.time.addEvent({

					delay: 50,
					callback: () => {
						net.x = game.input.mousePointer.x;
						net.y = game.input.mousePointer.y;
					},

					loop: true,
					
				});

			},

		});

	}

}
