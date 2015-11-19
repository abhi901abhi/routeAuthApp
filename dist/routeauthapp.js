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
})();;(function () {
    'use strict';
    angular.module('tonyapp.configs',[])
    .config(blockuiconfiguration);

    function blockuiconfiguration(blockUIConfig) {
        // Change the default overlay message
        blockUIConfig.message = 'Please wait!';
        // Change the default delay to 100ms before the blocking is visible
        blockUIConfig.delay = 100;


    }

})();;(function () {
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
    'tonyapp.directives',
    'tonyapp.services'



    ]);

})();
;(function() {
    angular
        .module('tonyapp', [])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/login', {
                    templateUrl: 'src/app/login/login.html'
                });
            }
        ]);
})();
;
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
;(function() {
    angular
        .module('tonyapp.dashboard', [])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/home', {
                    templateUrl: 'src/app/home/dashboard.html'
                });
            }
        ]);
})();
;(function() {
    angular
        .module('tonyapp.login', [])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/login', {
                    templateUrl: 'src/app/login/login.html',
                    controller: 'loginCtrl'
                });
            }
        ]);
})();
;(function() {

    angular.module('tonyapp.login').controller('loginCtrl', loginCtrl);

    function loginCtrl($scope, $location) {
        $scope.login = function() {
            $location.path('/home');
        };
    }

})();
;;(function () {
    angular
    .module('tonyapp.ourservices', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/services', {
                templateUrl: 'src/app/ourservices/ourservices.html'
            })
             .otherwise({ redirectTo: '/login' });
        } ]);
})();;(function () {
    angular
    .module('tonyapp.pricing', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/pricing', {
                templateUrl: 'src/app/pricing/pricing.html'
            })
            .otherwise({ redirectTo: '/login' });
        } ]);
})();;(function() {
    angular.module('tonyapp.monitormode', [])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/productionQueue/monitormode', {
                    templateUrl: 'src/app/productionQueue/monitormode/monitormode.html',
                    controller: 'monitormodeCtrl'
                });
            }
        ]);

})();
;(function() {

    angular.module('tonyapp.monitormode').controller('monitormodeCtrl', monitormodeCtrl);

    function monitormodeCtrl($scope, $window, $timeout, $interval, $location, $sce, productionQueueService, blockUI) {


        var jobsEnteredIntoTheQueue = ' New jobs enetered into queue ';
        var jobsReleasedFromTheQueue = ' jobs released from the queue ';

        $scope.pollingIntervalFrequency = 5000;
        //log messages
        $scope.messages = [];

        $scope.enableLog = true;

        // store the interval promise in this variable
        var promiseFromIntervel;
        var promiseFromProgInterval;

        // Data Bucket
        $scope.queues = {
            data: []
        };

        //Reponse from server API
        var reponseFromServer;

        function progressBarManipulation() {
            if ($scope.progWidth < 110) {
                $scope.progWidth = $scope.progWidth + 10;
            } else {
                $interval.cancel(promiseFromProgInterval);
                $scope.queues.data = reponseFromServer;
                $scope.progHide = true;
            }
        }

        function fetchProductionLinesDataSnapShot() {

            var promise = productionQueueService.getLinesData();
            logIt('Called Server');

            promise.then(function(response) {
                logIt('Recieved Data From Server');
                $scope.progHide = false;
                $scope.progWidth = 1;
                reponseFromServer = response;
                promiseFromProgInterval = $interval(progressBarManipulation, 500);
            });

        }

        // start the interval
        $scope.startPolling = function() {
            $scope.progWidth = 10;

            // stop running interval if any to avoid two intervals running at same time
            $scope.stopPolling();

            // store the interval promise
            promiseFromIntervel = $interval(fetchProductionLinesDataSnapShot, $scope.pollingIntervalFrequency);
            logIt('started polling');
        };

        // stop the interval
        $scope.stopPolling = function() {
            $interval.cancel(promiseFromIntervel);
        };

        // start the interval by default
        $scope.startPolling();


        //Watch the change in Production Lines Data Snapshot - Start
        $scope.$watch('queues.data', function(newVal, oldVal) {
            $scope.nnnn = newVal;
            $scope.oooo = oldVal;
            if ($scope.enableLog) {
                if (oldVal.length !== 0 && newVal.length !== 0) {
                    for (var i = 0; i < newVal.length; i++) {
                        var newItem = newVal[i];
                        var oldItem = oldVal[i];
                        snapShotsGapAnalysis(newItem, oldItem);
                    }
                }
            } // end of if enableLog
        });
        //Watch the change in Production Lines Data Snapshot - End

        // stops the interval when the scope is destroyed,
        $scope.$on('$destroy', function() {
            $scope.stopPolling();
        });


        function snapShotsGapAnalysis(newItem, oldItem) {
            if (newItem.lineName == oldItem.lineName) {
                if (newItem.jobsInQueue != oldItem.jobsInQueue) {
                    var difference = newItem.jobsInQueue - oldItem.jobsInQueue;
                    var message = {};
                    if (difference > 0) {
                        message = newItem.lineName + ' : ' + difference + jobsEnteredIntoTheQueue;
                    } else {
                        message = newItem.lineName + ' : ' + Math.abs(difference) + jobsReleasedFromTheQueue;
                    }
                    //Insert the log message at 0th index
                    logIt(message);
                }
            }
        } //end of snapShotsGapAnalysis

        $scope.runLog = function() {
            $scope.enableLog = true;
            var playBtn = $sce.trustAsHtml('<span class="glyphicon glyphicon-play"></span>');
            logIt('Logs Started ' + playBtn);
        };
        $scope.pauseLog = function() {
            var pauseBtn = $sce.trustAsHtml('<span class="glyphicon glyphicon-pause"></span>');
            logIt('Logs Paused ' + pauseBtn);
            $scope.enableLog = false;
        };

        function logIt(msg) {
            if ($scope.enableLog) {
                $scope.messages.splice(0, 0, {
                    time: dateTime(),
                    text: msg
                });
                console.log(msg);
            }
        }

        function dateTime() {
            return new Date() + " UTC";
        }
    } //End of Controller

})();
;(function () {
    angular.module('tonyapp.pq', ['tonyapp.monitormode']);

})();
;(function(){
    angular.module('tonyapp.directives',[])
    .directive('restrictInput', [function(){

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var ele = element[0];
                var regex = RegExp(attrs.restrictInput);
                var value = ele.value;

                ele.addEventListener('keyup',function(e){
                    if (regex.test(ele.value)){
                        value = ele.value;
                    }else{
                        ele.value = value;
                    }
                });
            }
        };
    }]);    
}());;(function () {

    angular.module('tonyapp.services', [])
        .factory('productionQueueService', productionQueueService);

    function productionQueueService($q, $timeout) {

        var getLinesData = function () {
            var deferred = $q.defer();
            var data = [{
                lineName: 'DefaultLine',
                jobsInQueue: Math.floor((Math.random() * 666) + 1),
                phases: [{
                    code: 'PI',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: true
                }, {
                    code: 'RX',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: false

                }, {
                    code: 'TT',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: true

                }],
                overFlow: -Math.floor((Math.random() * 6666) + 1)

            }, {
                lineName: 'Line2',
                jobsInQueue: Math.floor((Math.random() * 666) + 1),
                phases: [{
                    code: 'PI',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: true
                }, {
                    code: 'RX',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: false

                }, {
                    code: 'TT',
                    noOfJobs: Math.floor((Math.random() * 666) + 1),
                    enabledInProductionQueue: true
                }],
                overFlow: -Math.floor((Math.random() * 6666) + 1)
            }];

            $timeout(function () {
                deferred.resolve(data);
            }, 3000);
            return deferred.promise;
        };

        return {
            getLinesData: getLinesData
        };
    }
})();