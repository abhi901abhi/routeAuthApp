(function () {
    angular
    .module('tonyapp.dashboard', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'src/app/home/dashboard.html'
            })           
        } ]);
})();