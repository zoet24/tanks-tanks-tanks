document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Tank properties
  const tank = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    bodyRadius: 20,
    gunWidth: 10,
    gunLength: 35, // Renamed for clarity
    bodyColor: "blue",
    gunColor: "red",
  };

  // Function to draw the tank body
  function drawTankBody() {
    ctx.beginPath();
    ctx.arc(tank.x, tank.y, tank.bodyRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = tank.bodyColor;
    ctx.fill();
    ctx.closePath();
  }

  // Function to draw the tank gun
  function drawTankGun() {
    ctx.beginPath();
    // Adjusting the gun to start from the center of the tank
    // This will draw the gun such that it extends upwards from the center of the tank
    ctx.rect(tank.x - tank.gunWidth / 2, tank.y, tank.gunWidth, tank.gunLength);
    ctx.fillStyle = tank.gunColor;
    ctx.fill();
    ctx.closePath();
  }

  // Function to draw the entire tank
  function drawTank() {
    drawTankGun();
    drawTankBody();
  }

  // Initial draw
  drawTank();
});
