/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationFactory', AuthenticationFactory);

        AuthenticationFactory.$inject =  ['$resource','ApiAutentication'];

        function AuthenticationFactory($resource,ApiAutentication) {
            return $resource(ApiAutentication.url+"/autheo/api/users/archivista/tokens", {}, {
                auth: {
                    method: 'POST',
                    isArray:false,
                    params: {
                        username: '@user',
                        password:'@pass',
                        organizationId: '@organizationId'
                    }
                }

            })
        }

    }
)();
