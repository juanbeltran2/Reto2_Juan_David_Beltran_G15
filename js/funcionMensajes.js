/* Mostrar los detalles de los mensajes */
function detMensajes(){
    $("#creaciones").hide();
    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#listado").empty();
            pintarListadoMensajes(respuesta.items);            
        }
    });
}

function pintarListadoMensajes(items){
    let myTable = ` <br>
                    <table table-hover table-condensed table-bordered align="center">
                        <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                            <tr align="center">
                                <th>ID</th>
                                <th>MESSAGETEXT</th>                                
                                <th></th>
                                <th></th>
                            </tr> </thead> `;

    for(i=0;i<items.length; i++){
        myTable += "<tr align='center' style= 'border-color:#337ab7'> ";
            myTable += "<td>"+items[i].id+"</td>";
            myTable += "<td>"+items[i].messagetext+"</td>";
            myTable += "<td><button onclick='eliminarMensaje("+items[i].id+")'>Eliminar</button></td>";
            myTable += "<td><button onclick='UpMensajeEspefifico("+items[i].id+")'>Actualizar</button></td>";
        myTable += "</tr>";
    }
    myTable += " </table>";
    $("#listado").append(myTable);
    $("#editarFinca").hide();
    $("#editarClientes").hide();
    $("#editarMensaje").show(); 
}

/* Agregar Mensaje */

function registrarMensaje(){
    let myData= {        
        messagetext: $("#txtMessage").val(),
    };
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro almacenado con éxito!");
            $("#registroMensaje").hide();
            $("#txtMessage").val("");    
            detMensajes();    

        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}

/* Eliminar Mensaje*/

function eliminarMensaje(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detMensajes();
        }
    });
}

/* Actualizar Mensaje */

function UpMensajeEspefifico(idItem){   
    $.ajax({
        dataType: "json",
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/'+idItem,
        type: "GET",        
        success: function(respuesta){
            var item=respuesta.items[0]; 
            $("#txtidFincaU").val(item.id);
            $("#txtMessageU").val(item.messagetext);
            
        },error: function (xhr, status) {
            alert("Error " + status );
        }
    });
}

function actualizarMensaje(){
    let myData= {
        id: $("#txtidFincaU").val(),        
        messagetext: $("#txtMessageU").val(),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidFincaU").val("");
            $("#txtMessageU").val("");                       
            detMensajes();
        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}