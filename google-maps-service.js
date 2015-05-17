// Google maps service
OpenData.GoogleMapsService = function(errorService) {
	errorService = errorService || OpenData.ErrorService;

	return {
		getList: function (mapDiv, keyword, lat, lng, success) {
			var location = new google.maps.LatLng(lat, lng);
			var mapOptions = {
				  center: location,
				  zoom: 13
				};
				
			var map = new google.maps.Map($(mapDiv)[0],
				mapOptions);
				
			var infowindow = new google.maps.InfoWindow();
			
			var request = {
				location: location,
				keyword: keyword,
				rankBy: google.maps.places.RankBy.DISTANCE
			};
			
			var service = new google.maps.places.PlacesService(map);
			
			function addMarker(place) {
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(place.name);
					infowindow.open(map,this);
				});
			}
			
			service.nearbySearch(request, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					for(i=0;i<results.length;i++) {
						addMarker(results[i]);
					}
					success(results);
				} else {
					errorService.report("Couldn't find "+keyword+". Status: "+status);
				}
			});
		}
	};
};