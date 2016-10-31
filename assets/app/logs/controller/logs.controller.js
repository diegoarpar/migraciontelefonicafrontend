/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('LogsController', LogsController);

        LogsController.$inject =
                    ['$scope', '$location', 'LogsServices', 'MetadataService','ExpedienteService','SessionService','ApiDocumentManager','$http','$timeout', '$q','DocumentsService'];

        function LogsController($scope, $location, LogsServices, MetadataService,ExpedienteService,SessionService,ApiDocumentManager,$http,$timeout,$q,DocumentsService) {

            $scope.startDate = new Date();
            $scope.endDate = new Date();
            $scope.digital=[];
            $scope.consultarLogs = function () {
                    LogsServices.getLog({"startDate": $scope.startDate,"endDate": $scope.endDate}).$promise.then(function(data){
                        $scope.digital = data;
                    });
            };

            $scope.getTemplate = function (c) {
                if($scope.digital.selected){
                    if (c.id === $scope.digital.selected.id) return 'edit';
                    else return 'display';
                }
                else return 'display';
            };
        };

    }
)();
