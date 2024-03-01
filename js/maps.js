// maps.js
const barriers = [
	{ x: 150, y: 100, width: 200, height: 20 },
	{ x: 300, y: 300, width: 20, height: 200 },
	// Add more barriers as needed
];

// function generateRandomBarriers(canvasWidth, canvasHeight, numBarriers) {
// 	const barriers = [];
// 	const minBarrierWidth = 50;
// 	const maxBarrierWidth = 150;
// 	const minBarrierHeight = 50;
// 	const maxBarrierHeight = 150;

// 	for (let i = 0; i < numBarriers; i++) {
// 		let barrier = {
// 			width:
// 				minBarrierWidth + Math.random() * (maxBarrierWidth - minBarrierWidth),
// 			height:
// 				minBarrierHeight +
// 				Math.random() * (maxBarrierHeight - minBarrierHeight),
// 		};

// 		barrier.x = Math.random() * (canvasWidth - barrier.width);
// 		barrier.y = Math.random() * (canvasHeight - barrier.height);

// 		barriers.push(barrier);
// 	}

// 	return barriers;
// }

function drawBarriers(ctx) {
	barriers.forEach((barrier) => {
		ctx.fillStyle = 'gray'; // Or any color you prefer for barriers
		ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
	});
}
