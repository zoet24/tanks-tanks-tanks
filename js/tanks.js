// Tank object with properties and methods
class Tank {
  constructor(id, x, y, bodyColor, gunColor, controls) {
    this.id = id;
    this.x = x;
    this.y = y;
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
    this.controls = controls; // Object containing control keys
    this.moveForward = false;
    this.moveBackward = false;
    this.rotateLeft = false;
    this.rotateRight = false;
  }

  initialize(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
  }

  draw(ctx) {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    // Change appearance if the tank is not alive
    const fillColor = this.alive ? this.bodyColor : "white";
    const strokeColor = this.alive ? "none" : "black";

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
        -this.gunLength
      );
      ctx.fillStyle = this.gunColor;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  updateMovement(ctx) {
    var radians = ((this.direction - 90) * Math.PI) / 180;
    var nextX = this.x + this.speed * Math.cos(radians);
    var nextY = this.y + this.speed * Math.sin(radians);

    // Check for barrier collisions
    if (
      !checkCollisionWithBarriers({
        x: nextX,
        y: nextY,
        width: this.bodyRadius * 2,
        height: this.bodyRadius * 2,
      })
    ) {
      // Only move if there's no collision
      this.x = nextX;
      this.y = nextY;
    }

    if (this.moveForward) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed; // Cap the speed at the maxSpeed
      }
    } else if (this.moveBackward) {
      this.speed -= this.acceleration;
      if (this.speed < -this.maxSpeed) {
        this.speed = -this.maxSpeed; // Cap the reverse speed
      }
    } else {
      // Decelerate to stop
      if (this.speed > 0) {
        this.speed -= this.deceleration;
        if (this.speed < 0) this.speed = 0; // Avoid speed going negative due to deceleration
      } else if (this.speed < 0) {
        this.speed += this.deceleration;
        if (this.speed > 0) this.speed = 0; // Avoid speed going positive due to deceleration
      }
    }

    // Update position based on speed
    this.x += this.speed * Math.cos(radians);
    this.y += this.speed * Math.sin(radians);

    // Keep the tank within the canvas boundaries
    this.x = Math.max(
      this.bodyRadius,
      Math.min(ctx.canvas.width - this.bodyRadius, this.x)
    );
    this.y = Math.max(
      this.bodyRadius,
      Math.min(ctx.canvas.height - this.bodyRadius, this.y)
    );
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
