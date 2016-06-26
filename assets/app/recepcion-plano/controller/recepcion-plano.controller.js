/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('RecepcionPlanoController', RecepcionPlanoController);

        RecepcionPlanoController.$inject =
                    ['$scope', '$location','$filter','$window', 'SeriesService', 'MetadataService','ExpedienteService'];

        function RecepcionPlanoController($scope, $location, $filter, $window, SeriesService, MetadataService,ExpedienteService) {

            $scope.all_columns=[];
            $scope.columns=[];
            $scope.digital=[];
            $scope.digitalu=[];
            $scope.numero=[];
            $scope.query = {};
            $scope.fields = [];

            $scope.fields[0] = {key : 'recordName',value: 'Nombre del expediente'};
            $scope.fields[1] = {key : 'openingDate',value: 'Fecha de apertura'};
            $scope.fields[2] = {key : 'ownerDocumentType',value: 'Tipo documento del dueño'};
            $scope.fields[3] = {key : 'ownerDocumentNumber',value: 'Numero documento del dueño'};

            SeriesService.getAllTrds().$promise.then(function(data){
                $scope.trds = data;
            });

            $scope.setPointer = function(datos) {
                if (!datos)
                    return $scope.pointer = datos,
                        $scope.selectedMetadata = [],
                        $scope.availableMetadata = [],
                        $scope.showInResult = {
                            recordName: !0,
                            openingDate: !0
                        },
                        null;

                angular.forEach(datos, function (value, key) {
                    var d = ["trd", "series", "subSeries"];
                    $scope.query[d[key]] = value,
                    key == datos.length - 1 && ($scope.pointer = value)
                });
                $scope.showSpinner = !0,
                MetadataService.getChildrenMetadata({
                        parentCode: $scope.pointer
                }, successMetadata, errorMetadata)
            };

            function successMetadata(datos) {
                if(isEmpty(datos)){
                    ($scope.childrenMetadata = [{
                        childrenType: "records",
                        fields: []
                    }, {
                        childrenType: "",
                        fields: []
                    }],
                        $scope.availableMetadata = [])
                }
                else{
                    $scope.isNewMetadata = !1;
                    $scope.childrenMetadata = datos;
                    $scope.availableMetadata = datos[0].fields;

                    $scope.fields.splice(4,$scope.fields.length-3);
                    angular.forEach($scope.availableMetadata, function(value,key){
                        $scope.fields.splice($scope.fields.length,0, {
                            key: value.name,
                            value: value.name
                        });
                    });


                    $scope.selectedMetadata = [];
                    $scope.showSpinner = !1;
                }
            }

            function errorMetadata(a) {
                console.log("error getting resource")
            }

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
            $scope.searchPlanilla = function() {
            var rta;
            var searchString="";


            for(var j=0;j<$scope.digital.length;j++){
                searchString="{"
                for(var i=0;i<$scope.all_columns.length;i++){
                    if($scope.all_columns[i].buscar){
                    searchString+=$scope.all_columns[i].columnName+":";
                    searchString+=$scope.digital[j][$scope.all_columns[i].title];
                    searchString+=",";
                    }
                }
                searchString=searchString.substr(0,searchString.length-1);
                searchString+="}";
                alert("buscando... por \n" + searchString );
                ExpedienteService.getExpedient(Json.parse(searchString));
            }
            //searchString=searchString.substr(0,searchString.length-1);

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

            };

            $scope.showContent = function($fileContent){
                try {
                    var jsontext = $fileContent.split('\n');
                    jsontext = txtToJson(jsontext, $scope);
                    $scope.digital = JSON.parse(jsontext);
                }
                catch(error){
                    alert("El archivo no se ha podido leer, por favor contactese con la entidad.")
                }
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

        function isEmpty(a) {
            return null == a
        }
    }
)();
