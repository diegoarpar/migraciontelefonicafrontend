/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('LogsServices', LogsServices);

        LogsServices.$inject =  ["$resource", 'SessionService','ApiServerSide'];

        function LogsServices($resource, SessionService,ApiServerSide) {
            var electronicRecords = ApiServerSide.url+"migracion/";
            var headers = {'Content-Type': 'application/json', 'Accept': 'application/json','Authorization':"Bearer "+SessionService.getAuthorizationToken()};
            var url = electronicRecords + "docs/"
                , param = {}
                , functions = {
                    insertLog: {
                          method: "POST",
                          params : {},
                          url: url + "log",
                          headers:headers
                    },getLog: {
                       method: "GET",
                       isArray: true,
                       params : {},
                       url: url + "log",
                       headers:headers
                   }
            };

            return $resource(url,param,functions);

        }

    }
)();
