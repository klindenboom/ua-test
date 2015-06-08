 angular.module("theClub", ["customFilters"])
     .constant("pageActiveClass", "active")
     .constant("disabledClass", "disabled")
     .controller("TheClubController", function($scope, $filter, memDataFactory, pageActiveClass, disabledClass) {
         $scope.data = [];
         $scope.filteredData = [];
         $scope.page = 1;
         $scope.pageSizes = [10, 20, 50];
         $scope.pageSize = $scope.pageSizes[0];
         $scope.pageCount = null;
         $scope.orderByField = 'state';
         $scope.reverseSort = false;
         $scope.searchQuery = '';
         $scope.member = null;

         //call the factory service to get data
         memDataFactory.getData()
             .success(function(data) {
                 $scope.data = $scope.filteredData = data;
             });
         
         $scope.setPage = function(n) {
             $scope.page = n;
         };
         $scope.setPageCount = function(n) {
             $scope.pageSize = n;
             $scope.pageCount = Math.ceil($scope.data.length / $scope.pageSize);
             if ($scope.page > $scope.pageCount) $scope.page = $scope.pageCount; //make sure we didn't go out of bounds.
         };
         $scope.prevPage = function() {
             if ($scope.page > 1) {
                 $scope.page--;
             }
         };
         $scope.nextPage = function() {
             if ($scope.page < $scope.pageCount) {
                 $scope.page++;
             }
         };
         $scope.setUser = function(m) {
             $scope.member = m
         }
         $scope.isCurrentPage = function(p) {
             return $scope.page == p ? pageActiveClass : "";
         }
         $scope.isLastPage = function() {
             return ($scope.page == $scope.pageCount || $scope.pageCount == 0) ? disabledClass : "";
         }
         $scope.isFirstPage = function() {
             return ($scope.page == 1) ? disabledClass : "";
         }
         $scope.isDetailShowing = function() {
             return $scope.member ? "" : disabledClass;
         }
         $scope.getSortOrder = function(b) {
             return $scope.reverseSort == b ? disabledClass : "";
         }
         $scope.$watch('searchQuery', function(term) {
             //if there is a seach query filter data 
             $scope.filteredData = $filter('searchFor')($scope.data, term);
             //we have search results 
             if ($scope.filteredData.length < $scope.data.length) $scope.page = 1;
             //update the page count based on filtered data
             $scope.pageCount = Math.ceil($scope.filteredData.length / $scope.pageSize);
         });
     });