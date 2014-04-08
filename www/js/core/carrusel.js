jQuery(document).on('pagebeforeshow', '#pagina-ventas', function() {
    cargarImagenes();
});
jQuery(document).on('pagebeforeshow', '#pagina-inventario', function() {
    cargarImagenes();
});
jQuery(document).on('pagebeforeshow', '#detalle-ventas', function() {
    cargarImagenes();
});
jQuery(document).on('pagebeforeshow', '#detalle-inventario', function() {
    cargarImagenes();
});

function iniciarCarrusel(usuario)
{
    cargarImagenes();
    cargarEnlaces();
    getItemsCarrusel();
    deshabilitarDecremento();
    initRoles();
    initImagenes(usuario);
    habilitarIncremento();
}

function initRoles()
{
    jQuery.getJSON(pathJSON + 'roles.json', function(data) {
        roles = data;
    });
    var i = 0;
    $.each(roles, function(k) {
        permisos_imagenes[i] = [parseInt(k.split("teclado-")[1]), "on"];
        i++;
    });
}

function initImagenes(usuario)
{
    var items = new Array();
    var teclados = new Array();
    var puntero = new Array();
    var TOTAL_ELEMENTOS = 9;
    var i = 0;
    var j = 0;
    var posiciones = new Array("#izquierda", "#centro", "#derecha");
    var imgs = new Array();

    $.each(usuario, function(k) {
        items[i] = [parseInt(k.split("teclado-")[1]), "on"];
        i++;
    });

    var array = new Array();
    for (var i = 0; i < TOTAL_ELEMENTOS; i++) {
        if (items[i] !== undefined) {
            array[items[i][0]] = items[i][1];
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === undefined) {
            array[i] = 'off';
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === 'on') {
            puntero[j] = i;
            teclados[j] = [i, array[i]];
            j++;
        }
    }

    for (var i = 0; i < 9; i++) {
        if (puntero.indexOf(i) === -1) {
            puntero.push(i);
            teclados.push([i, array[i]]);
        }
    }

    if (bottom !== "undefined") {
        imgs[0] = teclados[0][0];
        imgs[1] = teclados[1][0];
        imgs[2] = teclados[2][0];
    }

    for (var i = 0; i < 3; i++) {
        //tst = "<a href='javascript:irHomeMenuSlide(\"img" + imgs[i] + "\")'><img id='imgpos_" + i + "' src='img/menu-movil/img" + imgs[i] + ".png' alt='icono' /></a>";
        jQuery("nav ul" + " " + posiciones[i]).html("<a href='javascript:irHomeMenuSlide(\"img" + imgs[i] + "\")'><img id='imgpos_" + i + "' src='img/menu-movil/img" + imgs[i] + ".png' alt='icono' /></a>");
        //console.log("tst : " + tst);
    }
}

function deshabilitarDecremento()
{
    jQuery("nav ul #decremento").html("<img src='img/menu-movil/izquierda-off.png' alt='icono' />");
}

function habilitarDecremento()
{
    jQuery("nav ul #decremento").html("<img src='img/menu-movil/izquierda-on.png' alt='icono' onclick='decremento()' />");
}

function deshabilitarIncremento()
{
    jQuery("nav ul #incremento").html("<img src='img/menu-movil/derecha-off.png' alt='icono' />");
}

function habilitarIncremento()
{
    jQuery("nav ul #incremento").html("<img src='img/menu-movil/derecha-on.png' alt='icono' onclick='incremento()' />");
}

function verificarLimites(total_imagenes, primera, segunda, tercera)
{    
    if (primera <= 0) {
        deshabilitarDecremento();
    } else {
        habilitarDecremento();
    }
    if ((primera >= total_imagenes - 1) || (segunda >= total_imagenes - 1) || (tercera >= total_imagenes - 1)) {
        deshabilitarIncremento();
    }
    else {
        habilitarIncremento();
    }
}

function incremento()
{
    var limite;
    var primera, segunda, tercera, punto, posicion;
    var imagenes = bottom;
    var referencia, numeroImagenes, num_pos;
    var j = 0;
    var i;
    var first = 0;
    var second = 0;
    var third = 0;
    var new_imagenes_asc = new Array();
    for (var i = 0; i < imagenes.length; i++) {
        if (imagenes[i][1] === "on") {
            new_imagenes_asc[j] = imagenes[i][0];
            ++j;
        }
    } 
    numeroImagenes = new_imagenes_asc.length;
    limite = numeroImagenes - 1;
    referencia = jQuery("nav ul #derecha img").attr("id");
    posicion = referencia.split("imgpos_");
    num_pos = posicion[1];
    punto = Number(num_pos) + new_imagenes_asc[0] + 1;
    if (punto>0) { punto = new_imagenes_asc.indexOf(new_imagenes_asc[punto]); }
    primera = punto;
    first = new_imagenes_asc[primera];
    segunda = primera + 1; 
    second = new_imagenes_asc[segunda];
    tercera = segunda + 1;
    third = new_imagenes_asc[tercera]; 
    verificarLimites(numeroImagenes, primera, segunda, tercera);
    if (primera > limite) {
        jQuery("nav ul #izquierda").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #izquierda").html("<a href='javascript:irHomeMenuSlide(\"img" + first + "\")'><img id='imgpos_"+primera+"' src='img/menu-movil/img" + first + ".png' alt='icono' /></a>");
    }
    if (segunda > limite) {
        jQuery("nav ul #centro").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #centro").html("<a href='javascript:irHomeMenuSlide(\"img" + second + "\")'><img id='imgpos_"+segunda+"' src='img/menu-movil/img" + second + ".png' alt='icono' /></a>");
    }
    if (tercera > limite) {
        jQuery("nav ul #derecha").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #derecha").html("<a href='javascript:irHomeMenuSlide(\"img" + third + "\")'><img id='imgpos_"+tercera+"' src='img/menu-movil/img" + third + ".png' alt='icono' /></a>");
    }
}

