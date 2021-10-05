/* Mostrar los detalles de la Cliente */
function detClientes(){   

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#listado").empty();
            pintarListadoClientes(respuesta.items);                       
        }
    });
}

function pintarListadoClientes(items){
    let myTable = ` <br>
                    <table table-hover table-condensed table-bordered align="center">
                        <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                            <tr align="center">
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>AGE</th>
                                <th></th>
                                <th></th>
                            </tr> </thead> `;

    for(i=0;i<items.length; i++){
        myTable += "<tr align='center' style= 'border-color:#337ab7'> ";
            myTable += "<td>"+items[i].id+"</td>";
            myTable += "<td>"+items[i].name+"</td>";
            myTable += "<td>"+items[i].email+"</td>";
            myTable += "<td>"+items[i].age+"</td>";
            myTable += "<td><button onclick='eliminarCliente("+items[i].id+")'>Eliminar</button></td>";
            myTable += "<td><button onclick='detClienteEspecifico("+items[i].id+")'>Actualizar</button></td>";
        myTable += "</tr>";
    }
    myTable += " </table>";
    $("#listado").append(myTable);    
    $("#editarFinca").hide();
    $("#editarClientes").show();
    $("#editarMensaje").hide(); 
}

/* Agregar Cliente */

function registrarCliente(){
    let myData= {        
        name: $("#txtNameCli").val(),
        email: $("#txtEmail").val(),
        age: $("#txtAge").val(),
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro almacenado con éxito!");
            $("#creacionClientes").hide();
            $("#txtNameCli").val("");
            $("#txtEmail").val("");
            $("#txtAge").val("");          

        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}

/* Eliminar Cliente*/

function eliminarCliente(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detClientes();
        }
    });
}


/* Actualizar cliente */

function detClienteEspecifico(idItem){   
    $.ajax({
        dataType: "json",
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+idItem,
        type: "GET",        
        success: function(respuesta){
            var item=respuesta.items[0]; 
            $("#txtidClienteU").val(item.id);
            $("#txtNameCliU").val(item.name);
            $("#txtEmailU").val(item.email);
            $("#txtAgeU").val(item.age);
            
        },error: function (xhr, status) {
            alert("Error " + status );
        }
    });
}


function actualizarCliente(){
    let myData= {
        id: $("#txtidClienteU").val(),        
        name: $("#txtNameCliU").val(),
        email: $("#txtEmailU").val(),
        age: $("#txtAgeU").val(),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'https://g22cd9ae3932a4d-dbfinca.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidClienteU").hide();
            $("#txtNameCliU").val("");
            $("#txtEmailU").val("");
            $("#txtAgeU").val("");  
            
            detClientes();

        },error: function (xhr, status) {
            alert("Error peticion POST... " + status );
        }
    });
}