var app= angular.module('wpc', [ 'ngRoute','ui.bootstrap','ngResource', 'ngCookies', 'ngStorage','ui.tree','ngTable']);



  app.constant('ApiRecordManager', {
   url: 'http://104.196.101.153:9049/'
  });
   app.constant('ApiAutentication', {
     url: 'http://104.196.61.177/'
    });
    app.constant('ApiServerSide', {
         url: 'http://localhost:2020/'
        });
app.constant('ApiDocumentManager', {
 url: 'http://104.196.101.153:9049/'
});

app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push("HttpInterceptorService")
}
])

app.config(['$routeProvider', function ($routeProvider) {


        $routeProvider.when('/migracion-telefonica', {
            templateUrl: 'assets/app/recepcion-plano/view/recepcion-plano.html',
            controller: 'RecepcionPlanoController'}
        );
        $routeProvider.when('/logs', {
            templateUrl: 'assets/app/logs/view/logs.html',
            controller: 'LogsController'}
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

