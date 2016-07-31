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
var sceneEl = document.querySelector('a-scene');
var entity = sceneEl.querySelector('#camera');

document.addEventListener('keypress', function(evt) {
   switch (evt.which) {
   case 32:
     alert('posicion:'+ entity.getAttribute('position').x);
     break;
   case 13:
     var axis = entity.components['wasd-controls'].data.wsAxis;
     entity.components['wasd-controls'].data.wsAxis = axis === 'z' ? 'y' : 'z';
     break;
   }
}, true);



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
