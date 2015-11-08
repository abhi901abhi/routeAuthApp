(function () {
    angular
    .module('tonyapp.login', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'src/app/login/login.html',
                controller: 'loginCtrl'
            })
        } ]);
})();