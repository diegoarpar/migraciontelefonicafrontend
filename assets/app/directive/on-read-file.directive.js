/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .directive('onReadFile', onReadFile);

        onReadFile.$inject =  ['$parse'];

        function onReadFile($parse) {

            return {
                restrict: 'A',
                scope: {
                    nameOfFile: '='
                },
                link: function(scope, element, attrs) {
                    var fn = $parse(attrs.onReadFile);

                    element.on('change', function(onChangeEvent) {
                        var reader = new FileReader();

                        reader.onload = function(onLoadEvent) {
                            scope.$apply(function() {
                                var text=onLoadEvent.target.result;

                                fn(scope, {$fileContent:onLoadEvent.target.result});
                            });
                        };
                        scope.nameOfFile = (onChangeEvent.srcElement || onChangeEvent.target).files[0].name;
                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], 'ISO-8859-1');
                    });
                }
            };
        }

    }
)();
