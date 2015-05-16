QUnit.module("Location Service Tests");

QUnit.test("When I ask for my location I expect long and lat results", function (assert) {
	var done = assert.async();
	OpenData.LocationService().getCurrentPosition(function(position) {
		assert.strictEqual(position.coords.latitude > 0, true);
		assert.strictEqual(position.coords.longitude > 0, true);
		done();
	});
});