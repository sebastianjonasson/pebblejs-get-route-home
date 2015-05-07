var UI = require('ui'),
    Vector2 = require('vector2');

var getSplashWindow = function() {
  // Show splash screen while waiting for data
  var splashWindow = new UI.Window();
  
  // Text element to inform user
  var text = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    text:'Fetching route home...',
    font:'GOTHIC_28_BOLD',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
  	backgroundColor:'white'
  });
  
  // Add to splashWindow and show
  splashWindow.add(text);
  
  return splashWindow;
}

exports.getSplashWindow = getSplashWindow;