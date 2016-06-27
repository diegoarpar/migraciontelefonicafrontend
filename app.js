var app= angular.module('wpc', [ 'ngRoute','ui.bootstrap','ngResource', 'ngCookies', 'ngStorage','ui.tree','ngTable']);

app.constant('ApiApp', {
  url: 'http://institucion.certicamara.co/reports/api/insert-database/'
 })
 app.constant('ApiAuth', {
  url: 'http://localhost:2022/insert-database/'
 })
 app.constant('ApiGarantias', {
  url: 'http://localhost:2020/garantias/'
 })
 app.constant('ApiRecordManager', {
   url: 'http://104.196.61.177/'
  });
app.constant('ApiDocumentManager', {
 url: 'http://104.196.61.177/'
});
app.config(['$routeProvider', function ($routeProvider) {


        $routeProvider.when('/migracion-telefonica', {
            templateUrl: 'assets/app/recepcion-plano/view/recepcion-plano.html',
            controller: 'RecepcionPlanoController'}
        );

        $routeProvider.when('/login', {
            templateUrl: 'assets/app/authentication/login.html',
            controller: 'LoginController'}
        );

        $routeProvider.otherwise({redirectTo: '/migracion-telefonica'}

            );
            }
        ]
        );

