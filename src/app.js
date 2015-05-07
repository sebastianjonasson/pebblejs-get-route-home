var UI = require('ui'),
    elements = require('ui-elements'),
    Vector2 = require('vector2'),
    route = require('./route'),
    //homeLocation = "55.604428,13.028921",
    //currentLocation = "lund";
    homeLocation = "stockholm",
    currentLocation = "malmö konserthus";

var splashWindow = elements.getSplashWindow();
splashWindow.show();

var success = function(pos) {
  currentLocation = pos.coords.latitude+","+pos.coords.longitude;
  
  route.get(currentLocation, homeLocation, function(menuItems) {
       // Construct Menu to show to user
      var resultsMenu = new UI.Menu({
        sections: [{
          title: 'Route home',
          items: menuItems
        }]
      });
    
      resultsMenu.show();
      splashWindow.hide();
    
      // Add an action for SELECT
      resultsMenu.on('select', function(e) {
        console.log('Item number ' + e.itemIndex + ' was pressed!');
        
        var data = route.getCurrent();
        console.log(data);
          // Create the Card for detailed view
        var detailCard = new UI.Card({
          title:data[e.itemIndex].duration.text + "(" +data[e.itemIndex].distance.text+ ")",
          subtitle:data[e.itemIndex].travel_mode,
          body: data[e.itemIndex].html_instructions
        });
        detailCard.show();
      });
  }, function(error) {
    console.log(error);
  });


};
var err = function() {
  console.log("err");
};
navigator.geolocation.getCurrentPosition(success, err);

