/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('LogsController', LogsController);

        LogsController.$inject =
                    ['$scope', '$location', 'SeriesService', 'MetadataService','ExpedienteService','SessionService','ApiDocumentManager','$http','$timeout', '$q','DocumentsService'];

        function LogsController($scope, $location, SeriesService, MetadataService,ExpedienteService,SessionService,ApiDocumentManager,$http,$timeout,$q,DocumentsService) {

            $scope.myDate = new Date();
              $scope.minDate = new Date(
                  $scope.myDate.getFullYear(),
                  $scope.myDate.getMonth() - 2,
                  $scope.myDate.getDate());
              $scope.maxDate = new Date(
                  $scope.myDate.getFullYear(),
                  $scope.myDate.getMonth() + 2,
                  $scope.myDate.getDate());





        };


        function isEmpty(a) {
            return null == a
        }
    }
)();
