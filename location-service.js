// Location service
OpenData.LocationService = function() {
	return {
		getCurrentPosition: function (success) {
		
			
		
			success({
				coords: {
					longitude: 100,
					latitude: 100
				}
			});
		}
	};
};