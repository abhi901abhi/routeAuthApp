(function () {
    angular.module('tonyapp.monitormode', [])
      .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/productionQueue/monitormode', {
                templateUrl: 'src/app/productionQueue/monitormode/monitormode.html',
                controller: 'monitormodeCtrl'
            })
        } ]);

})();
