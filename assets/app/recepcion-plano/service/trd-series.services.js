/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('TrdSeriesService', TrdSeriesService);

        TrdSeriesService.$inject =  ['$resource', 'SessionService','ApiRecordManager'];

        function TrdSeriesService($resource, SessionService,ApiRecordManager) {

            var recordManager = ApiRecordManager.url+"record-manager/api";
            var url2 = recordManager + "/trds";
            var headers = {'Accept': 'application/json','Authorization':SessionService.getAuthorizationToken()};

            var url = recordManager + "/trds-access-controls"
                , param = {}
                , functions = {
                updateConfidentialityLevel: {
                    method: "PUT",
                    url: url + "/:id/confidentiality",
                    headers: headers
                },
                getConfidentialityLevel: {
                    method: "GET",
                    url: url + "/:id/confidentiality",
                    headers: headers
                },

                getAccessTrdTrees: {
                    method: "GET",
                    url: url + "/trd-access-trees/:username",
                    isArray: !0,
                    headers: headers
                },

                saveUsersAccessTrd: {
                    method: "POST",
                    url: url + "/:idTrd/user-access-control",
                    headers: headers
                },
                saveUsersAccessProfile: {
                    method: "POST",
                    url: url + "/:id/user-access-control-profile",
                    headers: headers
                },
                getUsersAccessProfile: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/user-access-control-profile",
                    headers: headers
                },
                deleteUserAccessProfile: {
                    method: "POST",
                    url: url + "/:id/user-access-control-profile/delete",
                    headers: headers
                },
                getTrdResponsibles: {
                    method: "GET",
                    url: url + "/:idTrd/responsibles",
                    isArray: !0,
                    headers: headers
                },
                getTrdByResponsibles: {
                    method: "GET",
                    url: url + "/:treeType/:userName/get-trd-responsible",
                    isArray: !0,
                    headers: headers
                },
                updateResponsibles: {
                    method: "PUT",
                    url: url + "/:idTrd/responsibles",
                    headers: headers
                },
                getTreeNodeChildsByCode: {
                    method: "GET",
                    isArray: !0,
                    url: url2 + "/:treeNodeCode/tree-node-childs"
                },
                getTrdTrees: {
                    method: "GET",
                    url: recordManager + "/trds/TRD/get-tree-type",
                    isArray: !0,
                    headers: headers
                    }
                ,getSeries: {
                      method: "GET",
                      url: recordManager + "/trds/:idSerie/get-tree-childrens/SERIE",
                      isArray: !0,
                      headers: headers
                  }
               ,getSubSeries: {
                        method: "GET",
                        url: recordManager + "/trds/:idSubSerie/get-tree-childrens/SUB-SERIE",
                        isArray: !0,
                        headers: headers
                    }
                ,getDocumenType: {
                     method: "GET",
                     url: recordManager + "/trds/:idSubSerie/get-tree-childrens/DOCUMENT-TYPE",
                     isArray: !0,
                     headers: headers
                 },
                 getMetadata: {
                      method: "GET",
                      url: recordManager + "/metadata/operation_documentType/:documentType",
                      isArray: !0,
                      headers: headers
                  }
            };

            return $resource(url,param,functions);

        }

    }
)();
