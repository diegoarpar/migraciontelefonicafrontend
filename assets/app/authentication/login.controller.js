/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope',  'UsersService', '$window', 'SessionService', '$sessionStorage'];

    function LoginController($scope,  UsersService, $window, SessionService, $sessionStorage) {

            // callback for ng-click 'createNewUser':
            $scope.autenticado=false;

            if(SessionService.getAuthorizationToken())$scope.autenticado=true;
            $scope.ok = function (user, pass) {
                $scope.username = user;
                var rta = UsersService.authenticateFunctionary({
                    username: user
                }, {
                    username: user,
                    password: sha256(pass),
                    organizationId: "telefonica"
                });
                rta.$promise.then(login, error);


            };


        $scope.isLoading = !1;

            function login(data) {
                data && (SessionService.setAuthorizationToken(data.tokenValue),
                    SessionService.setAuthorizationUserOrganization(data.organization),
                    UsersService.getUser({
                        username: $scope.username
                    }, {}, login_full, error))
            }

            function login_full(data) {
                if ($scope.isLoading = !1, data) {
                        SessionService.setAuthorizationUserName(data.username),
                            SessionService.setAuthorizationUserRoles(data.businessRolesIds),
                            SessionService.setAuthorizationSystemRoles(data.systemRolesIds),
                            SessionService.setAuthorizationImage(data.image),
                            SessionService.setAuthorizationUserDocumentType(data.userDocumentType),
                            SessionService.setAuthorizationUserDocumentNumber(data.userDocumentNumber);
                    var f = data.systemRolesIds;

                    if (f.indexOf("archivista") > -1){
                        $window.location.reload();

                    }
                    else {
                        SessionService.removeCookie();
                    }
                }
            }
            function error(b) {
                SessionService.setAuthorizationToken("");
                alert("Usuario o Contraseña incorrecta");
                $window.location.reload();
                SessionService.removeCookie();
                /*a.isLoading = !1,
                    a.password = "";
                var d = "";
                d = 0 == b.status ? "ELECTRONIC_RECORD_CONNECTION_ERROR" : "business" == b.data.type ? b.data.errorMessage : "ELECTRONIC_RECORD_TECHNICAL_ERROR",
                    d = c("translate")(d),
                    $.notify({
                        message: d
                    }, {
                        type: "danger",
                        z_index: 9999,
                        delay: 1e4
                    })*/
            }


    }

}
)();