function decremento()
{
    var limite, numeroImagenes, posicion, num_pos;
    var primera, segunda, tercera, punto, referencia;
    var first, second, third;
    var imagenes = bottom;
    var new_imagenes_desc = new Array();
    
    for (var i = 0; i < imagenes.length; i++) {
        if (imagenes[i][1] === "on") {
            new_imagenes_desc[i] = imagenes[i][0];
        }
    } 
    
    numeroImagenes = new_imagenes_desc.length;
    limite = 0;
    referencia = jQuery("nav ul #izquierda img").attr("id"); 
    posicion = referencia.split("imgpos_");
    num_pos = posicion[1];
    punto = Number(num_pos) + new_imagenes_desc[0] - 1;
    if (punto>0) { punto = new_imagenes_desc.indexOf(new_imagenes_desc[punto]); } 
    primera = punto;
    third = new_imagenes_desc[primera];
    segunda = primera - 1;
    second = new_imagenes_desc[segunda];
    tercera = segunda - 1;
    first = new_imagenes_desc[tercera] ;     
    verificarLimites(numeroImagenes, primera, segunda, tercera);
    if (primera < limite) {
        jQuery("nav ul #izquierda").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #izquierda").html("<a href='javascript:irHomeMenuSlide(\"img" + first + "\")'><img id='imgpos_" + tercera + "' src='img/menu-movil/img" + first + ".png' alt='icono' /></a>");
    }
    if (segunda < limite) {
        jQuery("nav ul #centro").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #centro").html("<a href='javascript:irHomeMenuSlide(\"img" + second + "\")'><img id='imgpos_" + segunda + "' src='img/menu-movil/img" + second + ".png' alt='icono' /></a>");
    }
    if (tercera < limite) {
        jQuery("nav ul #derecha").html("<img src='img/menu-movil/no-ico.png' alt='icono' />");
    } else {
        jQuery("nav ul #derecha").html("<a href='javascript:irHomeMenuSlide(\"img" + third + "\")'><img id='imgpos_" + primera + "' src='img/menu-movil/img" + third + ".png' alt='icono' /></a>");
    }
    if (tercera === 0) {
        deshabilitarDecremento();
    }
}

function ocultarPanelMenuSlide()
{
    jQuery("#menu-movil").css('display', 'none');
    jQuery("#panel-menu-slide").css('bottom', '0');
    jQuery("#panel-menu-slide").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide()">+</div>');
}

function mostrarPanelMenuSlide()
{
    jQuery("#panel-menu-slide").css('bottom', '35px');
    jQuery("#menu-movil").css('display', 'block');
    jQuery("#panel-menu-slide").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide()">-</div>');
}

function ocultarPanelMenuSlide2()
{
    jQuery("#menu-movil-2").css('display', 'none');
    jQuery("#panel-menu-slide-2").css('bottom', '0');
    jQuery("#panel-menu-slide-2").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide2()">+</div>');
}

function mostrarPanelMenuSlide2()
{
    jQuery("#panel-menu-slide-2").css('bottom', '35px');
    jQuery("#menu-movil-2").css('display', 'block');
    jQuery("#panel-menu-slide-2").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide2()">-</div>');
}

function ocultarPanelMenuSlide3()
{
    jQuery("#menu-movil-3").css('display', 'none');
    jQuery("#panel-menu-slide-3").css('bottom', '0');
    jQuery("#panel-menu-slide-3").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide3()">+</div>');
}

function mostrarPanelMenuSlide3()
{
    jQuery("#panel-menu-slide-3").css('bottom', '35px');
    jQuery("#menu-movil-3").css('display', 'block');
    jQuery("#panel-menu-slide-3").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide3()">-</div>');
}

function ocultarPanelMenuSlide4()
{
    jQuery("#menu-movil-4").css('display', 'none');
    jQuery("#panel-menu-slide-4").css('bottom', '0');
    jQuery("#panel-menu-slide-4").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide4()">+</div>');
}

function mostrarPanelMenuSlide4()
{
    jQuery("#panel-menu-slide-4").css('bottom', '35px');
    jQuery("#menu-movil-4").css('display', 'block');
    jQuery("#panel-menu-slide-4").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide4()">-</div>');
}

function ocultarPanelMenuSlide5()
{
    jQuery("#menu-movil-5").css('display', 'none');
    jQuery("#panel-menu-slide-5").css('bottom', '0');
    jQuery("#panel-menu-slide-5").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide5()">+</div>');
}

function mostrarPanelMenuSlide5()
{
    jQuery("#panel-menu-slide-5").css('bottom', '35px');
    jQuery("#menu-movil-5").css('display', 'block');
    jQuery("#panel-menu-slide-5").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide5()">-</div>');
}
function ocultarPanelMenuSlide6()
{
    jQuery("#menu-movil-6").css('display', 'none');
    jQuery("#panel-menu-slide-6").css('bottom', '0');
    jQuery("#panel-menu-slide-6").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:mostrarPanelMenuSlide6()">+</div>');
}

function mostrarPanelMenuSlide6()
{
    jQuery("#panel-menu-slide-6").css('bottom', '35px');
    jQuery("#menu-movil-6").css('display', 'block');
    jQuery("#panel-menu-slide-6").html('<div style="margin:0 auto; padding:0; width: 25px; background-color: #fff; color:black; cursor:pointer; padding-bottom:0.1em; font-weight:bold;" data-role="footer" data-theme="c" onclick="javascript:ocultarPanelMenuSlide6()">-</div>');
}