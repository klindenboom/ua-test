angular.module('customFilters', [])
    //search filter gets search term from input field and attempst to match members
    //if no members found the entire data array is returned
    .filter('searchFor', function() {
        return function(data, searchTerm) {
            if (angular.isArray(data) && angular.isString(searchTerm) && searchTerm.length) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].first_name.toLowerCase() == searchTerm.toLowerCase() || data[i].last_name.toLowerCase() == searchTerm.toLowerCase()) {
                        result.push(data[i]);
                    }
                }
                if (result.length) return result;
                else return data;
            } else {
                return data;
            }
        }
    })
    //returns the items in the data array for the current page
    .filter('pageIndex', function($filter) {
        return function(data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    return $filter('limitTo')(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        }
    })
    //counts how many page buttons are required and puts then in an array for ng-repeat
    .filter('pageCount', function() {
        return function(data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    });