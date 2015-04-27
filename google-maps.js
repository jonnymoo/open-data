"use strict";
// Google maps data
OpenData.GoogleMaps = function(drawingService, googleService) {

	// Default drawing service
	drawingService = drawingService || function ($el) {

		return {
				// List takes a list of object and a function of what to do with each item in the list
				List: function(theList, eachItem) {
					var list = $("<ul></ul>");
					var i = 0;
					$el.append(list);
					for(i=0; i<theList.length; i++) {
						var item = $("<li></li>");
						list.append(item);
						eachItem.call(theList[i], item);
					}
				},
				// Title returns a label
				Title: function(text) {
					var label = $("<label></label>");
					label.text(text);
					$el.append(label);
				},
				// Phone returns a anchor ref
				Phone: function(phoneNumber) {
					var phone = $("<a></a>");
					phone.attr("href", "tel: +"+phoneNumber);
					phone.text(phoneNumber);
					$el.append(phone);
					
				}
				
			};
		};
	
	// Default google service
	googleService = googleService || {
		getList: function () {
			return [{Name: "Jonnys Taxis", Tel: "07905 325949"}];
		}
	}

	return {
		Query: function(searchFor, radius) {
			return {
				Draw: function($el) {
					drawingService($el).List(googleService.getList(), function($el) {
							drawingService($el).Title(this.Name);
							drawingService($el).Phone(this.Tel);
						});
				}
			};
		}
	};
};