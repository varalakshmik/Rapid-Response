
Template.LiveVictimMap.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
    // livelocation.insert({"lat":"13.6","lon":"80.1","doneflag":"false","source":"twitter"});
     //livelocation.insert({"lat":"13.6","lon":"79.7","doneflag":"false","source":"none"});
     // livelocation.insert({"lat":"13.6","lon":"79.7","doneflag":"false"});
     // livelocation.insert({"lat":"13.3","lon":"79.7","doneflag":"false"});



      return {
        center: new google.maps.LatLng(12.6, 75.1),
        zoom: 8
      };
    }
  }
});



var content = '<button type=submit id="CompleteButton" >Mark as Completed</button>';



Template.LiveVictimMap.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {

  
  var markers  ={};
livelocation.find({"doneflag":"false"}).observe({ 

 added: function(document) {
    // Create a marker for this document

    //var imageMarkerA = new google.maps.MarkerImage('blue-dot.png');

    if(document.source == "twitter"){
    var marker = new google.maps.Marker({
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lon),
      map: map.instance,
      clickable:true,
      icon:'blue-dot.png',
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });

    }
  else
  {
    var marker = new google.maps.Marker({
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lon),
      map: map.instance,
      clickable:true,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });
  }

    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      livelocation.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lon() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    markers[newDocument._id].setPosition({ lat: newDocument.lat, lon: newDocument.lon });
  },
  removed: function(oldDocument) {
    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});


    // Add a marker to the map once it's ready
    //   loc = livelocation.find().fetch();
      
    //   for(i =0;i<loc.length;i++){
    //    var lat =loc[i].lat;
    //     var lon = loc[i].lon;
      
    //     var marker = new google.maps.Marker({
    //       draggable:true,
    //       animation: google.maps.Animation.DROP,
    //       position: new google.maps.LatLng(lat,lon),
    //       map: map.instance,
    //       id:loc.id
    //     });
    // }



  });



});


