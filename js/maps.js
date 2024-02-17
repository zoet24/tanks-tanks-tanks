// maps.js
const barriers = [
  { x: 150, y: 100, width: 200, height: 20 },
  { x: 300, y: 300, width: 20, height: 200 },
  // Add more barriers as needed
];

function drawBarriers(ctx) {
  barriers.forEach((barrier) => {
    ctx.fillStyle = "gray"; // Or any color you prefer for barriers
    ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
  });
}
