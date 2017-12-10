"use strict";

describe("pow", function () {

	function makeTest(x) {
		var expected = x * x * x;
		it("При возведении" + x + " в 3 степень ответ равен" + expected, function () {
			assert.equal(pow(x, 3), expected);
		});
	}

	for (var i = 1; i < 5; i++) {
		makeTest(i);
	}

	it("При возведении в отр. степень - NaN", function () {
		assert(isNaN(pow(3, -1)));
	});

	it("При возведении в дробную степень - NaN", function () {
		assert(isNaN(pow(3, 1.5)));
	});
});