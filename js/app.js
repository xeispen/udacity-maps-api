// TODO: Create a map variable
var map;

// TODO: Create a blank array for all the listing markers
// global variable since we only have a single array
var markers = [];

// TODO: Complete the following function to initialize the map
function initMap() {
    // TODO: use a constructor to create a new map JS object. You can use the coordinates
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:34.4281887, lng:-119.7371722},
        zoom: 13
    });

    // Real estate listings that will be shown to the user
    // Normally stored in a database but we have an array of string literals
    var locations = [
        {title: 'Del Monte House', location: {lat:34.4281887, lng:-119.7371722}},
        {title: 'New House', location: {lat:34.4242488, lng:-119.6710056}},
        {title: 'Handlebar Coffee', location: {lat:34.4222976, lng:-119.7006741}},
        {title: 'Southcoast Deli', location: {lat:34.4222972, lng:-119.707267}},
        {title: 'Trader Joes', location: {lat:34.4222919, lng:-119.733639}},
        {title: 'Lama Dog', location: {lat:34.415751, lng:-119.690714}}];
    
    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    // Loop through locations and create a marker for each location
    for (var i = 0; i<locations.length; i++) {
        // Get the coordinate of each location
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push newly created marker into the markers array
        markers.push(marker);
        // Extend the boundaries of the map for each marker
        bounds.extend(marker.position);
        // Add eventListner to each marker for InfoWindow
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
    }
    map.fitBounds(bounds);

    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);

    // eventListeners for showing and hiding functions

    // This function populates the infowindow when the marker is clicked at the marker location
    // We only allow a single infowindow which will open at the marker that is clicked
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure infowindow in not already opened on this marker
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed
            infowindow.addListener('closeclick',function(){
                infowindow.setMarker = null;
            });
        }
    }
}