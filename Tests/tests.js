QUnit.test( "I can get a list of taxis firms from google maps", function( assert ) {
  
  var googleMaps = OpenData.GoogleMaps();
  assert.strictEqual(googleMaps.Query("taxis") !== undefined, true);

  });
  
QUnit.test( "Given a google maps query I can draw a list", function( assert ) {
  var dom = $("<div></div>");
  $("body").append(dom);
  
  var googleMaps = OpenData.GoogleMaps();
  
  assert.strictEqual(googleMaps.Query("taxis").Draw(dom) !== undefined, true);

  });
  