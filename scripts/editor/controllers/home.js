'use strict';

/**
 * @ngdoc function
 * @name pmEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pmEditorApp
 */
angular.module('pmEditorApp')
  .controller('HomeCtrl', function ($scope,FileSaver, ngAudio,Blob,$timeout,$document,$http) {

    $scope.soundtrack = {
        audioID:'',
        audioURL:'',
        audio:{}
    }
    $scope.activeProjects = [];
    var latest = localStorage.getItem(key+'latest');
    if (latest){
        $scope.savedStoryID = latest;
    }
    var list = localStorage.getItem(key+'list');
    if (list){
        $scope.activeProjects = JSON.parse(list);
    }
    //DRDZLRE4DC99LKK
    $scope.createNewStory = function(){
         $scope.storyID = generateId();
         $scope.idReady = true;
    }

    $scope.loadStory = function(storyID){
        
        $scope.savedStoryID = storyID;
         var pmSession = localStorage.getItem(key+ $scope.savedStoryID);
        if (!pmSession){
             $scope.noId = true;
        }
        else {
            $scope.PMObject = JSON.parse(pmSession);
            $scope.model= $scope.PMObject.model;
            reloadScene($scope.PMObject);
            $scope.idReady = true;
            $scope.storyID = $scope.savedStoryID;

            $scope.checkpoints = [];
          
            for (var i = 0; i < $scope.PMObject.checkpoints.length; i++) {
                var check = $scope.PMObject.checkpoints[i];
                var cp = {
                    pos:getStringAsPos(check.from),
                    text:'',
                };
                
                if (check.audio){
                    cp.audioURL = check.audio;
                    cp.audioID = check.audioID;
                    cp.audio = ngAudio.load(check.audio);
                }

               
                $scope.checkpoints.push(cp);

            };
            if ($scope.PMObject.soundtrack){
                $scope.soundtrack.audioURL = $scope.PMObject.soundtrack;
                $scope.soundtrack.audioID = $scope.PMObject.soundtrackID;
                $scope.soundtrack.audio = ngAudio.load($scope.soundtrack.soundtrackURL);
            }
            $scope.title = $scope.PMObject.title;
            localStorage.setItem(key+'latest',$scope.storyID);
            //DRDZLRE4DC99LKK
        }
    };

    $scope.removeCheckpoint = function(item,i){
        var pos = $scope.checkpoints.indexOf(item);
        $scope.checkpoints = $scope.checkpoints.splice(i, 1);

    }
    $scope.loadAudio = function(item){

        item.audio = ngAudio.load(item.audioURL); // returns NgAudioObject
        item.audioID =  generateId();
        
    }
  	$scope.checkpoints = [];
    $scope.saveCheckpoint = function(p){
    	$scope.checkpoints.push({
    		pos:p,
    		text:'',
    	});
    };
    $scope.startsIn= {
        x:2,
        y:2,
        z:2
    };



    $scope.saveExperience = function(){
        $scope.PMObject.model = $scope.model;
    	var pre;
    	var items = [];
        var average = 8000;
        var init = 3000;
        var prev =0;
    	for (var i = 0; i < $scope.checkpoints.length; i++) {	
			var current = $scope.checkpoints[i];
			if (pre){
                var item = {
                  begin:init + prev,
                  dur:average,
                  from: getPosAsString(pre.pos),
                  to: getPosAsString(current.pos),
                };
                //I have to play the sound of the previous because of the from to
                if (pre.audio){
                    //there is no error.
                    if(!pre.audio.audio.error){
                        item.audio = pre.audioURL;
                        item.audioID = pre.audioID;
                    }
                };
				items.push(item);
                prev = item.begin + item.dur;
                init = 0 ;
			}
			pre = current;
    	};


        if ($scope.soundtrack){
            $scope.PMObject.soundtrack = $scope.soundtrack.audioURL;
        }
        $scope.PMObject.title = $scope.title;
    	$scope.PMObject.checkpoints = items;

        $scope.PMObject.startsIn = getPosAsString($scope.startsIn);
    	store();
        reloadScene($scope.PMObject);
        
    };
    

    $scope.PMObject = {
      model:'/models/model.dae',
      startsIn: getPosAsString($scope.startsIn),
      checkpoints:[]
    };


    $scope.downloadJSON = function() {
        var filename = "PM.Object.json";
        var pmString = JSON.stringify($scope.PMObject);
        var data = new Blob([pmString], {
          type: "text/json;charset=utf-8"});
        FileSaver.saveAs(data, filename);
        store();
        

    };

    var store = function(){
        var pmString = JSON.stringify($scope.PMObject);
        localStorage.setItem(key+'latest',$scope.storyID);
        localStorage.setItem(key + $scope.storyID,pmString);

        var actives = localStorage.getItem(key+'list');
        list =  [];
        if (actives){
            list = JSON.parse(actives); 
            var found = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i].story === $scope.storyID){
                    list[i].title = $scope.title;
                    found = true;
                }
            };
            if (!found){
                list.push({
                    story:  $scope.storyID,
                    title : $scope.title
                });       
            }
        }else 
        {
            list.push({
                story:  $scope.storyID,
                title : $scope.title
            });
        }
        localStorage.setItem(key+'list',JSON.stringify(list));
        

    }

    $scope.savePreview = function(){
        $scope.PMObject.model = $scope.model;
        var pmString = JSON.stringify($scope.PMObject);
        store();
        window.open("play.html#"+  $scope.storyID);
        
    }

});
