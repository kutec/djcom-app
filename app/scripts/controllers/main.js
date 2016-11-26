'use strict';

/**
 * @ngdoc function
 * @name djcomAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the djcomAppApp
 */
angular.module('djcomAppApp')
  .controller('MainCtrl', function ($scope, wpFactory) {
  $scope.posts = [];
  $scope.portfolio = [];
  $scope.images = {};

  wpFactory.getPosts(5).then(function (succ) {
    $scope.posts = succ;
    angular.forEach(succ, function(value, index) {
      $scope.setUrlForImage(index, value.featured_media);
    });
  }, function error(err) {
    console.log('Errror: ', err);
  });

  wpFactory.getPortfolio(5).then(function (succ) {
    $scope.portfolio = succ;
    angular.forEach(succ, function(value, index) {
      $scope.setUrlForImage(index, value.featured_media);
    });
  }, function error(err) {
    console.log('Errror: ', err);
  });

  $scope.setUrlForImage = function(index, id) {
    wpFactory.getMediaDataForId(id).then(function (succ) {
      $scope.images[index] = succ.source_url;
    });
  };
});
