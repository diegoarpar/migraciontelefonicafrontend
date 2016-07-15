/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('RecepcionPlanoController', RecepcionPlanoController);

        RecepcionPlanoController.$inject =
                    ['$scope', '$location', 'SeriesService', 'MetadataService','ExpedienteService','SessionService','ApiDocumentManager','$http','$timeout', '$q'];

        function RecepcionPlanoController($scope, $location, SeriesService, MetadataService,ExpedienteService,SessionService,ApiDocumentManager,$http,$timeout,$q) {

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
                else{
                    $scope.query.subSeries = null;
                    if(datos.lenght < 2) {
                        $scope.query.series = null;
                    }
                    if(datos.length <1){
                        $scope.query.trd = null;
                    }
                }
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
                //construirTabla($scope, $scope.digital,ngTableParams,$filter);
            };
            $scope.addRow = function() {
                $scope.inserted = {
                    id: $scope.digital.length+1
                };
                $scope.digital.push($scope.inserted);
            };
            $scope.searchPlanilla = function(i) {
                if(i == null){
                    i = 0;
                }
                if(i == $scope.digital.length){
                    return;
                }

                var params = {
                    series: $scope.query.series,
                    subSeries: $scope.query.subSeries,
                    trd: $scope.query.trd,
                    skip: "0",
                    limit: "999999",
                    ownerDocumentType: "C.C"
                };
                for(var j = 0; j < $scope.all_columns.length; j++){
                    if($scope.all_columns[j].columnName !=null && $scope.all_columns[j].buscar == 1){
                        params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                    }
                }
                $scope.expediente = ExpedienteService.getExpedient(params);

                $scope.expediente.$promise.then(
                    function(data) {
                        if(data.count>0){
                            $scope.digital[i].encontrado=data.count;
                            

                        }else{
                            $scope.digital[i].encontrado=data.count;
                            $scope.createExpedient(i);
                        }
                        if(data.count>1){
                            alert("más de una coincidencia en el registro "+$scope.digital[$scope.count].id)

                        }
                        alert("new row");

                    },
                    function(error){
                        alert("ha ocurrido un error");
                    }
                );

            };

            $scope.createExpedient = function(i){
                var params = {
                    series: $scope.query.series,
                    subSeries: $scope.query.subSeries,
                    trd: $scope.query.trd,
                    ownerDocumentType: "C.C",
                    openingDate: new Date()
                };
                for(var j = 0; j < $scope.all_columns.length; j++){
                    if($scope.all_columns[j].columnName !=null && $scope.all_columns[j].buscar == 1){
                        params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                    }
                }
                $scope.expedient = ExpedienteService.createExpedient(params);

                $scope.expedient.$promise.then(
                    function(data) {
                        $scope.createFileInExpedient(i);
                    },
                    function(error){
                        alert("ha ocurrido un error");
                    }
                );
                
            };
            
            $scope.createFileInExpedient = function(i){
                i = i+1;
                $scope.searchPlanilla(i);
                
            };


            $scope.migrar=function(){
                changeColumnName($scope,$scope.all_columns);
            }
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
                    $scope.digital = eval('('+ jsonEscape(jsontext) +')');
                    $scope.digital.splice(-1,1);
                    //$scope.digital = JSON.parse(jsontext);
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


        function isEmpty(a) {
            return null == a
        }
    }
)();
