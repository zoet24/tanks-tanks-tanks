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

function checkCollisionWithBarriers(rect) {
  return barriers.some((barrier) => {
    return (
      rect.x < barrier.x + barrier.width &&
      rect.x + rect.width > barrier.x &&
      rect.y < barrier.y + barrier.height &&
      rect.y + rect.height > barrier.y
    );
  });
}

function bulletCollidesWithBarrier(bullet) {
  for (let barrier of barriers) {
    const distX = Math.abs(bullet.x - barrier.x - barrier.width / 2);
    const distY = Math.abs(bullet.y - barrier.y - barrier.height / 2);

    if (
      distX > barrier.width / 2 + bullet.radius ||
      distY > barrier.height / 2 + bullet.radius
    ) {
      continue; // No collision
    }

    if (distX <= barrier.width / 2 || distY <= barrier.height / 2) {
      // Determine if the collision is more horizontal or vertical
      if (distX > distY) {
        return { collided: true, horizontal: true };
      } else {
        return { collided: true, horizontal: false };
      }
    }

    // Check corner collisions
    const dx = distX - barrier.width / 2;
    const dy = distY - barrier.height / 2;
    if (dx * dx + dy * dy <= bullet.radius * bullet.radius) {
      return { collided: true, horizontal: distX > distY };
    }
  }
  return { collided: false }; // No collision occurred
}
