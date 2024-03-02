function generateRandomBarrier(canvasWidth, canvasHeight, stepSize) {
	let barrier = [];
	let startX = Math.floor(Math.random() * (canvasWidth / stepSize)) * stepSize;
	let startY = Math.floor(Math.random() * (canvasHeight / stepSize)) * stepSize;

	let currentPosition = {
		x: startX,
		y: startY,
	};

	let directions = [0, 90, 180, 270];
	let direction = directions[Math.floor(Math.random() * directions.length)];

	const maxSteps = 500;

	for (let i = 0; i < maxSteps; i++) {
		// Adjust the random number range for the new ratio 10:10:10:1
		let randomNum = Math.floor(Math.random() * 31); // 0 to 30

		let action;
		if (randomNum < 10) {
			// 0 to 9: Go forward
			action = 0;
		} else if (randomNum < 20) {
			// 10 to 19: Turn left
			action = 1;
		} else if (randomNum < 30) {
			// 20 to 29: Turn right
			action = 2;
		} else {
			// 30: Stop
			action = 3;
		}

		let nextPosition = Object.assign({}, currentPosition);

		if (action === 0) {
			nextPosition.x += stepSize * Math.cos((direction * Math.PI) / 180);
			nextPosition.y += stepSize * Math.sin((direction * Math.PI) / 180);
		} else if (action === 1) {
			direction = (direction - 90 + 360) % 360;
		} else if (action === 2) {
			direction = (direction + 90) % 360;
		} else if (action === 3) {
			break; // Stop generating
		}

		// Check for self-intersection: if nextPosition is inside any previous segment
		// let intersects = barrier.some((segment) => {
		// 	return (
		// 		segment.start.x === nextPosition.x && segment.start.y === nextPosition.y
		// 	);
		// });

		// if (intersects) {
		// 	break; // Stop if the barrier intersects itself
		// }

		barrier.push({ start: currentPosition, end: nextPosition });
		currentPosition = nextPosition;
	}

	return barrier;
}

function drawBarriers(ctx, barriers) {
	barriers.forEach((barrier) => {
		barrier.forEach((segment) => {
			ctx.beginPath();
			ctx.moveTo(segment.start.x, segment.start.y);
			ctx.lineTo(segment.end.x, segment.end.y);
			ctx.strokeStyle = 'gray';
			ctx.lineWidth = 10; // Adjust line width as needed
			ctx.stroke();
		});
	});
}
