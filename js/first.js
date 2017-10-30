;(function($) {

  "use strict";

  function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map;
    var mapContainer = $('#map')[0];
    var myCenter = {lat: 46.4828408, lng: 30.7346898};

    map = new google.maps.Map(mapContainer, {
      center: myCenter,
      zoom: 14,
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  };

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('start2').value,
      destination: document.getElementById('end2').value,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Информация о маршруте: ' +
              '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' - ' + '<br>';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }

$(window).on('load', function () {
    initMap();
  });


})(jQuery);
