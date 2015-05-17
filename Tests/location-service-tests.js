QUnit.module("Location Service Tests");

QUnit.test("When I ask for my location I expect long and lat results", function (assert) {
	var done = assert.async();
	OpenData.LocationService().getCurrentPosition(function(position) {
		assert.strictEqual(typeof position.coords.latitude, "number");
		assert.strictEqual(typeof position.coords.longitude, "number");
		done();
	});
});