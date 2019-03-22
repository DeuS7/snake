var inputs = document.querySelectorAll(".settingsLine input");

for (var input of inputs) {
	var cookieSetting = getCookie(input.name);
	if (cookieSetting) {
		sets[input.name] = cookieSetting;
	}

	if (input.type == "radio" && sets[input.name] == input.value) {
		input.checked = true;
	}
	if (input.type == "range") {
		input.value = sets[input.name];
	}

	input.addEventListener("click", function(e) {
		//input.name is a name of a function, that processes the setting.
		processorFuncs[this.name](this.value, sets);

		setCookie(this.name, this.value, 750);
	});
}


//Each setting may need it's own approach, like dimension and warpMode do.
var processorFuncs = {
	/*dimension: function(ratio, sets) {
		var totalBlocks = sets.dimension / sets.block;
		totalBlocks = Math.floor(totalBlocks / ratio);
		sets.dimension = totalBlocks * sets.block;
	},*/
	stepOverMode: function(mode, sets) {
		sets.stepOverMode = mode;
	},
	warpMode: function(mode, sets) {
		//This is to make "true" true.
		sets.warpMode = mode /*(mode == "true")*/;
	},
	amountOfObstacles: function(amount, sets) {
		sets.amountOfObstacles = amount;
	},
	stepDelay: function(delay, sets) {
		sets.stepDelay = delay;
	},
	amountOfSteps: function(value, sets) {
		sets.amountOfSteps = value; 
	}
}
