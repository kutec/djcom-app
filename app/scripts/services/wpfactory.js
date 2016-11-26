'use strict';

/**
 * @ngdoc service
 * @name djcomAppApp.wpFactory
 * @description
 * # wpFactory
 * Factory in the djcomAppApp.
 */
angular.module('djcomAppApp')
  .factory('wpFactory', function ($http, $q) {

  var url = 'http://devaljayswal.com/djcom/wp-json/wp/v2/';

  function getPosts(number) {
    return ($http.get(url+'posts?per_page=' + number)
    .then(handleSuccess, handleError));
  }

  function getPortfolio(number) {
    return ($http.get(url+'portfolio?per_page=' + number)
    .then(handleSuccess, handleError));
  }

  function getMediaDataForId(id) {
    return ($http.get(url+'media/' + id, {ignoreLoadingBar: true})
    .then(handleSuccess, handleError));
  }

  function handleSuccess(response) {
    return response.data;
  }

  function handleError(response) {
    if (!angular.isObject(response.data) || !response.data.message) {
      return($q.reject("An unknown error occurred."));
    }
    return($q.reject(response.data.message));
  }

  return({
    getPosts: getPosts,
    getPortfolio: getPortfolio,
    getMediaDataForId: getMediaDataForId
  });
});
