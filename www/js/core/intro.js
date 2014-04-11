jQuery(document).on("ready", init);

function validarConexionPortalWeb(){
    if($("#txtUsuario").length > 0){
        setTimeout("conectar()",500);
        return true;
    }
    validarConexionPortalWeb();
    return true;
}
function test(){}
function init()
{    
    if ((localStorage['test'] == 1)) {
        localStorage['test'] = 0;
        validarConexionPortalWeb();
    } 
    
    if( navigator.userAgent.match( /Android/i ) ) {
        document.addEventListener('deviceready', test,false);
    }
    $("#version").html("&nbsp;" + version);
    $("#version").css("font-weight", "bold");
    $(document).css('border', '1px solid green');
    if (localStorage["idioma"] === "en") {
        $.each($("select option"), function() {
            $("[data-lang-id=lang121]").text("All");
        });
    }
    var fecha = getCurrentDate(new Date().toString());
    date_ventas = fecha;
    $("#date_inicial").val(fecha);
    $("#date_corte").val(fecha);
    $("#date_ventas").val(fecha);
    $("#date_inicial_transacciones").val(fecha);
    $("#date_corte_transacciones").val(fecha);
    new JsDatePick({useMode: 2, target: "date_vedate_inicialntas", dateFormat: "%Y-%m-%d", cellColorScheme: "armygreen"});
    new JsDatePick({useMode: 2, target: "", dateFormat: "%Y-%m-%d", cellColorScheme: "armygreen"});
    new JsDatePick({useMode: 2, target: "date_corte", dateFormat: "%Y-%m-%d", cellColorScheme: "armygreen"});
    new JsDatePick({useMode: 2, target: "date_inicial_transacciones", dateFormat: "%Y-%m-%d", cellColorScheme: "armygreen"});
    new JsDatePick({useMode: 2, target: "date_corte_transacciones", dateFormat: "%Y-%m-%d", cellColorScheme: "armygreen"});
}
function loadUrl()
{
    localStorage['test'] = 1;
    var ref = window.open(encodeURI('http://mahalo.saas.com.co/portalmahalo'), '_system', 'location=yes');
    ref.addEventListener('loadstart', function(event) { alert(event.type + ' - ' + event.url); } );
}

function loadInit()
{
    var usuario = '';
    mostrarLogin();
    iniciarCarrusel(usuario);
}
setTimeout(cron, 5000);
function refrescarPaginaActual()
{
    var path = jQuery.mobile.activePage.data('url');
    var elemento = jQuery('#' + path).attr('data-reload');
    if (elemento === 'yes') {
        jQuery.mobile.changePage('#' + path, {allowSamePageTransition: true});
    }
}
function ejecutaJsInModo()
{
    path = jQuery.mobile.activePage.data('url');
    var elemento = jQuery('#' + path).attr('data-dyn');

    if (elemento === 'yes') {
        var dataIn = jQuery('#' + path).attr('data-in');
        try {
            eval(dataIn);
        }
        catch (e) {
            alert('Error en función:' + dataIn + '--' + e.message);
        }
    }
}
function cron()
{
    refrescarPaginaActual();
    setTimeout(cron, 5000);
}
function refrescarManual()
{
    pagina_anterior = jQuery.mobile.activePage.data('url');
    jQuery.mobile.changePage('#' + pagina_anterior, {allowSamePageTransition: true});
    recargarManual = true;
}