var key = 'PM-Session';
var request = new XMLHttpRequest();
var pmSession = localStorage.getItem(key);
if (!pmSession){
  var request = new XMLHttpRequest();
  request.addEventListener('load', onSessionLoaded);
  request.open('GET', '/scripts/PM.session.example.json');
  request.send();
  var onSessionLoaded = function(){
    // Compile the fetched template.
    var treeTemplateStr = request.response;
    console.log(treeTemplateStr);
  };
}else {
  console.log('new session!');
}


var saveSession= function(){
  // Put the object into storage
  localStorage.setItem(key, JSON.stringify(testObject));
};


document.addEventListener('keypress', function(evt) {


  var sceneEl = document.querySelector('a-scene');
  var entity = sceneEl.querySelector('#camera');


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
      request.open('GET', '/scripts/PM.main.template');
      request.send();
      function treeLoaded () {
        // Compile the fetched template.
        var treeTemplateStr = request.response;
        var treeTemplate = nunjucks.compile(treeTemplateStr);
        var treeEntityStr = treeTemplate.render(PMObject);
        scene.insertAdjacentHTML('beforeend', treeEntityStr);
      
      }
};
