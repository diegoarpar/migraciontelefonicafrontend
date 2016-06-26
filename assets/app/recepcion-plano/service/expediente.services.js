/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('ExpedienteService', ExpedienteService);

        ExpedienteService.$inject =  ["$resource", 'SessionService','ApiDocumentManager'];

        function ExpedienteService($resource, SessionService,ApiDocumentManager) {
            var electronicRecords = ApiDocumentManager.url+"document-manager/api/";
            var headers = {'Accept': 'application/json','Authorization':SessionService.getAuthorizationToken()};
            var url = electronicRecords + "/electronic-records"
                , param = {}
                , functions = {
                getExpedient: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/query",
                    headers:headers
                },
                getDocumentTypeMetadata: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/documentType",
                    headers:headers
                },
                getOperationMetadataForDocType: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/operation_documentType/:documentTypeCode",
                    headers:headers
                },
                getChildrenMetadata: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/children-metadata",
                    headers:headers
                },
                createChildrenMetadata: {
                    method: "POST",
                    url: url + "/children-metadata",
                    headers:headers
                },
                updateChildrenMetadata: {
                    method: "PUT",
                    url: url + "/children-metadata",
                    headers:headers
                }
            };

            return $resource(url,param,functions);

        }

    }
)();
