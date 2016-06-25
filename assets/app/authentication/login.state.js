/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .config(DynamicSearchState);

        DynamicSearchState.$inject = ['$routeProvider'];

        function DynamicSearchState($routeProvider) {
                $routeProvider.when('/login', {
                        templateUrl: 'assets/app/authentication/login.html',
                        controller: 'LoginController'}
                );
        }


    }
)();
