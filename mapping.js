"use strict";
// mapping service
OpenData.Mapping = function(drawingService, mappingService) {

	// Default drawing service
	drawingService = drawingService || OpenData.HTMLDrawingService;
	
	// Default mapping service
	mappingService = mappingService || OpenData.GoogleMapsService;

	return {
		// Query by search criteria and a radius
		Query: function(searchFor, radius) {
			return {
				Draw: function(el) {
					var $el = $(el);
					drawingService($el).List(mappingService.getList(searchFor, radius), function($el) {
							drawingService($el).Title(this.Name);
							drawingService($el).Phone(this.Tel);
						});
				}
			};
		}
	};
};