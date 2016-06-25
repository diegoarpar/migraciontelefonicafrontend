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
                    $cookies.EEauthorizationToken = "",
                        $cookies.EEauthorizationUserName = "",
                        $cookies.EEauthorizationSystemRole = "",
                        $cookies.EEauthorizationUserRole = "",
                        b.EEauthorizationImage = ""
                }
                ,
                b.setAuthorizationToken = function(b) {
                    $cookies.EEauthorizationToken = b
                }
                ,
                b.setAuthorizationUserName = function(b) {
                    $cookies.EEauthorizationUserName = b
                }
                ,
                b.removeAuthorizationToken = function() {
                    $cookies.EEauthorizationToken = ""
                }
                ,
                b.getAuthorizationToken = function() {
                    return $cookies.EEauthorizationToken
                }
                ,
                b.getAuthorizationUserName = function() {
                    return $cookies.EEauthorizationUserName
                }
                ,
                b.hasAuthorizationToken = function() {
                    return $cookies.EEauthorizationToken || !1
                }
                ,
                b.getUserOrganization = function() {
                    return $cookies.EEauthorizationOrganization
                }
                ,
                b.setAuthorizationUserOrganization = function(b) {
                    $cookies.EEauthorizationOrganization = b
                }
                ,
                b.setAuthorizationSystemRole = function(b) {
                    $cookies.EEauthorizationSystemRole = b
                }
                ,
                b.getAuthorizationSystemRole = function() {
                    return $cookies.EEauthorizationSystemRole
                }
                ,
                b.getAuthorizationmUserRole = function() {
                    return $cookies.EEauthorizationUserRole
                }
                ,
                b.setAuthorizationUserRole = function(b) {
                    return $cookies.EEauthorizationUserRole = b
                }
                ,
                b.getAuthorizationImage = function() {
                    return b.EEauthorizationImage
                }
                ,
                b.setAuthorizationImage = function(a) {
                    b.EEauthorizationImage = a
                }
                ,
                b
        }

    }
)();

