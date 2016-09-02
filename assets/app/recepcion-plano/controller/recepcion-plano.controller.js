/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('RecepcionPlanoController', RecepcionPlanoController);

        RecepcionPlanoController.$inject =
                    ['$scope', '$location', 'SeriesService', 'MetadataService','ExpedienteService',
                        'SessionService','ApiDocumentManager','$http','$timeout', '$q','DocumentsService', 'TrdSeriesService'];

        function RecepcionPlanoController($scope, $location, SeriesService,
                                          MetadataService,ExpedienteService,SessionService,ApiDocumentManager,$http,$timeout,$q,DocumentsService, TrdSeriesService) {

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
            $scope.fields[4] = {key : 'name',value: 'Nombre del Archivo'};
            $scope.fields[5] = {key : 'documentTypeCode',value: 'Tipo de Documento'};
            $scope.fields[6] = {key : 'documentOwner',value: 'Dueño'};

            TrdSeriesService.getAccessTrdTrees({
                username: SessionService.getAuthorizationUserName()
            }).$promise.then(function(data){
                $scope.trds = data;
            });

            $scope.setPointer = function(id, datos) {
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
                $scope.showSpinner = !0;

                if(datos.lenght == 3) {
                    $scope.parentCode = $scope.query.trd + '-' + $scope.query.series +  '-' + $scope.query.subSeries;
                }
                if(datos.length == 2 ){
                    $scope.parentCode = $scope.query.trd + '-' + $scope.query.series;
                }

                $scope.id = id.id;

                MetadataService.getChildrenMetadata({
                        parentCode: $scope.parentCode
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

                    $scope.fields[$scope.fields.length] = {key : 'name',value: 'Nombre del Archivo'};
                    $scope.fields[$scope.fields.length] = {key : 'documentTypeCode',value: 'Tipo de Documento'};
                    $scope.fields[$scope.fields.length] = {key : 'documentOwner',value: 'Dueño'};
                    $scope.selectedMetadata = [];
                    $scope.showSpinner = !1;
                }
                //Get doctypes from series or subseries
                if($scope.query.subSeries != null){

                    TrdSeriesService.getTreeNodeChildsByCode({
                        treeNodeCode: $scope.query.trd + '-' + $scope.query.series +  '-' + $scope.query.subSeries,
                        nodeType: "DOCUMENT-TYPE"
                    }, successDocType, errorDocType);
                }
                else {
                    if ($scope.query.series != null) {
                        TrdSeriesService.getTreeNodeChildsByCode({
                            treeNodeCode: $scope.query.trd + '-' + $scope.query.series,
                            nodeType: "DOCUMENT-TYPE"
                        }, successDocType, errorDocType);
                    }
                }
            }

            function errorMetadata(a) {
                console.log("error getting resource")
            }

            function successDocType(datos){
                $scope.docType = datos;
                angular.forEach(datos, function(value, key){
                    MetadataService.getOperationMetadataForDocType({
                        documentTypeCode: value.code
                    }, successOperationMetadata, errorOperationMetadata);
                });

            }

            function errorDocType(a) {
                console.log("error getting resource")
            }

            function successOperationMetadata(datos){
                angular.forEach(datos, function(value,key){
                    $scope.fields.push({key : value.name, value: value.name});

                });
            }

            function errorOperationMetadata(error){

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
            $scope.confirmDocuments = function() {

                for(var i=0;i<$scope.digital.length;i++){
                    var params={};
                        params.metadata={};
                        params["recordId"] =  $scope.digital[i]["recordId"];
                    for(var j = 0; j < $scope.all_columns.length; j++){
                        if($scope.all_columns[j].columnName !=null){

                            if($scope.all_columns[j].columnName=="name")params["name"] = $scope.digital[i][$scope.all_columns[j].title];
                            if($scope.all_columns[j].columnName=="documentTypeCode")params["documentTypeCode"] = $scope.digital[i][$scope.all_columns[j].title];
                            if($scope.all_columns[j].columnName=="documentOwner")params.metadata.documentOwner = $scope.digital[i][$scope.all_columns[j].title];

                        }
                    }
                    $scope.rta=DocumentsService.createDocument(params);
                    $scope.rta.$promise.then(
                                        function(data) {});
                }

            };
            $scope.searchPlanilla = function(i) {
                $scope.created=[];
                if(i == null){
                    i = 0;
                    $scope.count=0;
                }
                if(i == $scope.digital.length){
                    return;
                }

                var params = {
                    series: $scope.query.series,
                    subSeries: $scope.query.subSeries,
                    trd: $scope.query.trd,
                    skip: "0",
                    limit: "999999"
                    //,ownerDocumentType: "C.C"
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
                            $scope.digital[$scope.count].encontrado=data.count;
                            if(data.count==1){
                                $scope.digital[$scope.count].recordId=data.result[0]._id;
                                /*var params={};
                                params.metadata={};
                                params["recordId"] =  $scope.digital[$scope.count].recordId;
                                for(var j = 0; j < $scope.all_columns.length; j++){
                                    if($scope.all_columns[j].columnName !=null){

                                        if($scope.all_columns[j].columnName=="name")params["name"] = $scope.digital[$scope.count][$scope.all_columns[j].title];
                                        if($scope.all_columns[j].columnName=="documentTypeCode")params["documentTypeCode"] = $scope.digital[$scope.count][$scope.all_columns[j].title];
                                        if($scope.all_columns[j].columnName=="documentOwner")params.metadata.documentOwner = $scope.digital[$scope.count][$scope.all_columns[j].title];

                                    }
                                }*/

                            }else{
                                $scope.digital[$scope.count].recordId="NO MIGRADO";
                            }

                        }else{
                            if(data.count==0){
                                $scope.digital[$scope.count].encontrado=data.count;
                                $scope.createExpedient($scope.count);

                                //$scope.searchPlanilla(i);
                                //return;
                            }

                        }
                        if(data.count>1){
                            alert("más de una coincidencia en el registro "+$scope.digital[$scope.count].id)

                        }
                        $scope.count=$scope.count+1;

                    },
                    function(error){
                        alert("ha ocurrido un error");
                    }

                );
                i=i+1;
                $scope.searchPlanilla(i);
            };

            $scope.createExpedient = function(i){
                var params = {
                    series: $scope.query.series,
                    subSeries: $scope.query.subSeries,
                    trd: $scope.query.trd,
                    //ownerDocumentType: "C.C",
                    openingDate: new Date(),
                    lastTrdLevelId: $scope.id
                };
                for(var j = 0; j < $scope.all_columns.length; j++){
                    if($scope.all_columns[j].columnName !=null && $scope.all_columns[j].datoaMigrar == 1){
                        params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                    }
                }
                 var count1=0;
                 var count2=0;
                 var crear=true;
                if($scope.created.length==0){crear=false;$scope.created.push(params);}else
                for(var j=0; j<$scope.created.length;j++){
                    for(var e in $scope.created[j]){
                        count1++;
                        if($scope.created[j][e]==params[e]){
                            count2++;

                        }
                        if(e=="openingDate")count2++;

                    }
                    if(count1==count2){return}else{count2=0;count1=0;};
                }
                if(crear)$scope.created.push(params);
                $scope.expedient = ExpedienteService.createExpedient(params);


                
            };
            
            $scope.createFileInExpedient = function(i){

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
