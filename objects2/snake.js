class Snake {
	constructor() {
		this.translate;
		this.action = 'none';
		this.slitherSpeed;
	}

	update() {
		if (this.action === 'none') {
			this.translate.x = Math.floor(4 * Math.sin(timer)) + 50;
			if (collision(player, this, 10, 3)) {
				this.action = 'pulling';
			}
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x, this.translate.y - 1);
		} else if (this.action === 'pulling') {
			this.translate.x = player.facingRight ? player.translate.x : player.translate.x - 8;
			this.translate.y = player.translate.y - 4;
			var wobble = Math.abs(frame%4 - 2) * 2;
			nok.line(
				player.facingRight?player.translate.x+5:player.translate.x, 
				player.translate.y - 4, 
				player.facingRight?player.translate.x+17:player.translate.x-10, 
				player.translate.y - 12 + wobble);
		} else if (this.action === 'holstered') {
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], player.translate.x - 5, player.translate.y - 5);
			this.slitherSpeed = 2;
			if (nok.key.six) {
				this.action = 'striking';
				this.slitherSpeed = 10;
			}
		} else if (this.action === 'striking') {
			console.log(player.facingRight ? 5 : -5);
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], player.translate.x + (player.facingRight ? 5 : -14), player.translate.y - 5);
			if (!nok.key.six) {
				this.action = 'holstered';
			}
		}
	}
}