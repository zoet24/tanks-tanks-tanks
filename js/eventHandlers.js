function setupKeyboardListeners() {
  document.addEventListener("keydown", function (e) {
    tanks.forEach((tank) => {
      if (!tank.alive) return; // Skip if the tank is not alive

      if (e.code === tank.controls.left) tank.rotateLeft = true;
      if (e.code === tank.controls.up) tank.moveForward = true;
      if (e.code === tank.controls.right) tank.rotateRight = true;
      if (e.code === tank.controls.down) tank.moveBackward = true;
      if (e.code === tank.controls.shoot) {
        createBullet(tank);
      }
    });
  });

  document.addEventListener("keyup", function (e) {
    tanks.forEach((tank) => {
      if (e.code === tank.controls.left) tank.rotateLeft = false;
      if (e.code === tank.controls.up) tank.moveForward = false;
      if (e.code === tank.controls.right) tank.rotateRight = false;
      if (e.code === tank.controls.down) tank.moveBackward = false;
    });
  });
}
