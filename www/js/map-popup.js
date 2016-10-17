
function openMapPopup() {
	$('#map-popup').animate({
		bottom: 0
	}, 300, "swing", function(callback) {}
	);
}

function setMapPopup(titre, description) {
	$('#map-popup>h2').text(titre);
	$('#map-popup>#description-popup').text(description);
	openMapPopup();
}

function closeMapPopup() {
	$('#map-popup').animate({
		bottom: -$("#map-popup").outerHeight()
	}, 300, "swing", function(callback) {}
	);
}