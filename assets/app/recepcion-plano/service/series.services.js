/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('SeriesService', SeriesService);

        SeriesService.$inject =  ['$resource', 'SessionService','ApiRecordManager'];

        function SeriesService($resource, SessionService,ApiRecordManager) {
            var recordManager = ApiRecordManager.url+"  record-manager/api";
            var headers = {'Accept': 'application/json','Authorization':SessionService.getAuthorizationToken()};
            var url = recordManager + "/trds"
                , param = {}
                , functions = {
                getAllTrds: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/all",
                    headers:headers
                },
                getAllTrdsPruned: {
                    method: "GET",
                    isArray: !0,
                    url:  url + "/all-pruned",
                    headers:headers
                },
                getDocTypesBySubSeries: {
                    method: "GET",
                    params: {
                        trd: "@trd",
                        series: "@series",
                        subSeries: "@subSeries"
                    },
                    isArray: !0,
                    url: url + "/:trd/series/:series/subSeries/:subSeries/docTypes",
                    headers:headers
                },
                getDocTypesBySeries: {
                    method: "GET",
                    params: {
                        trd: "@trd",
                        series: "@series"
                    },
                    isArray: !0,
                    url: url + "/:trd/series/:series/docTypes",
                    headers:headers
                }
            };

            return $resource(url,param,functions);

        }

    }
)();
