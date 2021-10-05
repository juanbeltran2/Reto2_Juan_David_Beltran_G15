$(document).ready(function(){

    $("#show1").on('click', function() {
    $("#creaciones").show();    
    $("#ediciones").hide();
    $("#creacionFinca").show();
    $("#creacionClientes").hide();
    $("#registroMensaje").hide();
    return false;
    });

    $("#show2").on('click', function() {
    $("#creaciones").show();
    $("#ediciones").hide();
    $("#creacionFinca").hide();
    $("#creacionClientes").show();
    $("#registroMensaje").hide();
    return false;
    });

    $("#show3").on('click', function() {
    $("#creaciones").show();
    $("#ediciones").hide();
    $("#creacionFinca").hide();
    $("#creacionClientes").hide();
    $("#registroMensaje").show();
    return false;
    });

});