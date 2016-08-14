var key = 'PM-Session';
var request = new XMLHttpRequest();



document.addEventListener('keypress', function(evt) {


  var sceneEl = document.querySelector('a-scene');
  var entity = sceneEl.querySelector('#pm-camera');


   switch (evt.which) {
   case 32:
     submitPosition(entity.getAttribute('position'));
     break;
   case 13:
     var axis = entity.components['wasd-controls'].data.wsAxis;
     entity.components['wasd-controls'].data.wsAxis = axis === 'z' ? 'y' : 'z';
     break;
   }
}, true);



var submitPosition = function(position){
  var v  = document.getElementById('view');
  var scope =angular.element(v).scope();
  scope.saveCheckpoint(position);
  scope.$apply();
};

var reloadScene = function(PMObject){
      // Fetch the external template.
      var scene = document.querySelector('a-scene');
      var request = new XMLHttpRequest();
      request.addEventListener('load', treeLoaded);
      request.open('GET', 'scripts/PM.main.template');
      request.send();
      function treeLoaded () {
        angular.element(document.getElementById('pm-template')).remove()
        // Compile the fetched template.
        var treeTemplateStr = request.response;
        var treeTemplate = nunjucks.compile(treeTemplateStr);
        var treeEntityStr = treeTemplate.render(PMObject);
        scene.insertAdjacentHTML('beforeend', treeEntityStr);
      
      }
};



var getPosAsString = function(pos){
  console.log(pos);
  return "" + pos.x + " " + pos.y + " " + pos.z;
};


var getStringAsPos = function(str){
  var res = str.split(" ");
  var pos = {
    x:res[0],
    y:res[1],
    z:res[2]
  }
  return pos;
};

var generateId = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
