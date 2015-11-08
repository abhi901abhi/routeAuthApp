(function () {
    'use strict';
    angular.module('tonyapp.configs',[])
    .config(blockuiconfiguration);

    function blockuiconfiguration(blockUIConfig) {
        // Change the default overlay message
        blockUIConfig.message = 'Please wait!';
        // Change the default delay to 100ms before the blocking is visible
        blockUIConfig.delay = 100;


    }

})();