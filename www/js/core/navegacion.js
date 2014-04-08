function traerItem(item) {
    return item;
}
function resetHome()
{
    var last = historial.length - 1;
    var current = historial.indexOf("home");
    var top = last - current;
    for (var i = 0; i < top; i++) {
        historial.pop();
    }
    return true;
}

function irHome()
{
    sumarTab = true;
    btnInicio = false;
    btnAtras = true;
    history.go(-pagina);
}

function irAtras()
{
    sumarTab = true;
    btnAtras = false;
    btnInicio = true;
}

function salir()
{
    history.go(-2);
    pagina = -2;
}

function irHomeMenuSlide(posicion)
{
    cargarImagenes();
    var enlaces = cargarEnlaces();

    for (var i = 0; i < 9; i++) {
        if (!enlaces[i]) {
            enlaces.push("#");
        }
    }

    var url, salida;
    var pathActual = jQuery.mobile.activePage.data('url');

    switch (posicion) {
        case 'img0' :
            url = enlaces[0];
            break;
        case 'img1' :
            url = enlaces[1];
            break;
        case 'img2' :
            url = enlaces[2];
            break;
        case 'img3' :
            url = enlaces[3];
            break;
        case 'img4' :
            url = enlaces[4];
            break;
        case 'img5' :
            url = enlaces[5];
            break;
        case 'img6' :
            url = enlaces[6];
            break;
        case 'img7' :
            url = enlaces[7];
            break;
        case 'img8' :
            url = enlaces[8];
            break;
        case 'img9' :
            url = enlaces[9];
            break;
        default :
            break;
    }

    var enlace = url.replace("#", "");

    if (pathActual !== enlace && enlace !== "") {
        salida = jQuery.inArray(enlace, historial);
        if (salida === -1) {
            jQuery.mobile.changePage(url);
        } else {

            var max = idx_historia - 1;
            var pag_retroceder = max - salida;

            for (var i = max; i > salida; i--) {
                historial.pop();
                idx_historia--;
            }

            btnAtras = true;
            btnInicio = false;
            slide = true;

            history.go(-pag_retroceder);
        }
    }
}

