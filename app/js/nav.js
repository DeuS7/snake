var lastWheelEventTime = 0;

window.addEventListener("wheel", function(e){
	if (performance.now() - lastWheelEventTime < 200) {
		return;
	}

	if (e.deltaY > 0){
		window.scrollBy({
			top: window.innerHeight,
			behavior: "smooth"
		});
	} else {
		window.scrollBy({
			top: -window.innerHeight,
			behavior: "smooth"
		});
	}

	lastWheelEventTime = performance.now();
}, false);