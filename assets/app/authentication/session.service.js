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
                b.setAuthorizationSystemRole = function(b) {
                    $cookies.put("EEauthorizationSystemRole",b) ;
                }
                ,
                b.getAuthorizationSystemRole = function() {
                    return $cookies.get("EEauthorizationSystemRole") ;
                }
                ,
                b.getAuthorizationmUserRole = function() {
                    return $cookies.get("EEauthorizationUserRole") ;
                }
                ,
                b.setAuthorizationUserRole = function(b) {
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

    }
)();

