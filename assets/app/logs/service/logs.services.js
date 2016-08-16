/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('DocumentsService', DocumentsService);

        DocumentsService.$inject =  ["$resource", 'SessionService','ApiServerSide'];

        function DocumentsService($resource, SessionService,ApiServerSide) {
            var electronicRecords = ApiServerSide.url+"migracion/";
            var headers = {'Content-Type': 'application/json', 'Accept': 'application/json','Authorization':"Bearer "+SessionService.getAuthorizationToken()};
            var url = electronicRecords + "docs/"
                , param = {}
                , functions = {
                    createDocument: {
                        method: "POST",
                        params : {},
                        url: url + "insert-file",
                        headers:headers
                    }
            };

            return $resource(url,param,functions);

        }

    }
)();
