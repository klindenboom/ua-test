angular.module('theClub')
    .factory('memDataFactory', ['$http', function($http) {
        return {
            getData: function() {
                return $http.get('data/sample-data.json');
            }
        };
    }]);
