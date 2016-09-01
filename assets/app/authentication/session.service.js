/**
 * Created by joag on 25/06/16.
 */

(function(){
        'use strict';
        angular.module("wpc")
            .factory('SessionService', SessionService);

        SessionService.$inject =  ['$cookies'];

        function SessionService($cookies) {
            var b = {};
            return b.EEauthorizationToken = "",
                b.removeCookie = function() {
                    $cookies.put("EEauthorizationToken", "") ,
                        $cookies.put("EEauthorizationUserName", ""),
                    $cookies.put("EEauthorizationSystemRole", ""),
                    $cookies.put("EEauthorizationUserRole", ""),
                        b.EEauthorizationImage = ""
                }
                ,
                b.setAuthorizationToken = function(b) {
                    $cookies.put("EEauthorizationToken", b )
                }
                ,
                b.setAuthorizationUserName = function(b) {
                    $cookies.put("EEauthorizationUserName", b );
                }
                ,
                b.removeAuthorizationToken = function() {
                    $cookies.remove("EEauthorizationToken", b )
                }
                ,
                b.getAuthorizationToken = function() {
                    return $cookies.get("EEauthorizationToken");
                }
                ,
                b.getAuthorizationUserName = function() {
                    return $cookies.get("EEauthorizationUserName");
                }
                ,
                b.hasAuthorizationToken = function() {
                    return $cookies.get("EEauthorizationToken") || 1;
                }
                ,
                b.getUserOrganization = function() {
                    return $cookies.get("EEauthorizationOrganization") ;
                }
                ,
                b.setAuthorizationUserOrganization = function(b) {
                     $cookies.put("EEauthorizationOrganization",b) ;

                }
                ,
                b.setAuthorizationUserDocumentType = function(b) {
                    $cookies.put("EEauthorizationUserDocumentType", b)
                }
                ,
                b.setAuthorizationUserDocumentNumber = function(b) {
                    $cookies.put("EEauthorizationUserDocumentNumber", b)
                }
                ,
                b.setAuthorizationSystemRoles = function(b) {
                    $cookies.put("EEauthorizationSystemRole",b) ;
                }
                ,
                b.getAuthorizationSystemRoles = function() {
                    return $cookies.get("EEauthorizationSystemRole") ;
                }
                ,
                b.getAuthorizationUserRoles= function() {
                    return $cookies.get("EEauthorizationUserRole") ;
                }
                ,
                b.setAuthorizationUserRoles = function(b) {
                    return $cookies.put("EEauthorizationUserRole",b) ;
                }
                ,
                b.getAuthorizationImage = function() {
                    return b.EEauthorizationImage;
                }
                ,
                b.setAuthorizationImage = function(a) {
                    b.EEauthorizationImage = a;
                }
                ,
                b
        }



    angular.module("wpc").factory("HttpInterceptorService", ["SessionService", function(a) {
        return {
            request: function(b) {
                return b.headers = b.headers || {},
                    a.hasAuthorizationToken() ? b.headers.Authorization = a.getAuthorizationToken() : b.headers.Authorization = "anonymous",
                    b
            }
        }
    }]);
})();

