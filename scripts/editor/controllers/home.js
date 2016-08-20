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


    var latest = localStorage.getItem(key+'latest');
    if (latest){
        $scope.savedStoryID = latest;
    }
    //DRDZLRE4DC99LKK
    $scope.createNewStory = function(){
         $scope.storyID = generateId();
         $scope.idReady = true;
    }

    $scope.loadStory = function(){
        

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
            var nextAudio;
            for (var i = 0; i < $scope.PMObject.checkpoints.length; i++) {
                var check = $scope.PMObject.checkpoints[i];
                var cp = {
                    pos:getStringAsPos(check.from),
                    text:'',
                };
                
                if (nextAudio){
                    cp.audioURL = nextAudio.audio;
                    cp.audioID = nextAudio.audioID;
                    cp.audio = ngAudio.load(nextAudio.audio);
                }

                if (check.audio){
                    nextAudio = nextAudio;   
                }
                else {
                    nextAudio = undefined;

                }
                $scope.checkpoints.push(cp);

            };
            localStorage.setItem(key+'latest',$scope.storyID);
            //DRDZLRE4DC99LKK
        }
    };

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
        x:33,
        y:22,
        z:33
    };
    



    $scope.saveExperience = function(){
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
                }
				items.push(item);
                prev = item.begin + item.dur;
                init = 0 ;
			}
			pre = current;
    	};


        //now arrange the audio files
        var prevAudio;

        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if (item.audio){
                prevAudio = item;
            }

            if (prevAudio){
                item.audio = prevAudio.audioURL;
                item.audioID = prevAudio.audioID;
            }
        };


    	$scope.PMObject.checkpoints = items;
        $scope.PMObject.startsIn = getPosAsString($scope.startsIn);
    	reloadScene($scope.PMObject);
    };
    $scope.saveModel = function(){
    	
    	$scope.PMObject.model = $scope.model;
    	var pmString = JSON.stringify($scope.PMObject);
        localStorage.setItem(key + $scope.storyID,pmString);
        //Reload experience (?)
    	reloadScene($scope.PMObject);


    }


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
        localStorage.setItem(key+'latest',$scope.storyID);
        localStorage.setItem(key + $scope.storyID,pmString);
        

    };

    $scope.savePreview = function(){
        $scope.PMObject.model = $scope.model;
        var pmString = JSON.stringify($scope.PMObject);
        localStorage.setItem(key + $scope.storyID,pmString);
        window.open("play.html#"+  $scope.storyID);
        localStorage.setItem(key+'latest',$scope.storyID);
    }

});
