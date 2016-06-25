/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationFactory', AuthenticationFactory);

        AuthenticationFactory.$inject =  ['$resource'];

        function AuthenticationFactory($resource) {
            return $resource("http://104.196.61.177/autheo/api/users/archivista/tokens", {}, {
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
