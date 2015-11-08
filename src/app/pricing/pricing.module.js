(function () {
    angular
    .module('tonyapp.pricing', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/pricing', {
                templateUrl: 'src/app/pricing/pricing.html'
            })
            .otherwise({ redirectTo: '/login' });
        } ]);
})();