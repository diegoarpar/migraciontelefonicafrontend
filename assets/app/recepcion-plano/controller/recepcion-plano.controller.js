/**
 * Created by joag on 9/06/16.
 * Munkys APPS copyright
 * SAMMU Application
 */
(function () {
    angular.module("wpc")
        .controller('RecepcionPlanoController', RecepcionPlanoController);

    RecepcionPlanoController.$inject =
        ['$rootScope', '$scope', '$location', 'LogsServices',  'MetadataService', 'ExpedienteService',
            'SessionService', '$q', 'DocumentsService', 'TrdSeriesService'];

    function RecepcionPlanoController($rootScope, $scope, $location, LogsServices,
                                      MetadataService, ExpedienteService, SessionService, $q, DocumentsService, TrdSeriesService) {

        //array to hold the alerts to be displayed on the page
        $scope.alerts = [];
        /**
         *This function is used to push alerts onto the alerts array.
         */
        $scope.addAlert = function(type, message) {
            //add the new alert into the array of alerts to be displayed.
            $scope.alerts.push({type: type, msg: message});
        };
        /**
         *This function closes the alert
         */
        $scope.closeAlert = function() {
            //remove the alert from the array to avoid showing previous alerts
            $scope.alerts.splice(0);
        };

        //array to hold the alerts2 to be displayed on the page
        $scope.alerts2 = [];
        /**
         *This function is used to push alerts2 onto the alerts2 array.
         */
        $scope.addAlert2 = function(type, message) {
            //add the new alert into the array of alerts2 to be displayed.
            $scope.alerts2.push({type: type, msg: message});
        };
        /**
         *This function closes the alert
         */
        $scope.closeAlert2 = function() {
            //remove the alert from the array to avoid showing previous alerts2
            $scope.alerts2.splice(0);
        };




        $scope.all_columns = [];
        $scope.columns = [];
        $scope.digital = [];
        $scope.digitalu = [];
        $scope.numero = [];
        $scope.query = {};
        $scope.fields = [];

        $scope.fields[0] = {key: 'recordName', value: 'Nombre del expediente'};
        $scope.fields[1] = {key: 'openingDate', value: 'Fecha de apertura'};
        $scope.fields[2] = {key: 'ownerDocumentType', value: 'Tipo documento del dueño'};
        $scope.fields[3] = {key: 'ownerDocumentNumber', value: 'Numero documento del dueño'};
        $scope.fields[4] = {key: 'name', value: 'Nombre del Archivo'};
        $scope.fields[5] = {key: 'documentTypeCode', value: 'Tipo de Documento'};
        $scope.fields[6] = {key: 'documentOwner', value: 'Dueño'};
        $scope.fields[7] = {key: 'confidentialityLevel', value: 'Nivel de Confidencialidad'};
        $scope.fields[8] = {key: 'documentTypeName', value: 'Nombre del tipo de documento'};


        TrdSeriesService.getTrdTrees({
            //username: SessionService.getAuthorizationUserName()
        }).$promise.then(function (data) {
            $scope.addAlert('success', 'Trd(s) cargada(s) correctamente');
            $scope.trds = data;

        }).catch(
            function () {
                $scope.addAlert('error', 'Trd no ha podido ser cargada correctamente');
                SessionService.setAuthorizationToken("");
                SessionService.removeCookie();

            }
        );

        $scope.setPointer = function (datos) {
            if (!datos){

                return $scope.pointer = datos,
                    $scope.selectedMetadata = [],
                    $scope.availableMetadata = [],
                    $scope.showInResult = {
                        recordName: !0,
                        openingDate: !0
                    },
                    null;
            }else {
                /*$scope.query.subSeries = null;
                if (datos.length < 2) {
                    $scope.query.series = null;
                }
                if (datos.length < 1) {
                    $scope.query.trd = null;
                }*/
                 if(datos.type)
                            if(datos.type=="TRD"){
                                $scope.trd=datos;
                                $scope.trd.series=TrdSeriesService.getSeries({idSerie: $scope.trd.id});
                                $scope.addAlert('success', 'Serie(s) cargada(s) correctamente');
                                $scope.parentCode=$scope.trd.code;
                            }
                             if(datos.type=="SERIE"){
                                $scope.trd.serie=datos;
                                $scope.trd.serie.subseries=TrdSeriesService.getSubSeries({idSubSerie: $scope.trd.serie.id});
                                $scope.addAlert('success', 'Sub-Serie(s) cargada(s) correctamente');
                                $scope.parentCode=$scope.trd.serie.code;
                                $scope.trd.serie.documentalTypes=TrdSeriesService.getDocumenType({idSubSerie: $scope.trd.serie.id});
                                $scope.trd.serie.documentalTypes.$promise.then(function (data) {
                                   $scope.trd.serie.documentalType=[];
                                   for(var i=0;i<data.length;i++){
                                       $scope.trd.serie.documentalType.push(data[i]);
                                   }
                                   $scope.loadMetadata();
                                });
                            }
                            if(datos.type=="SUB-SERIE"){

                                $scope.trd.serie.subserie=datos;
                                $scope.parentCode=$scope.trd.serie.subserie.code;
                                $scope.trd.serie.documentalTypes=TrdSeriesService.getDocumenType({idSubSerie: $scope.trd.serie.subserie.id});
                                $scope.trd.serie.documentalTypes.$promise.then(function (data) {
                                           $scope.trd.serie.documentalType=[];
                                           for(var i=0;i<data.length;i++){
                                               $scope.trd.serie.documentalType.push(data[i]);
                                           }
                                           $scope.loadMetadata();
                                        });

                            }


            }

            MetadataService.getChildrenMetadata({
                parentCode: $scope.parentCode
            }, successMetadata, errorMetadata);
             $scope.addAlert('success', 'Metadato(s) cargado(s) correctamente');

        };

        function successMetadata(datos) {
            if (isEmpty(datos)) {
                $scope.childrenMetadata = [{
                    childrenType: "records",
                    fields: []
                }, {
                    childrenType: "",
                    fields: []
                }];
                $scope.availableMetadata = []
            }
            else {
                $scope.isNewMetadata = !1;
                $scope.childrenMetadata = datos;
                if(datos)if(datos.length>0)
                $scope.availableMetadata = datos[0].fields;

                $scope.fields.splice(4, $scope.fields.length - 3);
                angular.forEach($scope.availableMetadata, function (value) {
                    $scope.fields.splice($scope.fields.length, 0, {
                        key: value.name,
                        value: value.name
                    });
                });

                $scope.fields[$scope.fields.length] = {key: 'name', value: 'Nombre del Archivo'};
                $scope.fields[$scope.fields.length] = {key: 'documentTypeCode', value: 'Código Tipo Documental'};
                $scope.fields[$scope.fields.length] = {key: 'documentOwner', value: 'Dueño'};
                $scope.fields[$scope.fields.length] = {key: 'documentTypeName', value: 'Nombre Tipo de Documental'};
                $scope.fields[$scope.fields.length] = {
                    key: 'confidentialityLevel',
                    value: 'Nivel de Confidencialidad'
                };
                $scope.selectedMetadata = [];
                $scope.showSpinner = !1;
            }
            //Get doctypes from series or subseries
            if ($scope.query.subSeries != null) {

                TrdSeriesService.getTreeNodeChildsByCode({
                    treeNodeCode: $scope.query.trd + '-' + $scope.query.series + '-' + $scope.query.subSeries,
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
            $scope.addAlert('success', 'Metadatos de la serie cargados correctamente');
        }

        function errorMetadata() {
            $scope.addAlert('error', 'Los Metadatos de la serie no han podido ser cargados correctamente');
        }

        function successDocType(datos) {
            $scope.docType = datos;
            angular.forEach(datos, function (value) {
                MetadataService.getOperationMetadataForDocType({
                    documentTypeCode: value.code
                }, successOperationMetadata, errorOperationMetadata);
            });

        }

        function errorDocType() {
            $scope.addAlert('error', 'Metadatos de la serie no han podido ser cargados correctamente');
        }

        function successOperationMetadata(datos) {
            angular.forEach(datos, function (value) {
                $scope.fields.push({key: value.name, value: value.name});

            });
        }

        function errorOperationMetadata() {
            $scope.addAlert('success', 'Metadatos del documento no han podido ser cargados correctamente');
        }


        $scope.createNewUser = function () {
            $location.path('/user-list');
        };
        $scope.reset = function () {
            $scope.digital.selected = {};
        };
        $scope.removeRow = function (index) {
            $scope.digital.splice(index, 1);
        };
        $scope.addRow = function () {
            $scope.inserted = {
                id: $scope.digital.length + 1
            };
            $scope.digital.push($scope.inserted);
        };
        $scope.confirmDocuments = function () {

            for (var i = 0; i < $scope.digital.length; i++) {
                if ($scope.digital[i].encontrado == 1) {
                    var params = {};
                    params.metadata = {};
                    params["recordId"] = $scope.digital[i]["recordId"];
                    for (var j = 0; j < $scope.all_columns.length; j++) {
                        if ($scope.all_columns[j].columnName != null) {
                            if ($scope.all_columns[j].documentMetadata) {
                                if ($scope.all_columns[j].columnName != "confidentialityLevel" && $scope.all_columns[j].columnName != "documentTypeCode" && $scope.all_columns[j].columnName != "name"&& $scope.all_columns[j].columnName != "documentTypeName" ) {

                                    params.metadata[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                                } else {
                                    params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                                }
                            }
                        }
                    }
                    $scope.uploadFile(params, i);
                }
            }

        };

        $scope.uploadFile =  function (params, i){
            var rta = DocumentsService.createDocument(params);
            rta.$promise.then(function () {
                    $scope.addAlert2('success', 'Documento ' + i + ' creado correctamente');
                },
                function () {
                    $scope.addAlert2('error', 'Documento ' + i + ' no ha podido ser creado correctamente');
                }
            );
        }



        var findExp = function (i, params) {
            var deferred = $q.defer();
                $scope.expediente = ExpedienteService.getExpedient(params);
                $scope.expediente.$promise.then(function (datos) {
                    deferred.resolve(datos)
                });
            return deferred.promise;
        };

        var findMetadata = function ( params) {
                var deferred = $q.defer();

                $scope.seriesMetadata = TrdSeriesService.getMetadata({documentType: params.code});
                $scope.seriesMetadata.$promise.then(function (datos) {
                    deferred.resolve(datos)
                });
            return deferred.promise;
        };
        function searchFields(key){

            for(var i=0;i<$scope.fields.length;i++){
                if($scope.fields[i].key==key)
                return true;
            }
            return false;
        }
        $scope.loadMetadata = function () {
            if($scope.trd)
                if($scope.trd.serie)
                    if($scope.trd.serie.documentalType){
                        for(var i=0;i<$scope.trd.serie.documentalType.length;i++){
                            findMetadata($scope.trd.serie.documentalType[i]).then(function (data) {
                                if(data)
                                for(var j=0;j<data.length;j++){
                                    var temp={key:data[j].name,value:data[j].name};
                                    if(!searchFields(temp.key)){

                                        $scope.fields.push(temp);
                                    }
                                }



                            });
                        }
                        $scope.addAlert('success', 'Metadatos de tipo documental cargados');
                    }

        };
        var secuencia = function (i) {
            var params = {
                skip: "0",
                limit: "999999",
                selectedLevel: $scope.id
                //,ownerDocumentType: "C.C"
            };
            if ($scope.id) {
                params.selectedLevel = $scope.id
            }
            for (var j = 0; j < $scope.all_columns.length; j++) {
                if ($scope.all_columns[j].columnName != null && $scope.all_columns[j].buscar == 1) {
                    params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                }
            }
            findExp(i, params).then(function (data) {

                $scope.digital[i].encontrado = data.count;
                $scope.digital[i].recordId = "NO MIGRADO";
                if (data.count == 1) {
                    $scope.digital[i].recordId = data.result[0]._id;

                }
                else if (data.count == 0) {
                    $scope.createExpedient(i);
                }
                else if (data.count > 1) {
                    alert("más de una coincidencia en el registro " + $scope.digital[i].id + ". El documento no podra ser migrado");
                }
                i = i + 1;
                if (i == $scope.digital.length) {
                    return;
                }
                secuencia(i);
                $scope.scans = data;

            })
        };


        $scope.searchPlanilla = function (i) {
            $scope.created = [];
            if (i == null) {
                i = 0;
                $scope.count = 0;
            }
            if (i == $scope.digital.length) {
                return;
            }

            var params = {
                skip: "0",
                limit: "999999",
                selectedLevel: $scope.id
                //,ownerDocumentType: "C.C"
            };
            if ($scope.id) {
                params.selectedLevel = $scope.id
            }
            for (var j = 0; j < $scope.all_columns.length; j++) {
                if ($scope.all_columns[j].columnName != null && $scope.all_columns[j].buscar == 1) {
                    params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                }
            }
            $scope.expedient = {};
            secuencia(i);
        };

        $scope.createExpedient = function (i) {
            var params = {
                trd: $scope.trd.code,
                trdName: $scope.trd.name,
                //ownerDocumentType: "C.C",
                openingDate: new Date(),
                lastTrdLevelId: $scope.trd.id

            };
            if ($scope.trd.serie != null) {
                params.series= $scope.trd.serie.code;
                params.seriesName= $scope.trd.serie.name;
                params.lastTrdLevelId= $scope.trd.serie.id;
            }
            if ($scope.trd.serie.subserie != null) {
                params.subSeries= $scope.trd.serie.subserie.code;
                params.subSeriesName= $scope.trd.serie.subserie.name;
                params.lastTrdLevelId= $scope.trd.serie.subserie.id;
            }

            for (var j = 0; j < $scope.all_columns.length; j++) {
                if ($scope.all_columns[j].columnName != null && $scope.all_columns[j].datoaMigrar == 1) {
                    params[$scope.all_columns[j].columnName] = $scope.digital[i][$scope.all_columns[j].title];
                }
            }
            var count1 = 0;
            var count2 = 0;
            var crear = true;
            if ($scope.created.length == 0) {
                crear = false;
                $scope.created.push(params);
            } else
                for (j = 0; j < $scope.created.length; j++) {
                    for (var e in $scope.created[j]) {
                        count1++;
                        if ($scope.created[j][e] == params[e]) {
                            count2++;
                        }
                        if (e == "openingDate")
                            count2++;
                    }
                    if (count1 == count2) {
                        return
                    } else {
                        count2 = 0;
                        count1 = 0;
                    }
                }
            if (crear)
                $scope.created.push(params);

            $scope.expedient[i] = ExpedienteService.createExpedient(params);
            $scope.expedient[i].$promise.then(function(data){
                $scope.addAlert('success', 'Expediente ' + data.join() + ' creado correctamente');
                $scope.digital[i].recordId = data.join();
            });
            var params2 = angular.copy(params);
            params2.dateLog = new Date();
            params2.eventLog = "Request_Create_Expediente";
            LogsServices.insertLog(params2);
        };

        $scope.createFileInExpedient = function (i) {

            $scope.searchPlanilla(i);

        };


        $scope.addColumn = function (title) {
            $scope.inserted = {
                title: title,
                checked: true,
                type: "string",
                columnName: title
            };

            $scope.all_columns.push($scope.inserted);
        };

        $scope.getTemplate = function (c) {
            if ($scope.digital.selected) {
                if (c.id == $scope.digital.selected.id)
                    return 'edit';
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

        $scope.showContent = function ($fileContent) {
            try {
                var jsontext = $fileContent.split('\n');
                jsontext = txtToJson(jsontext, $scope);
                $scope.digital = eval('(' + jsonEscape(jsontext) + ')');
                $scope.digital.splice(-1, 1);
            }
            catch (error) {
                alert("El archivo no se ha podido leer, por favor contactese con la entidad.")
            }
        };

        $scope.export = function ($event, fileName) {
            $scope.helper.csv.generate($event, "report.csv");
            $location.href = $scope.helper.csv.link();
            $scope.fileName = fileName;
        };


        $scope.$watch('all_columns', function () {
            update_columns($scope);
        }, true);


    }


    function isEmpty(a) {
        return null == a
    }
})();
