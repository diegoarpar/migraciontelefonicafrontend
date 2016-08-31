/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('UsersService', UsersService);

        UsersService.$inject =  ['$resource','ApiAutentication', 'SessionService'];

        function UsersService($resource, ApiAutentication, SessionService) {
            var recordManager = ApiAutentication.url;
            var url = recordManager + "auth-manager/api/users"
                , param = {}
                , functions = {
                authenticateFunctionary: {
                    method: "POST",
                    url: url + "/:username/tokens"
                },
                getUser: {
                    method: "GET",
                    url: url + "/:username"


                },
                getUserImage: {
                    method: "GET",
                    url: url + "/:username/:tokenValue/image"
                },
                recoverPassword: {
                    method: "PUT",
                    url: url + "/recovery-password"
                },
                requestRecoverPassword: {
                    method: "POST",
                    url: url + "/request-recovery-password"
                },
                logOutUser: {
                    method: "DELETE",
                    url: url + "/tokens/:tokenValue/cache"
                },
                getUsersListExcludeRole: {
                    method: "GET",
                    url: url + "/exclude-role/:systemRole"
                },
                getUsersLike: {
                    method: "GET",
                    isArray: !0,
                    url: url + "/:name/:documentNumber/like"
                }
            };

            return $resource(url,param,functions);

        }

    }
)();
