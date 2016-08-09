'use strict';
/**
 * @ngdoc overview
 * @name pmEditorApp
 * @description
 * # pmEditorApp
 *
 * Main module of the application.
 */
angular.module('pmEditorApp', [
    'ngRoute',
    'ngSanitize',
    'ngFileSaver'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/editor/views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope,$interval) {


  });


