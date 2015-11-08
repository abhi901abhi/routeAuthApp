
(function () {

    angular.module('tonyapp.run', []).run(function ($rootScope, $location, $routeParams) {
        debugger;
       
        $rootScope.$on('$routeChangeStart', function (event,next, current) {
            debugger;
            // Look at $location.path()
            // If it isn't what you want, toggle showSideBar...
            if ($location.path() == '/login') {
                $rootScope.showNavigators = false;

            }
            else {
                $rootScope.showNavigators = true;
            }
        });
    });
})();
