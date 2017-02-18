(function () {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope','$modal', '$route','loc8rData', 'geolocation'];




  function homeCtrl ($scope, $modal, $route, loc8rData, geolocation) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    vm.lat;
    vm.lng;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    };
    vm.message = "Checking your location";

    vm.getData = function (position) {
       vm.lat = position.coords.latitude,
       vm.lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      loc8rData.locationByCoords(vm.lat, vm.lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);


        vm.deletar = function(idDelete){
          loc8rData.locationByIdDelete(idDelete)
          .success(function(){
            console.log("Id eliminado =" + idDelete);
            $route.reload();
          })
          .error(function(e){
            console.log("erro ao apagar id =" + idDelete);
          })
    };

// teste


vm.cadForm = function () {

   var modalInstance = $modal.open({
    templateUrl: '/rCadastModal/cadModal.view.html',
    controller: 'cadLocalCtrl as vm',
    resolve : {
          locationData : function () {
            return {
              locationLog : vm.lng,
              locationLat : vm.lat,

            };
          }
        } // fim resolve
  });  // fim modalInstance


modalInstance.result.then(function (data) {
        vm.data.locations.push(data);
      });

}; // fim cadForm





/* fim teste */



  } // final  function homeCtrl (principal)

})(); // final function no topo


