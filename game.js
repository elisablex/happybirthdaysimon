class BirthdayHuntGame extends Phaser.Scene {
    constructor() {
        super({ key: "BirthdayHuntGame" });
    }

    preload() {
        this.load.image("background", "https://elisablex.github.io/happybirthdaysimon/44780.jpg"); // Image designed by brgfx / Freepik
        this.load.image("target", "https://elisablex.github.io/happybirthdaysimon/83b0cb79-b6c9-4ff9-b73b-35cf390a639f.jpg");
        this.load.image("crosshair", "https://elisablex.github.io/happybirthdaysimon/cb2251db-559f-4336-96fc-237928bd6bc0.jpg");
    }

    create() {
        let bg = this.add.image(400, 300, "background");
        bg.setDisplaySize(800, 600); 
        this.crosshair = this.add.image(400, 300, "crosshair").setScale(0.2);
        this.input.setDefaultCursor("none");
        
        this.targets = this.physics.add.group();
        this.spawnTarget();
        
        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "32px", fill: "#fff" });
        this.timerText = this.add.text(650, 10, "Time: 30", { fontSize: "32px", fill: "#fff" });
        
        this.timeLeft = 30;
        this.timer = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
        
        this.input.on("pointerdown", this.shoot, this);
    }

    update() {
        this.crosshair.x = this.input.x;
        this.crosshair.y = this.input.y;
    }

    spawnTarget() {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        let target = this.targets.create(x, y, "target").setScale(0.1);
        target.setInteractive();
    }

    shoot(pointer) {
        let hitTarget = this.targets.getChildren().find(target => target.getBounds().contains(pointer.x, pointer.y));
        if (hitTarget) {
            hitTarget.destroy();
            this.spawnTarget();
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText("Time: " + this.timeLeft);
        if (this.timeLeft <= 0) {
            this.timer.remove();
            this.gameOver();
        }
    }

    gameOver() {
        this.add.text(300, 250, "Game Over!", { fontSize: "48px", fill: "#ff0" });
        this.add.text(300, 300, "Final Score: " + this.score, { fontSize: "32px", fill: "#fff" });
        this.targets.clear(true, true);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: BirthdayHuntGame,
    physics: { default: "arcade" }
};

new Phaser.Game(config);
