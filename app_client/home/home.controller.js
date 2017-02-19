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
      title: 'Qual a distância?',
      strapline: 'Registre uma localidade e verifique!'
    };
    vm.sidebar = {
      content: "Site produzido usando o conjunto de tecnologias MEAN -  MongoDB, Express, AngularJS(1), NodeJS. Descrição de funcionamento pode ser encontrado na aba Sobre. "
    };
    vm.message = "Procurando...";

    vm.getData = function (position) {
       vm.lat = position.coords.latitude,
       vm.lng = position.coords.longitude;
      vm.message = "Pesquisa por lugares próximos";
      loc8rData.locationByCoords(vm.lat, vm.lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "Nenhuma localização proxima a você foi cadastrada";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Existe algum erro, tente mais tarde";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Esse navegador não suporta geolocalização";
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


