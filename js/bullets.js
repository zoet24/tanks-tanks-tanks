// bullets.js
let bullets = []; // Holds all active bullets

function createBullet(tank) {
  // Check if the number of active bullets is less than 5
  const tankBullets = bullets.filter((bullet) => bullet.tankId === tank.id);
  if (tankBullets.length < 5) {
    const radians = ((tank.direction - 90) * Math.PI) / 180;
    const bulletSpeed = 5; // Speed of the bullets
    const bulletRadius = 5;
    bullets.push({
      tankId: tank.id,
      x: tank.x + Math.cos(radians) * (tank.gunLength * 2 - bulletRadius), // Start at gun tip
      y: tank.y + Math.sin(radians) * (tank.gunLength * 2 - bulletRadius),
      radius: bulletRadius,
      speed: bulletSpeed,
      direction: tank.direction,
      vx: Math.cos(radians) * bulletSpeed, // Velocity in X
      vy: Math.sin(radians) * bulletSpeed, // Velocity in Y
      lifespan: 10 * 1000, // Lifespan in milliseconds (10 seconds)
      createdAt: Date.now(), // Timestamp when bullet is created
      update: function (canvas) {
        // Check for collision with canvas boundaries and update lifespan
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
          this.vx *= -1; // Reverse velocity in X direction
        }
        if (
          this.y - this.radius <= 0 ||
          this.y + this.radius >= canvas.height
        ) {
          this.vy *= -1; // Reverse velocity in Y direction
        }

        // Update position based on velocity
        this.x += this.vx;
        this.y += this.vy;

        // Update lifespan
        if (Date.now() - this.createdAt >= this.lifespan) {
          // Mark bullet for removal
          this.remove = true;
        }
      },
      draw: function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      },
    });
  }
}

function updateAndDrawBullets(ctx, canvas) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.update(canvas); // Remember to pass the canvas for boundary checks
    bullet.draw(ctx);
    // Remove the bullet if its lifespan has ended or it needs to be removed for other reasons
    if (bullet.remove) {
      bullets.splice(i, 1);
    }
  }
}
