/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('TrdSeriesService', TrdSeriesService);

        TrdSeriesService.$inject =  ['$resource', 'SessionService'];

        function TrdSeriesService($resource, SessionService) {

            var recordManager = "http://104.196.61.177/record-manager/api";
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
                }
            };

            return $resource(url,param,functions);

        }

    }
)();
