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
				items.push(item);
                prev = item.begin + item.dur;
                init = 0 ;
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