function contarCargaPaginas()
{
    jQuery(".btnAtras").on("click", function() {
        irAtras();
    });
    var selector = "#";
    curpath = jQuery.mobile.activePage.data('url');
    if (curpath === "pagina-facturacion") {
        traerValoresGestionUsuario();
    }
    var dinamica = breadcrumbs[selector + curpath];
    var salida = jQuery.inArray(curpath, historial);
    var last = "";

    if (pagina_anterior === "detalles-ventas-general") {
        $("#informe-ventas-general").attr("data-in", "tabVentasGeneral3()");
    } else {
        if (curpath === "informe-ventas-general") {
            $("#informe-ventas-general").attr("data-in", "tabVentasGeneral1()");
            $("#checkbox-h-6").prop('checked', true).checkboxradio("refresh");
        }
    }

    if (salida === -1) {
        var prefijo = curpath.substr(0, 3);
        if (prefijo === 'tab') {
            var tabs = curpath.split('-');
            if (tabs[2] === "1" && sumarTab === true) {
                historial.push(curpath);
                idx_historia++;
            }
        } else {
            historial.push(curpath);
            idx_historia++;
        }
    }

    else {
        if (btnAtras === true) {
            if (btnInicio === false) {
                var max = idx_historia - 1;
                for (var i = max; i > salida; i--) {
                    historial.pop();
                    idx_historia--;
                }
            }
            btnAtras = false;
        }
    }

    if (btnInicio === true) {
        if (btnAtras === false) {
            prefijo = curpath.substr(0, 3);
            if (prefijo !== 'tab') {
                pagina = pagina - 1;
                historial.pop();
                idx_historia--;
                btnAtras = true;
                sumarTab = true;
            }
        }
        else {
            prefijo = curpath.substr(0, 3);
            if (prefijo === 'tab') {
                tabs = curpath.split('-');
                if (tabs[2] === "1" && sumarTab === true) {
                    sumarTab = false;
                    pagina = pagina + 1;
                }
            }
            else {
                pagina = pagina + 1;
                sumarTab = true;
            }
        }
    }
    else {
        btnAtras = true;
        btnInicio = true;
        if (slide) {
            pagina = 1;
            slide = false;
        } else {
            pagina = 0;
        }
    }
    if (curpath === "home") {
        if (localStorage["idioma"] === "en") {
            $("#wrp_almacenes").html("<select data-mini=\"true\" name=\"select_almacenes\" id=\"select_almacenes\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_tallas").html("<select data-mini=\"true\" name=\"select_tallas\" id=\"select_tallas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_colores").html("<select data-mini=\"true\" name=\"select_colores\" id=\"select_colores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_lineas").html("<select data-mini=\"true\" name=\"select_lineas\" id=\"select_lineas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_categorias").html("<select data-mini=\"true\" name=\"select_categorias\" id=\"select_categorias\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_subcategorias").html("<select data-mini=\"true\" name=\"select_subcategorias\" id=\"select_subcategorias\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_marcas").html("<select data-mini=\"true\" name=\"select_marcas\" id=\"select_marcas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_segmentos").html("<select data-mini=\"true\" name=\"select_segmentos\" id=\"select_segmentos\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_sectores").html("<select data-mini=\"true\" name=\"select_sectores\" id=\"select_sectores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_colecciones").html("<select data-mini=\"true\" name=\"select_colecciones\" id=\"select_colecciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_clasificaciones").html("<select data-mini=\"true\" name=\"select_clasificaciones\" id=\"select_clasificaciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_proveedores").html("<select data-mini=\"true\" name=\"select_proveedores\" id=\"select_proveedores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_tipodoc").html("<select data-mini=\"true\" name=\"select_tipodocumento\" id=\"select_tipodocumento\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_tipoven").html("<select data-mini=\"true\" name=\"select_tipoventa\" id=\"select_tipoventa\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_vendedor").html("<select data-mini=\"true\" name=\"select_vendedor\" id=\"select_vendedor\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_anulado").html("<select data-mini=\"true\" name=\"select_anulado\" id=\"select_anulado\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"1\" selected=\"selected\">All</option><option value=\"2\">Yes</option><option value=\"3\">Not</option></select>");

            $("#wrp_almacenes_transacciones").html("<select data-mini=\"true\" name=\"select_almacenes_transacciones\" id=\"select_almacenes_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_conceptos_transacciones").html("<select data-mini=\"true\" name=\"select_conceptos_transacciones\" id=\"select_conceptos_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_tallas_transacciones").html("<select data-mini=\"true\" name=\"select_tallas_transacciones\" id=\"select_tallas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_colores_transacciones").html("<select data-mini=\"true\" name=\"select_colores_transacciones\" id=\"select_colores_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_lineas_transacciones").html("<select data-mini=\"true\" name=\"select_lineas_transacciones\" id=\"select_lineas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_categorias_transacciones").html("<select data-mini=\"true\" name=\"select_categorias_transacciones\" id=\"select_categorias_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_subcategorias_transacciones").html("<select data-mini=\"true\" name=\"select_subcategorias_transacciones\" id=\"select_subcategorias_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_marcas_transacciones").html("<select data-mini=\"true\" name=\"select_marcas_transacciones\" id=\"select_marcas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_segmentos_transacciones").html("<select data-mini=\"true\" name=\"select_segmentos_transacciones\" id=\"select_segmentos_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_sectores_transacciones").html("<select data-mini=\"true\" name=\"select_sectores_transacciones\" id=\"select_sectores_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_colecciones_transacciones").html("<select data-mini=\"true\" name=\"select_colecciones_transacciones\" id=\"select_colecciones_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_clasificaciones_transacciones").html("<select data-mini=\"true\" name=\"select_clasificaciones_transacciones\" id=\"select_clasificaciones_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_almacenes_origen_transacciones").html("<select data-mini=\"true\" name=\"select_almacenes_origen_transacciones\" id=\"select_almacenes_origen_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_almacenes_destino_transacciones").html("<select data-mini=\"true\" name=\"select_almancenes_destino_transacciones\" id=\"select_almacenes_destino_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_nit_transacciones").html("<select data-mini=\"true\" name=\"select_nit_transacciones\" id=\"select_nit_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">All</option></select>");
            $("#wrp_estadokardex_transacciones").html("<select data-mini=\"true\" name=\"select_estadokardex_transacciones\" id=\"select_estadokardex_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\">All</option><option value=\"1\">Uploaded</option><option value=\"2\">Transit</option></select>");

        } else {
            $("#wrp_almacenes").html("<select data-mini=\"true\" name=\"select_almacenes\" id=\"select_almacenes\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_tallas").html("<select data-mini=\"true\" name=\"select_tallas\" id=\"select_tallas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_colores").html("<select data-mini=\"true\" name=\"select_colores\" id=\"select_colores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_lineas").html("<select data-mini=\"true\" name=\"select_lineas\" id=\"select_lineas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_categorias").html("<select data-mini=\"true\" name=\"select_categorias\" id=\"select_categorias\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_subcategorias").html("<select data-mini=\"true\" name=\"select_subcategorias\" id=\"select_subcategorias\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_marcas").html("<select data-mini=\"true\" name=\"select_marcas\" id=\"select_marcas\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_segmentos").html("<select data-mini=\"true\" name=\"select_segmentos\" id=\"select_segmentos\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_sectores").html("<select data-mini=\"true\" name=\"select_sectores\" id=\"select_sectores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_colecciones").html("<select data-mini=\"true\" name=\"select_colecciones\" id=\"select_colecciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_clasificaciones").html("<select data-mini=\"true\" name=\"select_clasificaciones\" id=\"select_clasificaciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_proveedores").html("<select data-mini=\"true\" name=\"select_proveedores\" id=\"select_proveedores\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_tipodoc").html("<select data-mini=\"true\" name=\"select_tipodocumento\" id=\"select_tipodocumento\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_tipoven").html("<select data-mini=\"true\" name=\"select_tipoventa\" id=\"select_tipoventa\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_vendedor").html("<select data-mini=\"true\" name=\"select_vendedor\" id=\"select_vendedor\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_anulado").html("<select data-mini=\"true\" name=\"select_anulado\" id=\"select_anulado\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"1\" selected=\"selected\">Todos</option><option value=\"2\">Si</option><option value=\"3\">No</option></select>");

            $("#wrp_almacenes_transacciones").html("<select data-mini=\"true\" name=\"select_almacenes_transacciones\" id=\"select_almacenes_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_conceptos_transacciones").html("<select data-mini=\"true\" name=\"select_conceptos_transacciones\" id=\"select_conceptos_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_tallas_transacciones").html("<select data-mini=\"true\" name=\"select_tallas_transacciones\" id=\"select_tallas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_colores_transacciones").html("<select data-mini=\"true\" name=\"select_colores_transacciones\" id=\"select_colores_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_lineas_transacciones").html("<select data-mini=\"true\" name=\"select_lineas_transacciones\" id=\"select_lineas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_categorias_transacciones").html("<select data-mini=\"true\" name=\"select_categorias_transacciones\" id=\"select_categorias_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_subcategorias_transacciones").html("<select data-mini=\"true\" name=\"select_subcategorias_transacciones\" id=\"select_subcategorias_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_marcas_transacciones").html("<select data-mini=\"true\" name=\"select_marcas_transacciones\" id=\"select_marcas_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_segmentos_transacciones").html("<select data-mini=\"true\" name=\"select_segmentos_transacciones\" id=\"select_segmentos_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_sectores_transacciones").html("<select data-mini=\"true\" name=\"select_sectores_transacciones\" id=\"select_sectores_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_colecciones_transacciones").html("<select data-mini=\"true\" name=\"select_colecciones_transacciones\" id=\"select_colecciones_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_clasificaciones_transacciones").html("<select data-mini=\"true\" name=\"select_clasificaciones_transacciones\" id=\"select_clasificaciones_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_almacenes_origen_transacciones").html("<select data-mini=\"true\" name=\"select_almacenes_origen_transacciones\" id=\"select_almacenes_origen_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_almacenes_destino_transacciones").html("<select data-mini=\"true\" name=\"select_almancenes_destino_transacciones\" id=\"select_almacenes_destino_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_nit_transacciones").html("<select data-mini=\"true\" name=\"select_nit_transacciones\" id=\"select_nit_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\" data-lang-id=\"lang121\">Todos</option></select>");
            $("#wrp_estadokardex_transacciones").html("<select data-mini=\"true\" name=\"select_estadokardex_transacciones\" id=\"select_estadokardex_transacciones\" onchange=\"traerItem(parseInt(this.value));\"><option value=\"all\" selected=\"selected\">Todos</option><option value=\"1\">Actualizado</option><option value=\"2\">Transito</option></select>");

        }
        resetHome();
        if (pagina < 0) {
            pagina = 0;
        }
    }
    if (dinamica === 'yes') {
        var $titulo = "";
        var $tagid = "";
        if ($(selector + curpath + " header h1 > div > div").text() === "") {
            $titulo = $(selector + curpath + " header > h1").text();
            $tagid = $(selector + curpath + " header > h1 span").attr("data-lang-id");
        } else {
            $titulo = $(selector + curpath + " header h1 > div > div").text();
            $tagid = $(selector + curpath + " header > h1 div div").attr("data-lang-id");
        }
        var page = selector + curpath;
        jQuery(page + " " + "header h1").html("<div style='text-align:center; class='encabezado-mod'>" +
                "<div style='display:inline-block; vertical-align:top;' data-lang-id='" + $tagid + "'>" + $titulo + "</div> " +
                "<a href='javascript:refrescarManual()'>" +
                "<img class='loader' onclick='' src='img/home/refrescar20x20.png' width='20' height='20' /></a></div>");
    }

    ejecutaJsInModo();
    setTagLanguage();
    if (recargarManual === true) {
        last = historial[historial.length - 1];
        if (last !== curpath) {
            historial.push(curpath);
            pagina++;
        }
        recargarManual = false;
    }
    var pantallas = new Array();
    var j = 0;
    var permisos = new Array();
    var CTE_TECLADO = 'teclado-';
    var CTE_ROLES = 'rol-';
    for (var i in roles[ CTE_ROLES + typeuser ]) {
        pantallas[j] = i.toString();
        j++;
    }
    var longitud_pantallas = pantallas.length;
    if (longitud_pantallas > 0) {
        for (var k = 0; k < longitud_pantallas; k++) {
            switch (pantallas[k]) {
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break; 
                case CTE_TECLADO + (k) :
                    permisos[k] = roles[ CTE_ROLES + (typeuser) ][ CTE_TECLADO + k ];
                    break;
                default :
                    break;
            }
            if (anclas[k] === "#" + curpath) {
                for (i in permisos[k]) {
                    if (permisos[k][i] === 'off') {
                        jQuery.trim($("#" + curpath + " li[data-perm=" + i + "]").css('display', 'none'));
                    }
                }
            }
        }
    }
    if ((curpath === "top-ventasxclientes") || (curpath === "top-ventasxvend") || (curpath === "top-ventasxprod") || (curpath === "top-ventasxdesc") || (curpath === "#top-ventasxtipoventas") || (curpath === "top-ventasxalmacenes") || (curpath === "top-kardexconcepto") || (curpath === "top-kardexnit")) {
        pagina = 2;
    } 
    pagina_anterior = curpath;
}

function initVentasGeneral()
{
    $("#frmChoiceFilters").trigger('create');
    $("#txt_cedula").val("");
    $("#txt_referencia").val("");
    $("#txt_plu").val("");
    $("#select_almacenes").val(1);
    $("#select_tipodocumento").val(1);
    $("#select_tipoventa").val(1);
    $("#select_vendedor").val(1);
    $("#select_anulado").val(1);
    cambiarCampos(55, 6, 'in');
}
function cambiarCampos(cantidad, codigo, operacion)
{
    var init = 0;
    var j = 0;
    for (var i = init; i < cantidad; i++) {
        if ((j === 26) || (j === 52) || (j === 78)) {
            j = 0;
        }
        if (i < 26) {
            if (operacion === 'in') {
                $("input[name=checkbox-h-" + codigo + "" + codigosCheckbox[j] + "]").prop('checked', true).checkboxradio("refresh");
            }
            else {
                $("input[name=checkbox-h-" + codigo + "" + codigosCheckbox[j] + "]").prop('checked', false).checkboxradio("refresh");
            }
            j++;
        } else if (i < 52) {
            if (operacion === 'in') {
                $("input[name=checkbox-h-" + codigo + "a" + "" + codigosCheckbox[j] + "]").prop('checked', true).checkboxradio("refresh");
            }
            else {
                $("input[name=checkbox-h-" + codigo + "a" + "" + codigosCheckbox[j] + "]").prop('checked', false).checkboxradio("refresh");
            }
            j++;
        } else if (i < 78) {
            if (operacion === 'in') {
                $("input[name=checkbox-h-" + codigo + "aa" + "" + codigosCheckbox[j] + "]").prop('checked', true).checkboxradio("refresh");
            }
            else {
                $("input[name=checkbox-h-" + codigo + "aa" + "" + codigosCheckbox[j] + "]").prop('checked', false).checkboxradio("refresh");
            }
            j++;
        }
    }
}

function selectCamposVentasGeneral() {
    if (jQuery("input[name=checkbox-h-6]").is(":checked")) {
        cambiarCampos(55, 6, 'in');
    } else {
        cambiarCampos(55, 6, 'out');
    }
}
function selectCamposInventario() {
    if (jQuery("input[name=checkbox-h-7]").is(":checked")) {
        cambiarCampos(37, 7, 'in');
    } else {
        cambiarCampos(37, 7, 'out');
    }
}

function getItemsCarrusel()
{
    var enlaces = cargarEnlaces();
    var roles = permisos_imagenes;
    var items_roles = new Array();

    for (var i = 0; i < roles.length; i++) {
        if (roles[i] === "on") {
            items_roles[i] = enlaces[i];
        }
    }
    var total = items_roles.length;
    for (var j = total; j < 9; j++) {
        items_roles.push("#");
    }
    return items_roles;
}

jQuery(document).on('pagechange', contarCargaPaginas);
jQuery(document).on('pagechange', function() {
    //$("#informe-ventas-general").trigger("create");
    //$("#opciones-inventario").trigger("create");
});