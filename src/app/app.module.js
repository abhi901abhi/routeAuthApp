(function () {
    angular.module('tonyapp', [
    //external
    'ngRoute',
    //application level
    'tonyapp.run',
    'tonyapp.login',
    'tonyapp.dashboard',
    'tonyapp.ourservices',
    'tonyapp.pricing',
    'tonyapp.about'
    ]);

})();
