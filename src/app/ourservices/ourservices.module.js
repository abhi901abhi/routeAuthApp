(function () {
    angular
    .module('tonyapp.ourservices', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/services', {
                templateUrl: 'src/app/ourservices/ourservices.html'
            })
             .otherwise({ redirectTo: '/login' });
        } ]);
})();