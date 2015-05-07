var ajax = require('ajax'),
    currentSteps;

var parse = function(steps) {
  currentSteps = steps;
  var items = [];
  
  var title, duration;
  for (var i=0; i<steps.length; i++) {
    title = steps[i].html_instructions;
    duration = steps[i].duration.text;
    items.push({
      title:title,
      subtitle:duration
    });
  }
  
  return items;
};

var get = function(currentLocation, homeLocation, success, err) {
  var URL = 'https://maps.googleapis.com/maps/api/directions/json?origin='+currentLocation+'&destination='+homeLocation+'&key=AIzaSyDbWJQ0ruDs4iywdGnjCay60T9ZwPnKoVE&departure_time=now&mode=transit';

  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log("Successfully fetched weather data!");
      currentSteps = data.routes[0].legs[0].steps;
      var menuItems = parse(data.routes[0].legs[0].steps, data.routes[0].legs[0].steps.length);
    
      success(menuItems);
      
    },
    function(error) {
      console.log("fail");
      err(error);
    }
  );
};

exports.get = get;
exports.getCurrent = function() {
  return currentSteps;
}