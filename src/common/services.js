(function () {

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
        }

        return {
            getLinesData: getLinesData
        }
    }
})();