// TODO: Create a map variable
var map;

// TODO: Create a blank array for all the listing markers
// global variable since we only have a single array
var markers = [];

// Global polygon variable which is to make sure there is only a single polygon
var polygon = null;

// Global placemarkers array to use in multiple functions to have control
// over the number of places that show
var placeMarkers = [];

// TODO: Complete the following function to initialize the map
function initMap() {
    // Styles array for this map
    var styles = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#523735"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#c9b2a6"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#dcd2be"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ae9e90"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93817c"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#a5b076"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#447530"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fdfcf8"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f8c967"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#e9bc62"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e98d58"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#db8555"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#806b63"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8f7d77"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#b9d3c2"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#92998d"
              }
            ]
          }];


    // TODO: use a constructor to create a new map JS object. You can use the coordinates
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:34.4247097, lng:-119.7133113},
        zoom: 13,
        styles: styles,
        // Allows user to change from terrain to satelliter...etc
        mapTypeControl: false
    });

    // This autocomplete is for use in the search within time entry box
    var timeAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search-within-time-text'));
    // This autocomplete is for use in the geocoder entry box
    var zoomAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('zoom-to-area-text'));

    // Bias the boundaries within the map for the zoom to area text
    zoomAutocomplete.bindTo('bounds', map);

    // Create a searchbox in order to execute a places search
    var searchBox = new google.maps.places.SearchBox(
        document.getElementById('places-search'));
    // Bias the searchbox to within the bounds of the map
    searchBox.setBounds(map.getBounds());

    // Real estate listings that will be shown to the user
    // Normally stored in a database but we have an array of string literals
    var locations = [
        {title: '620 Del Monte Ave', location: {lat:34.413329, lng:-119.70745}},
        {title: '428 Santa Ynez Ct', location: {lat:34.4242917, lng:-119.668434}},
        {title: 'Handlebar Coffee', location: {lat:34.4222976, lng:-119.6984801}},
        {title: 'Southcoast Deli', location: {lat:34.4217019, lng:-119.7013289}},
        {title: 'Trader Joes', location: {lat:34.421578, lng:-119.677582}},
        {title: 'Lama Dog', location: {lat:34.415751, lng:-119.68852}}];
    
    var largeInfoWindow = new google.maps.InfoWindow();

    // Initialize the drawing manager
    // Does not appear yet
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            postion: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }
    });





    // Styled markers for each location
    var defaultIcon = makeMarkerIcon('0091ff');

    // Highlighted marker for when users mouseover
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Loop through locations and create a marker for each location
    for (var i = 0; i < locations.length; i++) {
        // Get the coordinate of each location
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push newly created marker into the markers array
        markers.push(marker);
        // Add eventListner to each marker for InfoWindow
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow)
        });
        // eventListeners for mouseover and mouseout of icons
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        })
    };

    // eventListeners for showing and hiding functions
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', function() {
        hideMarkers(markers);
    });

    document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
    });

    document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
    });

    document.getElementById('search-within-time').addEventListener('click', function() {
        searchWithinTime();
    });

    // Listen for the event fired when the user selects a prediction from the picklist
    // and retrieve more details for the place
    searchBox.addListener('places_changed', function() {
        searchBoxPlaces(this);
    });

    // Listen for the event fired when the user selects a prediction and clicks
    // "go" more details for that place
    document.getElementById('go-places').addEventListener('click', textSearchPlaces);

    // Add an event listener so that the polygon is captured, call the 
    // searchWithinPolygon function. This will show the markers in the polygon
    // and hide any outside of it.
    drawingManager.addListener('overlaycomplete', function(event) {
        // First check if a polygon exists, if yes, get rid of it and remove markers
        if (polygon) {
            polygon.setMap(null);
            hideMarkers(markers);
        }
        // Switching the drawing mode to the HAND after the polygon is completed
        drawingManager.setDrawingMode(null);
        // Creating a new editable polygon from the overlay
        // Captures the overlay that was drawn and assigns it to the polygon var
        polygon = event.overlay;
        polygon.setEditable(true);
        // Searching within the polygon
        searchWithinPolygon();
        // Make sure the search is re-done if the polygon is changed
        polygon.getPath().addListener('set_at', searchWithinPolygon);
        polygon.getPath().addListener('insert_at', searchWithinPolygon);

        // Alerts user how large the area in the polygon is
        areaWithinPolygon();
        // Make sure the area is re-calculated if the polygon is changed
        polygon.getPath().addListener('set_at', areaWithinPolygon);
        polygon.getPath().addListener('insert_at', areaWithinPolygon);

    });

}


