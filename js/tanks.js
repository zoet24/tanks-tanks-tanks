// Tank object with properties and methods
class Tank {
	constructor(
		id,
		bodyColor,
		gunColor,
		controls,
		canvasWidth,
		canvasHeight,
		barriers,
	) {
		this.id = id;
		this.bodyRadius = 20;
		this.gunWidth = 10;
		this.gunLength = 30;
		this.bodyColor = bodyColor;
		this.gunColor = gunColor;
		this.direction = 0;
		this.speed = 0;
		this.maxSpeed = 5;
		this.acceleration = 0.1;
		this.deceleration = 0.05;
		this.alive = true;
		this.controls = controls;

		this.setValidStartPosition(canvasWidth, canvasHeight, barriers);

		this.moveForward = false;
		this.moveBackward = false;
		this.rotateLeft = false;
		this.rotateRight = false;
	}

	setValidStartPosition(canvasWidth, canvasHeight, barriers) {
		const stepSize = 100; // Use the same step size as for barriers
		let positionFound = false;

		while (!positionFound) {
			let x = Math.floor(Math.random() * (canvasWidth / stepSize)) * stepSize;
			let y = Math.floor(Math.random() * (canvasHeight / stepSize)) * stepSize;

			if (!isPositionOnBarrier(x, y, barriers, this.bodyRadius)) {
				this.x = x;
				this.y = y;
				positionFound = true;
			}
		}
	}

	initialize(canvasWidth, canvasHeight) {
		this.x = canvasWidth / 2;
		this.y = canvasHeight / 2;
	}

	draw(ctx) {
		// Change appearance if the tank is not alive
		const fillColor = this.alive ? this.bodyColor : 'white';
		const strokeColor = this.alive ? 'none' : 'black';

		// Draw the tank body
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.bodyRadius, 0, Math.PI * 2, false);
		ctx.fillStyle = fillColor;
		ctx.fill();
		if (!this.alive) {
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = 2;
			ctx.stroke();
		}
		ctx.closePath();

		// Proceed to draw the gun if the tank is alive
		if (this.alive) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate((this.direction * Math.PI) / 180);
			ctx.beginPath();
			ctx.rect(
				-this.gunWidth / 2,
				-this.bodyRadius,
				this.gunWidth,
				-this.gunLength,
			);
			ctx.fillStyle = this.gunColor;
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
	}

	updateMovement(ctx) {
		if (!this.alive) return; // Do not update movement if the tank is not alive

		var radians = ((this.direction - 90) * Math.PI) / 180;
		var potentialSpeed = this.speed; // Temporarily hold the potential speed change

		// Calculate potential speed change
		if (this.moveForward) {
			potentialSpeed += this.acceleration;
		} else if (this.moveBackward) {
			potentialSpeed -= this.acceleration;
		} else {
			// Apply deceleration to stop
			if (this.speed > 0) {
				potentialSpeed -= this.deceleration;
			} else if (this.speed < 0) {
				potentialSpeed += this.deceleration;
			}
		}

		// Cap the speed to maxSpeed limits
		potentialSpeed = Math.max(
			-this.maxSpeed,
			Math.min(this.maxSpeed, potentialSpeed),
		);

		// Calculate next position based on potential speed
		var nextX = this.x + potentialSpeed * Math.cos(radians);
		var nextY = this.y + potentialSpeed * Math.sin(radians);

		// Check for barrier collisions with the next position
		if (
			!checkCollisionWithBarriers({
				x: nextX - this.bodyRadius, // Adjusted for center to edge
				y: nextY - this.bodyRadius, // Adjusted for center to edge
				width: this.bodyRadius * 2,
				height: this.bodyRadius * 2,
			}) &&
			isWithinCanvasBounds(
				nextX,
				nextY,
				ctx.canvas.width,
				ctx.canvas.height,
				this.bodyRadius,
			)
		) {
			// Only update position and speed if there's no collision and within canvas bounds
			this.x = nextX;
			this.y = nextY;
			this.speed = potentialSpeed; // Only now apply the speed change
		} else {
			// Optionally, reset speed to 0 or a fraction thereof to simulate a "bounce" effect
			this.speed = 0;
		}

		// Normalize the direction
		this.direction %= 360;
	}

	updateRotation() {
		const rotateSpeed = 2; // Adjust rotation speed as needed for smoother rotation
		if (this.rotateLeft) {
			this.direction -= rotateSpeed;
		}
		if (this.rotateRight) {
			this.direction += rotateSpeed;
		}
		this.direction %= 360;
	}
}
