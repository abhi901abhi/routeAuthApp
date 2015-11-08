(function () {
    angular
    .module('tonyapp', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'src/app/login/login.html'
            })
        } ]);
})();