// This function populates the infowindow when the marker is clicked at the marker location
// We only allow a single infowindow which will open at the marker that is clicked
function populateInfoWindow(marker, infowindow) {
    // Check to make sure infowindow in not already opened on this marker
    if (infowindow.marker != marker) {

        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
        // Create a new street view service object which needs to get the closest
        // Panoramic image to marker
        var streetViewService = new google.maps.StreetViewService();
        // Looks for a picture within 50 radius of pin
        var radius = 50;
        // In case the status is OK, which means a pano was found, compute the position of 
        // the streetview image, then calculate the heading, then get the panorama from that
        // and set the options
        function getStreetView(data, status) {
            if(status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 10
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent('<div>' + marker.title + '</div>'
                + '<div>No Street View Found</div>');
            }
        }

        // Use streetview service to get teh closest streetview image within 50 meters of marker
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}



function showListings() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    };
    map.fitBounds(bounds);
}

// Previously a hideListings function, made generic for Listings and  Places
function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    };
}

// This function takes in a color and creates a new marker icon of that color
// Icon will be 21px wide by 34 px high, have an origin of 0, 0 and anchored at 10, 34
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
    return markerImage;
}


// This function shows and hides the drawing options
function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew something, get rid of the polygon
        if (polygon !== null) {
            polygon.setMap(null);
        }
    } else {
        drawingManager.setMap(map);
    }
}


// This function hides all of the markers outside of the polygon
// and shows only the ones within it. This is so that the user can specify an exact area of search
function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
            markers[i].setMap(map);
        } else {
            markers[i].setMap(null);
        }
    }
}

function areaWithinPolygon() {
    var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    window.alert(area + " Square Meters");
}


// Functuin takes the user input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all of the listings and decide to focus on a single area of the map

function zoomToArea() {
    // Initialize the geocoder
    var geocoder = new google.maps.Geocoder();
    // Gets the address or place that the user entered
    var address = document.getElementById('zoom-to-area-text').value;
    // Make sure input is not blank
    if (address == '') {
        window.alert('You must enter an area, or address.');
    } else {
        // Geocode the address/area entered to get the center. Then center the map
        // on it and zoom in
        geocoder.geocode({
            address: address,
            componentRestrictions: {locality: 'Santa Barbara'}
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
            } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
    }
}


// This function allows the user to input a desired travel time, in minutes, and a travel mode
// and a location - and only show the listings that are within that travel time (via that travel mode)
function searchWithinTime() {
    // Initialize the distance matrix service
    var distanceMatrixService = new google.maps.DistanceMatrixService;
    var address = document.getElementById('search-within-time-text').value;
    // Checks to make sure that the place entered is not blank
    if (address == '') {
        window.alert('You must enter an address.');
    } else {
        // Makes sure all listings are hidden to start
        hideMarkers(markers);
        // Use the distance matrix service to calculcate the duration of the routes
        // between all our markers, and the destination address entered by the user. 
        var origins = [];
        for (var i = 0; i < markers.length; i++) {
            origins[i] = markers[i].position;
        }
        var destination = address;
        var mode = document.getElementById('mode').value;
        // Now that both the origins and destination are defined, we run the destination matrix
        // service to get the distance between them
        distanceMatrixService.getDistanceMatrix({
            origins: origins,
            destinations: [destination],
            travelMode: google.maps.TravelMode[mode],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, function(response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                window.alert('Error was: ' + status);
            } else {
                displayMarkersWithinTime(response);
            }
        });
    }
}

// This function will go through each of the results, and if the distance is LESS than the value in 
// the picker, show it on the map

function displayMarkersWithinTime(response) {
    var maxDuration = document.getElementById('max-duration').value;
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    // Parse through the results, get the distance and duration of each.
    // Because there may be multiple origins and destinations we have a nested loop
    // Then, make sure at least 1 result is found
    var atLeastOne = false;
    // Nested for loop to create 1 element per origin/destination pair
    for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for ( var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status === "OK") {
                // The distance returned is in feet, but TEXT is in miles
                // This is displayed to the user
                var distanceText = element.distance.text;
                // Duration value is given in seconds so we make it MINUTES, we need both 
                // the value and the text
                var duration = element.duration.value / 60;
                var durationText = element.duration.text;
                if (duration <= maxDuration) {
                    // The origin [i] should = the markers[i]
                    markers[i].setMap(map);
                    atLeastOne = true;
                    // Create a infowindow to open immediately and contains the distance and duration
                    var infowindow = new google.maps.InfoWindow({
                        content: durationText + ' away, ' + distanceText +
                            '<div><input type=\"button\" value=\"View Route\" onclick =' +
                            '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
                    });
                    infowindow.open(map, markers[i]);
                    // Put this in so that this small window closes if the user clicks the marker
                    // when the big infowindow opens
                    markers[i].infowindow = infowindow;
                    google.maps.event.addListener(markers[i], 'click', function() {
                        this.infowindow.close();
                    });
                }
            }
        }
    }
}


