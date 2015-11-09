(function () {
    angular.module('tonyapp', [
    //external
    'ngRoute',
    'blockUI',
    'ngSanitize',
    'ngAnimate',
    //application level
    'tonyapp.run',
    'tonyapp.login',
    'tonyapp.dashboard',
    'tonyapp.ourservices',
    'tonyapp.pricing',
    'tonyapp.about',
    'tonyapp.pq',

    //common 
    'tonyapp.configs',
    'tonyapp.services'


    ]);

})();
