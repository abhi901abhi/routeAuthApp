(function () {

    angular.module('tonyapp.monitormode').controller('monitormodeCtrl', monitormodeCtrl);

    function monitormodeCtrl($scope, $window, $timeout, $location, productionQueueService, blockUI) {
        $scope.queues = {
            data: []
        };
        $scope.messages = [];



        $scope.$watch('queues.data', function (newVal, oldVal) {


            $scope.nnnn = newVal;
            $scope.oooo = oldVal;

            if (oldVal.length != 0 && newVal.length != 0) {
                for (var i = 0; i < newVal.length; i++) {
                    var newItem = newVal[i];
                    var oldItem = oldVal[i];

                    if (newItem.lineName == oldItem.lineName) {
                        if (newItem.jobsInQueue != oldItem.jobsInQueue) {
                            var difference = newItem.jobsInQueue - oldItem.jobsInQueue;
                            if (difference > 0) {
                                var message = {
                                    time: new Date() + " UTC",
                                    text: newItem.lineName + ' : ' + difference + ' New jobs enetered into queue '
                                };
                            }
                            else {
                                var message = {
                                    time: new Date() + " UTC",
                                    text: newItem.lineName + ' : ' + Math.abs(difference) + ' jobs released from the queue '
                                };
                            }
                            $scope.messages.splice(0, 0, message);
                        }
                    }
                }
            }



        });


        var timeOutPromise;

        (function tick() {
            var promise = productionQueueService.getLinesData();
            promise.then(function (response) {
                $scope.queues.data = response;
                timeOutPromise = $timeout(tick, 5000);
                var message = {
                    time: new Date() + " UTC",
                    text: 'Data Refreshed'
                };
                console.log('data refreshed');
                $scope.messages.splice(0, 0, message);
            });
        })();

        // Cancel interval on page changes
        $scope.$on('$destroy', function () {
            if (angular.isDefined(timeOutPromise)) {
                $timeout.cancel(timeOutPromise);
                timeOutPromise = undefined;
            }
        });


        $scope.getPrductionLinesData = function () {
            //var myBlock = blockUI.instances.get('myLinesTable');
            //myBlock.start("Loading Queues");
            $scope.progHide = false;
            $scope.progWidth = 20;
            $timeout(function () {
                $scope.progWidth = 50;
            }, 500);
            $timeout(function () {
                $scope.progWidth = 70;
            }, 1000);
            var promise = productionQueueService.getLinesData();
            promise.then(function (response) {
                $timeout(function () {
                    $scope.progWidth = 82;
                }, 1500);
                $timeout(function () {
                    $scope.progWidth = 100;
                }, 2000);
                $timeout(function () {
                    $scope.queues.data = response;
                    $scope.progHide = true;
                }, 2100);

                // myBlock.stop();
            });

            //            myBlock.done(function () {

            //            });

        }

        $scope.getPrductionLinesData();
    }

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