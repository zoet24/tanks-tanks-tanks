document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  tank.initialize(canvas.width, canvas.height);

  function gameLoop() {
    tank.updateMovement(ctx);
    tank.updateRotation();
    tank.draw(ctx);
    requestAnimationFrame(gameLoop); // Keep the loop going
  }

  // Keyboard control for rotation, forward, and backward movement
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        tank.rotateLeft = true;
        break;
      case "ArrowRight":
        tank.rotateRight = true;
        break;
      case "ArrowUp":
        tank.moveForward = true;
        break;
      case "ArrowDown":
        tank.moveBackward = true;
        break;
      // Add spacebar key handler here for firing bullets
    }
  });

  document.addEventListener("keyup", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        tank.rotateLeft = false;
        break;
      case "ArrowRight":
        tank.rotateRight = false;
        break;
      case "ArrowUp":
        tank.moveForward = false;
        break;
      case "ArrowDown":
        tank.moveBackward = false;
        break;
      // Handle stopping bullet fire if needed
    }
  });

  requestAnimationFrame(gameLoop);
});
