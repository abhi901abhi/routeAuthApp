
(function () {

    angular.module('tonyapp.run', []).run(function ($rootScope, $location, $routeParams, blockUI) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            blockUI.start();
            // Look at $location.path()
            // If it isn't what you want, toggle showSideBar...
            if ($location.path() == '/login') {
                $rootScope.showNavigators = false;

            }
            else {
                $rootScope.showNavigators = true;
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            blockUI.stop();
        });

        $rootScope.$on('$routeChangeError', function (event, current) {
            blockUI.reset();
        });
    });
})();
