/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('RecepcionPlanoController', RecepcionPlanoController);

        RecepcionPlanoController.$inject =
                    ['$scope', '$location','ngTableParams','$filter','$window'];

        function RecepcionPlanoController($scope,GarantiasServiceUpdateGarantias, $location,ngTableParams,$filter,$window) {
            $scope.all_columns=[];
            $scope.columns=[];
            $scope.digital=[];
            $scope.digitalu=[];
            $scope.numero=[];

            $scope.createNewUser = function () {
                $location.path('/user-list');
            };
            $scope.reset = function () {
                $scope.digital.selected = {};
            };
            $scope.removeRow = function(index) {
                $scope.digital.splice(index, 1);
                construirTabla($scope, $scope.digital,ngTableParams,$filter);
            };
            $scope.addRow = function() {
                $scope.inserted = {
                    id: $scope.digital.length+1
                };
                $scope.digital.push($scope.inserted);
            };

            $scope.addColumn = function(title) {
                $scope.inserted = {
                    title: title,
                    checked:true,
                    type:"string",
                    columnName:title
                };

                $scope.all_columns.push($scope.inserted);
            };

            $scope.getTemplate = function (c) {
                if($scope.digital.selected){
                    if (c.id === $scope.digital.selected.id) return 'edit';
                    else return 'display';
                }
                else return 'display';
            };

            $scope.editRow = function (c) {
                $scope.digital.selected = angular.copy(c);
            };

            $scope.saveRow = function (idx) {
                $scope.digital[idx] = angular.copy($scope.digital.selected);
                $scope.reset();
            };

            $scope.createPlanilla = function () {

                $scope.numero=NumberService.getNumber('');
                $scope.numero.$promise.then(function(data) {
                    $scope.numero=data;
                    concatNumber($scope);
                    try{
                        changeColumnName($scope,$scope.all_columns);
                    }catch(e){alert (e);return;}
                    generateBarCodePDF($scope.numero[0].number,document,"Acuse de Recibido");
                    GarantiasServices.create($scope.digital);
                    alert("REGISTRO REALIZADO CON EL ACUSE "+$scope.numero[0].number) ;

                    $scope.numero=[];
                    $scope.digital=[];
                    $scope.all_columns=[];
                    //$window.location.reload();
                });
            };

            $scope.showContent = function($fileContent){
                var jsontext = $fileContent.split('\n');
                jsontext=txtToJson(jsontext, $scope);
                $scope.digital = JSON.parse(jsontext);
            };

            $scope.export=function($event, fileName){
                $scope.helper.csv.generate($event, "report.csv");
                $location.href=$scope.helper.csv.link();
            };


            $scope.$watch('all_columns', function() {
                update_columns($scope);
            }, true);


        }


        function concatNumber($scope){
            for(var i=0;i<$scope.digital.length;i++){
                $scope.digital[i].acuse=$scope.numero[0].number;

            }
        };

        function getChange(value, listColumns){
            for(var i=0;i<listColumns.length;i++){

                   if(listColumns[i].title==value){
                        if(listColumns[i].columnName==undefined){ throw("Existe un valor sin equivalente");return "NOK";}
                        return listColumns[i].columnName;
                   }
            }
            return value;
        };
        function changeColumnName($scope,listColumns){
                var newColumn="[";
                var propertieseval=[];
                for(var i=0;i<$scope.digital.length;i++){
                    newColumn+="{";

                    for(var e in $scope.digital[i]){
                        var newColumnName=getChange(e,listColumns);
                        if(!propertieseval[newColumnName]){
                            newColumn+="\""+newColumnName+"\":";
                            newColumn+="\""+$scope.digital[i][e]+"\",";
                            propertieseval[newColumnName]=newColumnName;
                        }else{
                        throw ("Columna "+newColumnName +" repetida");
                        }

                    }
                    propertieseval=[];
                    newColumn=newColumn.substr(0,newColumn.length-1);
                    newColumn+="},";
                }
                newColumn=newColumn.substr(0,newColumn.length-1);
                newColumn+="]";
                $scope.digital = JSON.parse(newColumn);
        };
        function construirTabla($scope, digital,ngTableParams,$filter){
            $scope.data = digital;
            $scope.tablaGarantias = new ngTableParams({
                page: 1,
                count: 2000,
                sorting: {firstname:'asc'}
            }, {
                total: digital.length,
                getData: function ($defer, params) {
                    params.total(digital.length);
                    $scope.data = params.sorting() ? $filter('orderBy')(digital, params.orderBy()) : digital;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : digital;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve($scope.data);
                }
            });
        }
    }
)();
