function checkBulletTankCollisions() {
  bullets.forEach((bullet, bulletIndex) => {
    tanks.forEach((tank, tankIndex) => {
      // Skip the collision check if the tank is already "dead"
      if (!tank.alive) return;

      const dx = bullet.x - tank.x;
      const dy = bullet.y - tank.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check collision
      if (distance < bullet.radius + tank.bodyRadius) {
        // Mark the tank as "dead"
        tank.alive = false;
        // Optionally, remove the bullet upon collision
        bullet.remove = true;
      }
    });
  });

  // Remove bullets marked for removal
  bullets = bullets.filter((bullet) => !bullet.remove);
}
