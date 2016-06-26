function txtToJson(txtToJson, $scope){
    $scope.all_columns=[];
    var head=false;
    var str="[";
    for(var i=1; i<txtToJson.length;i++){
        str+="{";
        str+="\"id\":\""+i+"\",";
        for(var j=0;j<txtToJson[i].split(',').length;j++){
            if(!head)$scope.all_columns.push({"title": ""+txtToJson[0].split(',')[j].trim()+"","type": "string","checked": true});
            if(txtToJson[0].split(',')[j]){
                str+="\""+txtToJson[0].split(',')[j].trim()+"\":\"";
                str+=txtToJson[i].split(',')[j].trim();
                str+="\",";
            }
        }
        head=true;
        str=str.substr(0,str.length-1);
        str+="},";
    }
    str=str.substr(0,str.length-1);
    str+="]";
    return str;
};

function fillColumns (list, $scope){
    for(var i=0;i<list.length;i++)
        for(var key in list[i]){
            if(!$scope.mapColumns[key] && key.indexOf("$")===-1&&key!=="toJSON"){
                $scope.mapColumns[key]=key;
                $scope.all_columns.push({"title": ""+key+"","type": "string","checked": true});
            }
        }
};

var update_columns = function($scope) {
    $scope.columns = [];
    for (var i = 0; i < $scope.all_columns.length; i++) {
        var column = $scope.all_columns[i];
        if (column.checked) {
            $scope.columns.push($scope.all_columns[i]);
        }
    }
};


var generateBarCodePDF= function(code, document, text){
        var doc = new jsPDF('1', 'mm', [60, 35]);
        doc.text(0, 5, text);
        //var htmlBarcode = document.createElement('div');
        //htmlBarcode.barcode(code, "code128",{output:"svg"});
        $("#bcTarget").barcode(code, "code128",{output:"svg"});
        var canvas = document.createElement('canvas');
        //var canvas = $('micanvas');
        var imgData = $("#bcTarget")[0].childNodes[0].data;
        temp_img2 = new Image();
        temp_img2.src = imgData;
        //temp_img2.src = htmlBarcode.childNodes[0].data;
        canvas.id = 'canvas'
        canvas.visible=false;
        //canvas.display="none";
        document.body.appendChild(canvas);
        canvas.width = 500;
        canvas.height = 500;
        var context = canvas.getContext('2d');
        context.drawImage(temp_img2,0,25);

         html2canvas($("#canvas"), {
              onrendered: function(canvas) {
                var imgData = canvas.toDataURL('image/png');
                $("#canvas").hide();
                    doc.addImage(imgData, 'PNG', 1, 0);
                    doc.save('doc.pdf');
                }
            }
        );
         $("#bcTarget").barcode("", "code128",{output:"svg"});

};