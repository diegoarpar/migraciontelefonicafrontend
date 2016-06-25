/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('SeriesService', SeriesService);

        SeriesService.$inject =  ['$resource','ApiGarantias','$rootScope','$window','SessionService'];

        function SeriesService($resource,ApiGarantias,$rootScope,$window,$scope,SessionService) {
            return $resource('http://104.196.61.177/record-manager/api/trds/all-pruned', {}, {
                create: { method: 'POST',  headers:{'Accept': 'application/json','Authorization':SessionService.getAuthorizationToken()},
                        transformResponse: function(res, headers) {
                            //var data = angular.fromJson(res);
                            return res;
                        }
                        },
                show: { method: 'GET', isArray:true, params: {processName: '@processName',dateStart:'@dateEnd',dateEnd:'@dateEnd'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}},
                update: { method: 'PUT', isArray:false, params: {}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                        transformResponse: function(res, headers) {
                            //var data = angular.fromJson(res);
                            return res;
                        }
                },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
