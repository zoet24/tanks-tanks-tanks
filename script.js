document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Tank properties
  let tank = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    bodyRadius: 20,
    gunWidth: 10,
    gunLength: 30,
    bodyColor: "blue",
    gunColor: "red",
    direction: 0, // Direction in degrees
    speed: 1, // Movement speed
  };

  let moveForward = false;
  let moveBackward = false;
  let rotateLeft = false;
  let rotateRight = false;

  function drawTank() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the tank body
    ctx.beginPath();
    ctx.arc(tank.x, tank.y, tank.bodyRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = tank.bodyColor;
    ctx.fill();
    ctx.closePath();

    // Draw the tank gun, adjusted to point based on direction
    ctx.save(); // Save the current context state
    ctx.translate(tank.x, tank.y); // Move to the tank's position
    ctx.rotate((tank.direction * Math.PI) / 180); // Convert direction to radians and rotate
    ctx.beginPath();
    ctx.rect(
      -tank.gunWidth / 2,
      -tank.bodyRadius,
      tank.gunWidth,
      -tank.gunLength
    );
    ctx.fillStyle = tank.gunColor;
    ctx.fill();
    ctx.closePath();
    ctx.restore(); // Restore the context state
  }

  function updateTankMovement() {
    var radians = ((tank.direction - 90) * Math.PI) / 180;

    if (moveForward) {
      tank.x += tank.speed * Math.cos(radians);
      tank.y += tank.speed * Math.sin(radians);
    }

    if (moveBackward) {
      tank.x -= tank.speed * Math.cos(radians); // Move in the opposite direction
      tank.y -= tank.speed * Math.sin(radians);
    }

    // Keep the tank within the canvas boundaries
    tank.x = Math.max(
      tank.bodyRadius,
      Math.min(canvas.width - tank.bodyRadius, tank.x)
    );
    tank.y = Math.max(
      tank.bodyRadius,
      Math.min(canvas.height - tank.bodyRadius, tank.y)
    );
  }

  function updateTankRotation() {
    const rotateSpeed = 2; // Adjust rotation speed as needed for smoother rotation
    if (rotateLeft) {
      tank.direction -= rotateSpeed;
    }
    if (rotateRight) {
      tank.direction += rotateSpeed;
    }
    tank.direction %= 360;
  }

  function gameLoop() {
    updateTankMovement();
    updateTankRotation(); // Update the tank's rotation based on flags
    drawTank();
    requestAnimationFrame(gameLoop); // Keep the loop going
  }

  // Keyboard control for rotation, forward, and backward movement
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      rotateLeft = true;
    } else if (e.key === "ArrowRight") {
      rotateRight = true;
    } else if (e.key === "ArrowUp") {
      moveForward = true;
    } else if (e.key === "ArrowDown") {
      moveBackward = true; // Start moving backward
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft") {
      rotateLeft = false;
    } else if (e.key === "ArrowRight") {
      rotateRight = false;
    } else if (e.key === "ArrowUp") {
      moveForward = false;
    } else if (e.key === "ArrowDown") {
      moveBackward = false; // Stop moving backward
    }
  });

  requestAnimationFrame(gameLoop);
});
