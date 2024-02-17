// Define canvas and ctx in a broader scope
let canvas, ctx;
let tanks = []; // Assuming tanks are initialized elsewhere or you'll initialize them here

document.addEventListener("DOMContentLoaded", function () {
  // Initialize canvas and ctx once the DOM is fully loaded
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  const controls1 = {
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    shoot: "Space",
  };
  const controls2 = {
    left: "KeyA",
    up: "KeyW",
    right: "KeyD",
    down: "KeyS",
    shoot: "KeyQ",
  };
  tanks.push(new Tank(1, 100, 100, "blue", "red", controls1));
  tanks.push(new Tank(2, 400, 100, "red", "blue", controls2));

  // Setup event listeners
  setupKeyboardListeners(); // Make sure this is properly handling multiple tanks

  // Start the game loop
  requestAnimationFrame(gameLoop);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas here

  tanks.forEach((tank) => {
    if (tank.alive) {
      tank.updateMovement(ctx);
      tank.updateRotation();
    }
    tank.draw(ctx);
  });

  // Update and draw bullets, handle collisions, etc.
  updateAndDrawBullets(ctx, canvas);
  checkBulletTankCollisions(); // Ensure this function is updated to handle multiple tanks

  requestAnimationFrame(gameLoop);
}
