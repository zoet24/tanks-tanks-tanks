function checkBulletTankCollisions() {
  bullets.forEach((bullet, index) => {
    const dx = bullet.x - tank.x;
    const dy = bullet.y - tank.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bullet.radius + tank.bodyRadius) {
      tank.alive = false;
      bullet.remove = true;
    }
  });
}
