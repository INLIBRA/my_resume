/*
This file contains all of the code running in the background that makes resumeBuilder.js possible. 
*/

var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr/>';

var HTMLmobile = '<li class="flex-item"><span class="magenta-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="magenta-text">email</span><span class="white-text">%data%</span></li>';
var HTMLlinkedin = '<li class="flex-item"><span class="magenta-text">linkedin</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="magenta-text">github</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="magenta-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

// var HTMLworkStart = '<div class="work-entry"></div>';
// var HTMLworkEmployer = '<a href="#">%data%';
// var HTMLworkTitle = ' - %data%</a>';
// var HTMLworkDates = '<div class="date-text">%data%</div>';
// var HTMLworkLocation = '<div class="location-text">%data%</div>';
// var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%" style="widh: 100px; height: 100px">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLdegree = '<h3>University Degree</h3>';
var HTMLschoolName = '<a href="%data%" target="_blank">%data%';
var HTMLschoolDegree = '&nbsp -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '&nbsp<em>Major: %data%</em><br>';

var HTMLonlineCertificates = '<h3>Certificates</h3>';
var HTMLcertificateSchool = '<a href="%data%" target="_blank">%data%';
var HTMLcertificateProgram = '&nbsp -- %data%</a>';
var HTMLcertificateDates = '<div class="date-text">%data%</div>';
var HTMLcertificateLocation = '<div class="location-text">%data%</div>';

var HTMLonlineClasses = '<h3>Online Programs and Courses</h3>';
var HTMLonlineTitle = '<a href="%data%" target="_blank">%data% ';
var HTMLonlineSchool = '&nbsp -- %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';

var googleMap = '<div id="map"></div>';


//Custom Google Map for the website is generated here.
var map;

//initializeMap() is called when page is loaded.
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true,
    zoom: 50,
    mapTypeControl: true,
    zoomControl: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the current location from bio to the locations array
    locations.push(bio.contacts.currentLocation);

    // adds all previous locations from bio to the locations array
    for (var location in bio.contacts.previousLocations) {
      locations.push(bio.contacts.previousLocations[location]);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  var isCurrentLocation = true;
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds; // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // make icon with my current location green
     if (isCurrentLocation) {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      isCurrentLocation = false;
  }

    // infoWindows are the little helper windows that open when you hover over a pin on a map. 
    var domNode = '<div>' + name + '</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: domNode
    });

    google.maps.event.addListener(marker, 'hover', function() {
      infoWindow.open(map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

//The map bounds get updated on page resize
window.addEventListener('resize', function(e) {

  map.fitBounds(mapBounds);
});
