QUnit.module("Google Maps Service Tests");

QUnit.test("Given I have a location when I ask for a list of places I expect that list to be returned", function (assert) {
	var done = assert.async();

	var dom = $("<div id='map-canvas' style='width: 800px; height: 800px;'></div>");
	$("body").append(dom);
	
	
	OpenData.GoogleMapsService().getList('#map-canvas', 'taxis -wedding', 53.7920283, -1.6630713, function(results) {
			assert.strictEqual(results.length > 0, true);
			done();
	});
})