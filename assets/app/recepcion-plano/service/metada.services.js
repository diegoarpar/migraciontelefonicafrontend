/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('MetadataService', MetadataService);

        MetadataService.$inject =  ["$resource", 'SessionService','ApiRecordManager'];

        function MetadataService($resource, SessionService,ApiRecordManager) {
            var recordManager = ApiRecordManager.url+"record-manager/api";
            var headers = {'Accept': 'application/json','Authorization':SessionService.getAuthorizationToken()};
            var url = recordManager + "/metadata"
                , param = {}
                , functions = {
                getSubgroupMetadata: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/subgroup",
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
