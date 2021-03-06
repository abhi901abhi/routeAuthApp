﻿(function () {

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

        function progressBarManipulation()
        {
            if($scope.progWidth<110)
            {
                $scope.progWidth =  $scope.progWidth+10;
            }
            else
            {
                 $interval.cancel(promiseFromProgInterval); 
                 $scope.queues.data = reponseFromServer;
                 $scope.progHide = true;
            }
        }

        function fetchProductionLinesDataSnapShot() {
            
            var promise = productionQueueService.getLinesData();
            logIt('Called Server');

            promise.then(function (response) {
                logIt('Recieved Data From Server');
                 $scope.progHide = false;
                 $scope.progWidth=1;
                 reponseFromServer=response;
                promiseFromProgInterval= $interval(progressBarManipulation, 500);          
            });

        }

        // start the interval
        $scope.startPolling = function () {
            $scope.progWidth = 10;

            // stop running interval if any to avoid two intervals running at same time
            $scope.stopPolling();

            // store the interval promise
            promiseFromIntervel = $interval(fetchProductionLinesDataSnapShot, $scope.pollingIntervalFrequency);
            logIt('started polling');
        };

        // stop the interval
        $scope.stopPolling = function () {
            $interval.cancel(promiseFromIntervel);
        };

        // start the interval by default
        $scope.startPolling();


        //Watch the change in Production Lines Data Snapshot - Start
        $scope.$watch('queues.data', function (newVal, oldVal) {
            $scope.nnnn = newVal;
            $scope.oooo = oldVal;
            if ($scope.enableLog) {
                if (oldVal.length != 0 && newVal.length != 0) {
                    for (var i = 0; i < newVal.length; i++) {
                        var newItem = newVal[i];
                        var oldItem = oldVal[i];
                        snapShotsGapAnalysis(newItem, oldItem);
                    }
                }
            }  // end of if enableLog
        });
        //Watch the change in Production Lines Data Snapshot - End

        // stops the interval when the scope is destroyed,
        $scope.$on('$destroy', function () {
            $scope.stopPolling();
        });


        function snapShotsGapAnalysis(newItem, oldItem) {
            if (newItem.lineName == oldItem.lineName) {
                if (newItem.jobsInQueue != oldItem.jobsInQueue) {
                    var difference = newItem.jobsInQueue - oldItem.jobsInQueue;
                    var message = {};
                    if (difference > 0) {
                        message = newItem.lineName + ' : ' + difference + jobsEnteredIntoTheQueue;
                    }
                    else {
                        message = newItem.lineName + ' : ' + Math.abs(difference) + jobsReleasedFromTheQueue;
                    }
                    //Insert the log message at 0th index
                    logIt(message);
                }
            }
        } //end of snapShotsGapAnalysis

        $scope.runLog = function () {
            $scope.enableLog = true;
            var playBtn = $sce.trustAsHtml('<span class="glyphicon glyphicon-play"></span>');
            logIt('Logs Started ' + playBtn);
        };
        $scope.pauseLog = function () {
            var pauseBtn = $sce.trustAsHtml('<span class="glyphicon glyphicon-pause"></span>');
            logIt('Logs Paused ' + pauseBtn);
            $scope.enableLog = false;
        };
        function logIt(msg) {
            if ($scope.enableLog) {
                $scope.messages.splice(0, 0, { time: dateTime(), text: msg });
                console.log(msg);
            }
        }
        function dateTime() {
            return new Date() + " UTC";
        }
    } //End of Controller

})();


//$scope.queues = {
//    data: [{
//        lineName: 'DefaultLine',
//        jobsInQueue: 30,
//        phases: [{
//            code: 'PI',
//            noOfJobs: 20,
//            enabledInProductionQueue: true
//        }, {
//            code: 'RX',
//            noOfJobs: 30,
//            enabledInProductionQueue: false

//        }, {
//            code: 'TT',
//            noOfJobs: 33,
//            enabledInProductionQueue: true

//        }],
//        overFlow: -970

//    }, {
//        lineName: 'Line2',
//        jobsInQueue: 55,
//        phases: [{
//            code: 'PI',
//            noOfJobs: 66,
//            enabledInProductionQueue: true
//        }, {
//            code: 'RX',
//            noOfJobs: 88,
//            enabledInProductionQueue: false

//        }, {
//            code: 'TT',
//            noOfJobs: 99,
//            enabledInProductionQueue: true
//        }],
//        overFlow: -950
//    }]
//};


//        //Polling - start
//        var timeOutPromise;

//        (function tick() {
//            var promise = productionQueueService.getLinesData();
//            promise.then(function (response) {
//                $scope.queues.data = response;
//                timeOutPromise = $timeout(tick, 5000);
//                var message = {
//                    time: new Date() + " UTC",
//                    text: 'Data Refreshed'
//                };
//                $scope.messages.splice(0, 0, message);
//            });
//        })();
//        //Polling - End

//        // Cancel polling on page changes
//        $scope.$on('$destroy', function () {
//            if (angular.isDefined(timeOutPromise)) {
//                $timeout.cancel(timeOutPromise);
//                timeOutPromise = undefined;
//            }
//        });