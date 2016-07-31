'use strict';

/**
 * @ngdoc function
 * @name pmEditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pmEditorApp
 */
angular.module('pmEditorApp')
  .controller('HomeCtrl', function ($scope,$timeout,$document,$http) {

  	$scope.checkpoints = [];
    $scope.saveCheckpoint = function(p){
    	$scope.checkpoints.push({
    		pos:p,
    		text:'',
    	});
    };
    $scope.saveModel = function(){
    	console.log($scope.model);
    	$scope.PMObject.model = $scope.model;
    	//Reload experience (?)
    	reloadScene($scope.PMObject);
    }


    $scope.PMObject = {
      model:'/models/model.dae',
      startsIn:"33 33 22",
      checkpoints:[]
    };
});
