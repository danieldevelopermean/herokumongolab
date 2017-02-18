(function() {

  angular
    .module('loc8rApp')
    .service('loc8rData', loc8rData);

  loc8rData.$inject = ['$http'];
  function loc8rData ($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
    };


    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    // faz a chamada ao metodo post da api (update  para o form modal)
    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data);
    };

    var locationByIdDelete = function (locationid) {
      return $http.delete('/api/locations/' + locationid);
    };

    var createLocation = function (data) {
      return $http.post('/api/locations/', data);
    };



    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById,
      locationByIdDelete : locationByIdDelete,
      createLocation : createLocation
    };
  }

})();