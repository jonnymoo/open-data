QUnit.module("Mapping Tests");

QUnit.test("Given a mapping service I can query something", function (assert) {

	var mapping = OpenData.Mapping();
	assert.strictEqual(mapping.Query() !== undefined, true);

});

QUnit.test("Given a mapping query, when I draw it, I expect a drawn list", function (assert) {

	var theDrawnList;

	var mapping = OpenData.Mapping(function () {
			return {
				// Mock Drawing service
				List : function (theList) {
					theDrawnList = theList;
				}
			}
		}, {
			// Mock mapping service
			getList : function () {
				return [{}

				];
			}
		});

	mapping.Query().Draw();

	assert.strictEqual(theDrawnList.length, 1);

});

QUnit.test("Given a mapping query, when I draw it, I expect it to be drawn on my element", function (assert) {

	var dom = $("<div id='MyElement'></div>");
	$("body").append(dom);

	var theDrawnList;
	var theElement;

	var mapping = OpenData.Mapping(function ($el) {
			return {
				// Mock Drawing service
				List : function (theList) {
					theDrawnList = theList;
					theElement = $el;
				}
			}
		}, {
			// Mock mapping service
			getList : function () {
				return [{}
				];
			}
		});

	mapping.Query().Draw("#MyElement");

	assert.strictEqual(theElement.attr('id'), "MyElement");

	dom.remove();

});

QUnit.test("Given a mapping query, when I draw it, I expect it each item in my list to be drawn", function (assert) {

	var drawnTitleText,
	drawnPhoneNo;

	var mockItem = {
		Name : "Jonnys Taxis",
		Tel : "07905 325949"
	};
	
	var mapping = OpenData.Mapping(function ($el) {
			return {
			// Mock Drawing service
				List : function (theList, eachItemFunction) {
					eachItemFunction.call(mockItem);
				},
				Title : function (text) {
					drawnTitleText = text;
				},
				Phone : function (phoneNo) {
					drawnPhoneNo = phoneNo;
				}
			}
		}, {
			// Mock mapping service
			getList : function () {
				return [{}

				];
			}
		});

	mapping.Query().Draw();

	assert.strictEqual(drawnTitleText, "Jonnys Taxis");
	assert.strictEqual(drawnPhoneNo, "07905 325949");
});

QUnit.test("Given a mapping query, when query, I expect criteria to be passed into my mapping service", function (assert) {

	var passedSearchString,
		passedRadius;
	
	
	var mapping = OpenData.Mapping(function ($el) {
			return {
				List : function (theList, eachItemFunction) {
				}
			}
		}, {
			// Mock mapping service
			getList : function (searchString, radius) {
				passedSearchString = searchString;
				passedRadius = radius;
			}
		});

	mapping.Query("Taxis", "100").Draw();

	assert.strictEqual(passedSearchString, "Taxis");
	assert.strictEqual(passedRadius, "100");
});