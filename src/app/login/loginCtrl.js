(function () {

    angular.module('tonyapp.login').controller('loginCtrl', loginCtrl);
    function loginCtrl($scope, $location) {
        $scope.login = function () {
            $location.path('/home');
        }
    }

})();