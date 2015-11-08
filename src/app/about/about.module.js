(function () {
    angular
    .module('tonyapp.about', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/about', {
                templateUrl: 'src/app/about/about.html'
            })
            .otherwise({ redirectTo: '/login' });
        } ]);
})();