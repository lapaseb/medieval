function openMapPopup(pageID) {
	var popup = pageID.find(".map-popup");
	popup.animate({
		bottom: 0
	}, 300, "swing", function(callback) {}
	);
}

function setMapPopup(pageID, titre, description, url) {
	var popup = pageID.find(".map-popup");
	popup.find('h2').text(titre);
	popup.find('#description-popup').text(description);
	openMapPopup(pageID);

	popup.find('#linkToSingle').click(function() {
		window.location.href = url;
	})
}

function closeMapPopup(pageID) {
	var popup = pageID.find(".map-popup");
	if(-(Math.round(popup.outerHeight()*10000)/10000)+"px" != popup.css('bottom')){
		popup.animate({
			bottom: -popup.outerHeight()
		}, 300, "swing", function(callback) {}
		);
	}
}
