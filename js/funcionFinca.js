/* Mostrar los detalles de la Finca */
function detFincas(){    
    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#listado").empty();
            pintarListadoFincas(respuesta.items);            
        }
    });
}

function pintarListadoFincas(items){
    let myTable = ` <br>
                    <table table-hover table-condensed table-bordered align="center">
                        <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                            <tr align="center">
                                <th>ID</th>
                                <th>ADDRESS</th>
                                <th>EXENSION</th>
                                <th>CATEGORY_ID</th>
                                <th>NAME</th>
                                <th></th>
                                <th></th>
                            </tr> </thead> `;

    for(i=0;i<items.length; i++){
        myTable += "<tr align='center' style= 'border-color:#337ab7'> ";
            myTable += "<td>"+items[i].id+"</td>";
            myTable += "<td>"+items[i].address+"</td>";
            myTable += "<td>"+items[i].exension+"</td>";
            myTable += "<td>"+items[i].category_id+"</td>";
            myTable += "<td>"+items[i].name+"</td>";
            myTable += "<td><button onclick='eliminarFinca("+items[i].id+")'>Eliminar</button></td>";
            myTable += "<td><button onclick='UpFincaEspefifica("+items[i].id+")'>Actualizar</button></td>";
        myTable += "</tr>";
    }
    myTable += " </table>";
    $("#listado").append(myTable);
    $("#editarFinca").show();
    $("#editarClientes").hide();
    $("#editarMensaje").hide(); 
}

/* Agregar Finca */

function registrarFinca(){
    let myData= {        
        address: $("#txtAddress").val(),
        exension: $("#txtExension").val(),
        category_id: $("#txtCategory").val(),
        name:$("#txtName").val()
    };
    //console.log(myData);
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro almacenado con éxito!");
            $("#creacionFinca").hide();
            $("#txtAddress").val("");
            $("#txtExension").val("");
            $("#txtCategory").val("");
            detFincas();            

        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}

/* Eliminar Finca*/

function eliminarFinca(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detFincas();
        }
    });
}

/* Actualizar Finca */

function UpFincaEspefifica(idItem){   
    $.ajax({
        dataType: "json",
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm/'+idItem,
        type: "GET",        
        success: function(respuesta){
            var item=respuesta.items[0]; 
            $("#txtidFincaU").val(item.id);
            $("#txtAddressU").val(item.address);
            $("#txtExensionU").val(item.exension);
            $("#txtCategoryU").val(item.category_id);
            $("#txtNameU").val(item.name);
            
        },error: function (xhr, status) {
            alert("Error " + status );
        }
    });
}

function actualizarFinca(){
    let myData= {
        id: $("#txtidFincaU").val(),        
        address: $("#txtAddressU").val(),
        exension: $("#txtExensionU").val(),
        category_id: $("#txtCategoryU").val(),
        name:$("#txtNameU").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidFincaU").val("");
            $("#txtAddressU").val("");
            $("#txtExensionU").val("");
            $("#txtCategoryU").val("");
            $("#txtNameU").val("");              
            detFincas();
        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}
