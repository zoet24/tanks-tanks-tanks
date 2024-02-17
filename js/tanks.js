// Tank object with properties and methods
const tank = {
  x: 0,
  y: 0,
  bodyRadius: 20,
  gunWidth: 10,
  gunLength: 30,
  bodyColor: "blue",
  gunColor: "red",
  direction: 0,
  speed: 0,
  maxSpeed: 5,
  acceleration: 0.1,
  deceleration: 0.05,
  moveForward: false,
  moveBackward: false,
  rotateLeft: false,
  rotateRight: false,

  initialize: function (canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
  },

  draw: function (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    // Draw the tank body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.bodyRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.bodyColor;
    ctx.fill();
    ctx.closePath();

    // Draw the tank gun, adjusted to point based on direction
    ctx.save(); // Save the current context state
    ctx.translate(this.x, this.y); // Move to the tank's position
    ctx.rotate((this.direction * Math.PI) / 180); // Convert direction to radians and rotate
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
    ctx.restore(); // Restore the context state
  },

  updateMovement: function (ctx) {
    var radians = ((this.direction - 90) * Math.PI) / 180;

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
  },

  updateRotation: function () {
    const rotateSpeed = 2; // Adjust rotation speed as needed for smoother rotation
    if (this.rotateLeft) {
      this.direction -= rotateSpeed;
    }
    if (this.rotateRight) {
      this.direction += rotateSpeed;
    }
    this.direction %= 360;
  },
};
