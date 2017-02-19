(function () {

  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'Qual a distância?'
    };
    vm.main = {
      content: 'Esse site foi construido usando o conjunto de tecnologias MEAN, sendo elas MongoDB, Express, AngularJS(1), NodeJS. '
    };
  }

})();