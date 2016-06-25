/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AuthenticationFactory', '$window', 'SessionService', '$sessionStorage'];

    function LoginController($scope, AuthenticationFactory, $window, SessionService, $sessionStorage) {

            // callback for ng-click 'createNewUser':
            $scope.ok = function (user, pass) {

                var rta = AuthenticationFactory.auth(
                    {username: user, password:sha256(pass), organizationId: "telefonica"}
                );
                rta.$promise.then(function(data) {
                    SessionService.setAuthorizationToken(data.tokenValue);
                    SessionService.setAuthorizationUserName(data.username);
                    SessionService.setAuthorizationUserOrganization(data.organization);
                    SessionService.setAuthorizationUserRole(data.businessRole);
                    SessionService.setAuthorizationSystemRole(data.systemRole);
                    SessionService.setAuthorizationImage(data.image);
                    $sessionStorage.EEUserImage = data.image;
                });
            };

    }

}
)();