// This function is in response to the user selecting "show route" on one of the 
// markers within the calculated distance. This will display the route on the map

function displayDirections(origin) {
    hideMarkers(markers);
    var directionsService = new google.maps.DirectionsService;
    // Get the destination address from the user entered value.
    var destinationAddress = document.getElementById('search-within-time-text').value;
    // Get mode again from the user entered value.
    var mode = document.getElementById('mode').value;
    directionsService.route({
        // The origin is the passed in marker's position
        origin: origin,
        // The destination is user entered address.
        destination: destinationAddress,
        travelMode: google.maps.TravelMode[mode]
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            // Method displays the polyline
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
                draggable: true,
                polylineOptions: {
                    strokeColor: 'green'
                }
            });
        } else {
            console.log(status);
            window.alert('Directions request failed due to ' + status);
        }
    });
}


// This function will fire when the user selects a searchbox picklist item.
// It will do a nearby search using the selected query string or place

function searchBoxPlaces(searchBox) {
    hideMarkers(placeMarkers);
    var places = searchBox.getPlaces();
    // For each place, get the icon, name and location
    createMarkersForPlaces(places);
    if (places.length == 0) {
        window.alert('We did not find any places matching that search!');
    }
}

// This function fires when the user selects "go" on the places search
// It will do a nearby search using the entered query string or place
function textSearchPlaces() {
    var bounds = map.getBounds();
    hideMarkers(placeMarkers);
    var placesService = new google.maps.places.PlacesService(map);
    console.log(bounds);
    placesService.textSearch({
        query: document.getElementById('places-search').value,
        bounds: bounds
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarkersForPlaces(results);
        }
    });
}


// This function creates markers for each place found in either places search
function createMarkersForPlaces(places) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        // Create a marker for each place
        var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
        });
        // Create a single infowindow to be used with the place details information 
        // so that only one is open at once
        var placeInfoWindow = new google.maps.InfoWindow();
        // If a marker is clicked, do a place details search on it in the next function
        marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
                console.log("This infowindow is already on this marker@!");
            } else {
                // `this` is the marker
                console.log('opening infowindow');
                getPlacesDetails(this, placeInfoWindow);
            }
        });
        placeMarkers.push(marker);
        if (place.geometry.viewport) {
            // Only geocodes have viewport
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    }
    map.fitBounds(bounds);
}


// This is the PLACES DETAILS search - it's the most detailed so it is only
// executed when a marker is selected, indicating the user wants more details about place
function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
            // Set the marker property on this infowindow so it isn't created again
            infowindow.marker = marker;
            var innerHTML = '<div>';
            if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br>' + place.formatted_address;
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
            }
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    {maxHeight: 100, maxWidth: 200}) + '">';
            }
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    });
}









