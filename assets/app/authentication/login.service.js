/**
 * Created by joag on 9/06/16.
 */

(function(){
    'use strict';
    angular.module("wpc")
        .factory('Login', Login);

    Login.$inject =  [ 'UsersService', '$window', 'SessionService', '$sessionStorage', '$q'];

    function Login( UsersService, $window, SessionService, $sessionStorage, $q) {
            var $scope = {};
          // callback for ng-click 'createNewUser':
            $scope.autenticado=false;

            var functions = {
                ok : ok
            };

            if(SessionService.getAuthorizationToken())$scope.autenticado=true;

            function ok() {
                var deferred = $q.defer();

                $scope.username = SessionService.getUser();
                $scope.password = SessionService.getPassword();

                var rta = UsersService.authenticateFunctionary({
                    username: $scope.username
                }, {
                    username: $scope.username,
                    password: $scope.password,
                    organizationId: "telefonica"
                });
                rta.$promise.then(function login(data) {
                    data && (SessionService.setAuthorizationToken(data.tokenValue),
                        SessionService.setAuthorizationUserOrganization(data.organization),
                        UsersService.getUser({
                            username: $scope.username
                        }, {}, function login_full(data) {
                            if ($scope.isLoading = !1, data) {
                                SessionService.setAuthorizationUserName(data.username),
                                    SessionService.setAuthorizationUserRoles(data.businessRolesIds),
                                    SessionService.setAuthorizationSystemRoles(data.systemRolesIds),
                                    SessionService.setAuthorizationImage(data.image),
                                    SessionService.setAuthorizationUserDocumentType(data.userDocumentType),
                                    SessionService.setAuthorizationUserDocumentNumber(data.userDocumentNumber);
                                var f = data.systemRolesIds;
                                deferred.resolve('ok');
                            }
                        }, function error(b) {
                            SessionService.setAuthorizationToken("");
                            alert("Usuario o Contraseña incorrecta");
                            SessionService.removeCookie();
                            deferred.reject('ok');
                        }))
                }, function error(b) {
                    SessionService.setAuthorizationToken("");
                    alert("Usuario o Contraseña incorrecta");
                    SessionService.removeCookie();
                    deferred.reject('ok');

                });

                return deferred.promise;
            }

            $scope.isLoading = !1;






            return functions;

    }



})();
