

angular.module('loc8rApp')
.controller('cadLocalCtrl', cadLocalCtrlFunc);

cadLocalCtrlFunc.$inject = ['$modalInstance', 'locationData', 'loc8rData'];
function cadLocalCtrlFunc ($modalInstance, locationData, loc8rData){
var vm = this;
vm.locationData = locationData;


console.log("location log" + vm.locationData.locationLog);


//vm.formData.longitude  = vm.locationData.locationLog;


 vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.endereco || !vm.formData.curiosidades
       || !vm.formData.longitude || !vm.formData.latitude) {
        vm.formError = "Todos os campos devem ser preenchidos";
        return false;
      } else {
        vm.doAddCad(vm.formData);
      }
    };



vm.doAddCad = function (formData) {
      loc8rData.createLocation( {
        name : formData.name,
        address : formData.endereco,
        facilities : formData.curiosidades,
        lng: formData.longitude ,
        lat: formData.latitude

      })
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Cadastro não efetuado, tente novamente ";
        });
      return false;
    };




   vm.modal = {
      close : function (result) {
        console.log("objeto retornado ok"  , result);
        $modalInstance.close(result);

      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };

} // fim  function cadLocalCtrlFunc





