'use strict';

/**
 * @ngdoc function
 * @name pmEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pmEditorApp
 */
angular.module('pmEditorApp')
  .controller('HomeCtrl', function ($scope,FileSaver, Blob,$timeout,$document,$http) {

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
    	for (var i = 0; i < $scope.checkpoints.length; i++) {	
			var current = $scope.checkpoints[i];
			if (pre){
				items.push({
		          begin:3000,
		          dur:8000,
		          from: getPosAsString(pre.pos),
		          to: getPosAsString(current.pos),
		        });
			}
			pre = current;
    	};
    	$scope.PMObject.checkpoints = items;
        $scope.PMObject.startsIn = getPosAsString($scope.startsIn);
    	reloadScene($scope.PMObject);
    };
    $scope.saveModel = function(){
    	console.log($scope.model);
    	$scope.PMObject.model = $scope.model;
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
        var data = new Blob([JSON.stringify($scope.PMObject)], {
          type: "text/json;charset=utf-8"});
        FileSaver.saveAs(data, filename);
        

    };
});
