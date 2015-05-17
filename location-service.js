// Location service
OpenData.LocationService = function(errorService) {
	errorService = errorService || OpenData.ErrorService;
	return {
		getCurrentPosition: function (success) {
			if ("geolocation" in navigator) {
				/* geolocation is available */
				navigator.geolocation.getCurrentPosition(function(position) {
					success(position);
				}, function(error) {
					errorService.report('ERROR(' + error.code + '): ' + error.message);
				});
			} else {
				/* geolocation IS NOT available */
				errorService.report("Sorry, your phone can't tell us your location");
			}
		}
	};
};