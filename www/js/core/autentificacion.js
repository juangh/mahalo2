function ocultarBienvenida()
{
    jQuery.mobile.changePage("#login", "fade");
}

function mostrarLogin()
{
    setTimeout(ocultarBienvenida, 3000);
}
var compania;
function conectar()
{
    var usuario = $("#txtUsuario").val();
    var password = $("#txtPassword").val();
    var idioma = localStorage["idioma"];
    var raiz = mensajes[idioma];
    var NOUSER = "";
    var res = ValidarAccesoServidor(usuario, password);

    if (res === true) {
        var tipo = getTipoUsuario(usuario, password);
        typeuser = tipo - 1;
        switch (tipo) {
            case "1" :
                tipoUsuario = roles['rol-0'];
                break;
            case "2" :
                tipoUsuario = roles['rol-1'];
                break;
            case "3" :
                tipoUsuario = roles['rol-2'];
                break;
            default :
                tipoUsuario = NOUSER;
                break;
        }
        var id_query2 = "busqueda_compa";
        var sql = "select c_compania from mahalo" + instancia_db + ":m_posuser where usuario = '" + username + "'";
        xmlQueryDB(sql, id_query2, 1, false, ruta);
        compania = xmlGetRow("busqueda_compa", 0, 0)['c_compania'];
        initImagenes(tipoUsuario);
        bottom = drawBottom(tipoUsuario);
        jQuery("#grid").append(drawGrid(tipoUsuario));
        jQuery.mobile.changePage("#home", "fade");
        deshabilitarIngreso();
    } else {

        switch (window.errno) {

            // Código para indicar que el usuario y la clave no fueron ingresados correctamente 
            case 0 :
                var msj = raiz['msj0'];
                alert(msj);
                break;
                // Código para indicar que el usuario se encuentra dentro de la BD pero no está autorizado para ingresar a la apliación
            case 1 :
                var msj = raiz['msj1'];
                alert(msj);
                window.errno = 0;
                break;
        }
    }
}

function seconsNumber()
{
    var fechacompleta = new Date();
    return fechacompleta.getTime();
}
var xd;
function ValidarAccesoServidor(login, password)
{
    username = login;
    
    if( navigator.userAgent.match( /Android/i ) ) {
        userpass = escape(password);
        //alert(window.top.navigator.network);
    } else {
        userpass = encodeURI(password);
    }
    var segundos = seconsNumber();
    var rs = false;

    $.ajax({
        url: ruta + "FLW.php?tiempo=" + segundos,
        username: username,
        password: userpass,
        async: false,
        success: function(a) {
            var consulta = mostrarRespuesta(login, password);
            if (consulta === "1") {
                rs = true;
            } else if (consulta === "0") {
                window.errno = 1;
                return false;
            } else {
                alert('Error al establecer la conexión con el servidor, por favor cuminicarse con el área de soporte');
            }

        },
        error: function(xhr) {
            var estado = xhr.status;
            var mensaje1 = '';
            var mensaje2 = '';
            if(localStorage["idioma"] === 'es') {
                mensaje1 = 'No se encontro la página solicitada, por favor comunicarse con el área de soporte';
                mensaje2 = 'Error al establecer la conexión con el servidor, por favor comunicarse con el área de soporte';;
            }
            if (localStorage["idioma"] === 'en') {
                mensaje1 = "The page you requested was not found, please contact the support area";
                mensaje2 = "Failed to connect to the server please contact the support area";
            }
            if (estado === 404) {
                mensaje = mensaje1;
                alert(mensaje);
            } else if (estado === 401) {
                //mensaje = 'Usuario o contraseña incorrectos';
            } else {
                mensaje = mensaje2;
                alert(mensaje);
            }
        }
    });
    return rs;
}

function getTipoUsuario(usuario, password)
{
    var id_query = "busqueda_tipou";
    var sql = "select c_rol_mobile from mahalo" + instancia_db + ":m_posuser where usuario = '" + usuario + "'";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var tipo = xmlGetRow(id_query, 0, 0)['c_rol_mobile'];
    return tipo;
}

/* borrados */

function validarUsuarioConsulta(usuario, password)
{
    var sql = "select sw_mobile from mahalo" + instancia_db + ":m_posuser where usuario = '" + usuario + "'";
    xmlQueryDB(sql, "busqueda_mobile", 1, false, ruta, usuario, password);
    ar_status = getStatusDB("busqueda_mobile");
    
    
    if (ar_status['status'] == 0) {
        var ar_datos = xmlGetRow("busqueda_mobile", 1, 0)['sw_mobile'];
        return ar_datos;
    }
    if (ar_status['status'] == 100) {
        alert('No se encontro el campo de consulta en la B.D.');
        return false;
    }
    else {
        alert("Error al realizar la consulta, por favor comunicarse con el área de soporte ");
        //console.log("Error : " + ar_status["status"]);
        return false;
    }
    return true;
}

function mostrarRespuesta(usuario, password)
{
    return validarUsuarioConsulta(usuario, password);
}

function deshabilitarIngreso()
{
    try {
    jQuery('#btnIngreso').addClass('ui-disabled');
    jQuery("input[type='checkbox']").checkboxradio('disable');
    jQuery("#txtUsuario").textinput('disable');
    jQuery("#txtPassword").textinput('disable');
    jQuery("#msgError").text('Debe de cerrar la aplicación para cerrar sesión');
    enterapp = true;
    }
    catch (e) {
        return false;
    }
}

function recordarUsuario()
{
    if (jQuery("#chkRecordar").is(":checked")) {
        localStorage['chkRecordar'] = "true";
        localStorage['txtUsuario'] = jQuery("#txtUsuario").val();
        localStorage['txtPassword'] = jQuery("#txtPassword").val();
    } else {
        localStorage['chkRecordar'] = "false";
        localStorage['txtUsuario'] = "";
        localStorage['txtPassword'] = "";
    }
}