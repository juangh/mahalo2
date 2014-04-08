
var espacio = '&nbsp;&nbsp;';

function NetearDivsTopGeneral() {
    jQuery("#contenidoGraficaVentas").html('');
    jQuery("#contenidoGraficaVendedores").html('');
    jQuery("#contenidoGraficaProductos").html('');
    jQuery("#contenidoGraficaDescuentos").html('');
    jQuery("#contenidoGraficaTiposVentas").html('');
    jQuery("#contenidoGraficaAlmacenes").html('');
    jQuery("#contenidoGraficaConcepto").html('');
    jQuery("#contenidoGraficaNit").html('');
}
function toCurrency(cnt) {
    cnt = cnt.toString().replace(/\$|\,/g, '');
    if (isNaN(cnt))
        return 0;
    var sgn = (cnt === (cnt = Math.abs(cnt)));
    cnt = Math.floor(cnt * 100 + 0.5);
    cvs = cnt % 100;
    cnt = Math.floor(cnt / 100).toString();
    if (cvs < 10)
        cvs = '0' + cvs;
    for (var i = 0; i < Math.floor((cnt.length - (1 + i)) / 3); i++)
        cnt = cnt.substring(0, cnt.length - (4 * i + 3)) + ',' + cnt.substring(cnt.length - (4 * i + 3));
    return (((sgn) ? '-' : '') + cnt + '.' + cvs);
}
function graficarHistogramaVentas()
{
    var GRAFICA = 'historial_ventas';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsVentas").removeClass("pointsVentas");
    jQuery("#histogramaVentas").css("background", "#78bde7");
    jQuery("#tortaVentas").css("background", "#2f2f2f");
    jQuery("#puntosVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Clientes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaVentas").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaVentas").html('');
                jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');
                jQuery("#barVentas").text(barras.substr(1));
                jQuery("#barVentas").peity("bar");
                jQuery("#contenidoGraficaVentas").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaVentas) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaVentas = false;
                }
            }
        }
    }
}
function graficarTortaVentas()
{
    var GRAFICA = 'torta_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVentas").removeClass("pointsVentas");
    jQuery("#histogramaVentas").css("background", "#2f2f2f");
    jQuery("#tortaVentas").css("background", "#78bde7");
    jQuery("#puntosVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Clientes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaVentas").html('');
            jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');
            jQuery("#pieVentas").text(barras.substr(1));
            jQuery("#pieVentas").peity("pie");
            jQuery("#contenidoGraficaVentas").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaVentas = false;
            }
        }
    }
}
function graficarLineaVentas()
{
    var GRAFICA = 'linea_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVentas").removeClass("barsVentas");
    jQuery("#histogramaVentas").css("background", "#2f2f2f");
    jQuery("#tortaVentas").css("background", "#2f2f2f");
    jQuery("#puntosVentas").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Clientes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaVentas").html('');
            jQuery("#contenidoGraficaVentas").html('<div id="barVentas" style="display:none;"></div><div id="pieVentas" style="display:none;"></div><div id="lineVentas" style="display:none;"></div>');
            jQuery("#lineVentas").text(barras.substr(1));
            jQuery("#lineVentas").peity("line");
            jQuery("#contenidoGraficaVentas").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaVentas = false;
            }
        }
    }
}
function graficarHistogramaVendedores()
{
    var GRAFICA = 'histograma_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsVendedores").removeClass("pointsVendedores");
    jQuery("#histogramaVendedores").css("background", "#78bde7");
    jQuery("#tortaVendedores").css("background", "#2f2f2f");
    jQuery("#puntosVendedores").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Vendedores();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaVendedores").html('');
            jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
            jQuery("#barVendedores").text(barras.substr(1));
            jQuery("#barVendedores").peity("bar");
            jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));
            //jdg = $("canvas.peity").length;
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaVendedores) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaVendedores = false;
            }
        }
    }
}
function graficarTortaVendedores()
{
    var GRAFICA = 'torta_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("pointsVendedores");
    jQuery("#histogramaVendedores").css("background", "#2f2f2f");
    jQuery("#tortaVendedores").css("background", "#78bde7");
    jQuery("#puntosVendedores").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Vendedores();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jdg = barras;
            jQuery("#contenidoGraficaVendedores").html('');
            jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
            jQuery("#pieVendedores").text(barras.substr(1));
            jQuery("#pieVendedores").peity("pie");
            jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));

            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaVendedores) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaVendedores = false;
            }
        }
    }
}
function graficarLineaVendedores()
{
    var GRAFICA = 'linea_vendedores';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("barsVendedores");
    jQuery("#histogramaVendedores").css("background", "#2f2f2f");
    jQuery("#tortaVendedores").css("background", "#2f2f2f");
    jQuery("#puntosVendedores").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Vendedores();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaVendedores").html('');
            jQuery("#contenidoGraficaVendedores").html('<div id="barVendedores" style="display:none;"></div><div id="pieVendedores" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');

            jQuery("#lineVendedores").text(barras.substr(1));
            jQuery("#lineVendedores").peity("line");
            jQuery("#contenidoGraficaVendedores").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaVendedores) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaVendedores = false;
            }
        }
    }
}
function graficarHistogramaProductos()
{
    var GRAFICA = 'histograma_productos';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsProductos").removeClass("pointsProductos");
    jQuery("#histogramaProductos").css("background", "#78bde7");
    jQuery("#tortaProductos").css("background", "#2f2f2f");
    jQuery("#puntosProductos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Productos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaProductos").html('');
            jQuery("#contenidoGraficaProductos").html('<div id="barProductos" style="display:none;"></div><div id="pieProductos" style="display:none;"></div><div id="lineVendedores" style="display:none;"></div>');
            jQuery("#barProductos").text(barras.substr(1));
            jQuery("#barProductos").peity("bar");
            jQuery("#contenidoGraficaProductos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaProductos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaProductos = false;
            }
        }
    }
}
function graficarTortaProductos()
{
    var GRAFICA = 'torta_productos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histVendedores").removeClass("pointsProductos");
    jQuery("#histogramaProductos").css("background", "#2f2f2f");
    jQuery("#tortaProductos").css("background", "#78bde7");
    jQuery("#puntosProductos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Productos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaProductos").html('');
            jQuery("#contenidoGraficaProductos").html('<div id="barProductos" style="display:none;"></div><div id="pieProductos" style="display:none;"></div><div id="lineProductos" style="display:none;"></div>');
            jQuery("#pieProductos").text(barras.substr(1));
            jQuery("#pieProductos").peity("pie");
            jQuery("#contenidoGraficaProductos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaProductos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaProductos = false;
            }
        }
    }
}
function graficarLineaProductos()
{
    var GRAFICA = 'linea_productos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histProductos").removeClass("barsProductos");
    jQuery("#histogramaProductos").css("background", "#2f2f2f");
    jQuery("#tortaProductos").css("background", "#2f2f2f");
    jQuery("#puntosProductos").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Productos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaProductos").html('');
            jQuery("#contenidoGraficaProductos").html('<div id="barProductos" style="display:none;"></div><div id="pieProductos" style="display:none;"></div><div id="lineProductos" style="display:none;"></div>');
            jQuery("#lineProductos").text(barras.substr(1));
            jQuery("#lineProductos").peity("line");
            jQuery("#contenidoGraficaProductos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaProductos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaProductos = false;
            }
        }
    }
}
function graficarHistogramaDescuentos()
{
    var GRAFICA = 'histograma_descuentos';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsDescuentos").removeClass("pointsDescuentos");
    jQuery("#histogramaDescuentos").css("background", "#78bde7");
    jQuery("#tortaDescuentos").css("background", "#2f2f2f");
    jQuery("#puntosDescuentos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Descuentos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaDescuentos").html('');
            jQuery("#contenidoGraficaDescuentos").html('<div id="barDescuentos" style="display:none;"></div><div id="pieDescuentos" style="display:none;"></div><div id="lineDescuentos" style="display:none;"></div>');
            jQuery("#barDescuentos").text(barras.substr(1));
            jQuery("#barDescuentos").peity("bar");
            jQuery("#contenidoGraficaDescuentos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaDescuentos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaDescuentos = false;
            }
        }
    }
}
function graficarTortaDescuentos()
{
    var GRAFICA = 'torta_descuentos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histDescuentos").removeClass("pointsDescuentos");
    jQuery("#histogramaDescuentos").css("background", "#2f2f2f");
    jQuery("#tortaDescuentos").css("background", "#78bde7");
    jQuery("#puntosDescuentos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Descuentos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaDescuentos").html('');
            jQuery("#contenidoGraficaDescuentos").html('<div id="barDescuentos" style="display:none;"></div><div id="pieDescuentos" style="display:none;"></div><div id="lineDescuentos" style="display:none;"></div>');
            jQuery("#pieDescuentos").text(barras.substr(1));
            jQuery("#pieDescuentos").peity("pie");
            jQuery("#contenidoGraficaDescuentos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaDescuentos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaDescuentos = false;
            }
        }
    }
}
function graficarLineaDescuentos()
{
    var GRAFICA = 'linea_descuentos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histDescuentos").removeClass("barsDescuentos");
    jQuery("#histogramaDescuentos").css("background", "#2f2f2f");
    jQuery("#tortaDescuentos").css("background", "#2f2f2f");
    jQuery("#puntosDescuentos").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Descuentos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaDescuentos").html('');
            jQuery("#contenidoGraficaDescuentos").html('<div id="barDescuentos" style="display:none;"></div><div id="pieDescuentos" style="display:none;"></div><div id="lineDescuentos" style="display:none;"></div>');
            jQuery("#lineDescuentos").text(barras.substr(1));
            jQuery("#lineDescuentos").peity("line");
            jQuery("#contenidoGraficaDescuentos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaDescuentos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaDescuentos = false;
            }
        }
    }
}
function graficarHistogramaTiposVentas()
{
    var GRAFICA = 'histograma_tipos_ventas';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsTiposVentas").removeClass("pointsTiposVentas");
    jQuery("#histogramaTiposVentas").css("background", "#78bde7");
    jQuery("#tortaTiposVentas").css("background", "#2f2f2f");
    jQuery("#puntosTiposVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10TiposVentas();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i <= puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaTiposVentas").html('');
            jQuery("#contenidoGraficaTiposVentas").html('<div id="barTiposVentas" style="display:none;"></div><div id="pieTiposVentas" style="display:none;"></div><div id="lineTiposVentas" style="display:none;"></div>');
            jQuery("#barTiposVentas").text(barras.substr(1));
            jQuery("#barTiposVentas").peity("bar");
            jQuery("#contenidoGraficaTiposVentas").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaTiposVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaTiposVentas = false;
            }
        }
    }
}

function graficarTortaTiposVentas()
{
    var GRAFICA = 'torta_tipos_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histTiposVentas").removeClass("pointsTiposVentas");
    jQuery("#histogramaTiposVentas").css("background", "#2f2f2f");
    jQuery("#tortaTiposVentas").css("background", "#78bde7");
    jQuery("#puntosTiposVentas").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10TiposVentas();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jdg = barras;
            jQuery("#contenidoGraficaTiposVentas").html('');
            jQuery("#contenidoGraficaTiposVentas").html('<div id="barTiposVentas" style="display:none;"></div><div id="pieTiposVentas" style="display:none;"></div><div id="lineTiposVentas" style="display:none;"></div>');
            jQuery("#pieTiposVentas").text(barras.substr(1));
            jQuery("#pieTiposVentas").peity("pie");
            jQuery("#contenidoGraficaTiposVentas").append($("canvas.peity"));

            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaTiposVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaTiposVentas = false;
            }
        }
    }
}
function graficarLineaTiposVentas()
{
    var GRAFICA = 'linea_tipos_ventas';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histTiposVentas").removeClass("barsTiposVentas");
    jQuery("#histogramaTiposVentas").css("background", "#2f2f2f");
    jQuery("#tortaTiposVentas").css("background", "#2f2f2f");
    jQuery("#puntosTiposVentas").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10TiposVentas();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaTiposVentas").html('');
            jQuery("#contenidoGraficaTiposVentas").html('<div id="barTiposVentas" style="display:none;"></div><div id="pieTiposVentas" style="display:none;"></div><div id="lineTiposVentas" style="display:none;"></div>');

            jQuery("#lineTiposVentas").text(barras.substr(1));
            jQuery("#lineTiposVentas").peity("line");
            jQuery("#contenidoGraficaTiposVentas").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaTiposVentas) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaTiposVentas = false;
            }
        }
    }
}
function graficarHistogramaAlmacenes()
{
    var GRAFICA = 'histograma_almacenes';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsAlmacenes").removeClass("pointsAlmacenes");
    jQuery("#histogramaAlmacenes").css("background", "#78bde7");
    jQuery("#tortaAlmacenes").css("background", "#2f2f2f");
    jQuery("#puntosAlmacenes").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10Almacenes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaAlmacenes").html('');
            jQuery("#contenidoGraficaAlmacenes").html('<div id="barAlmacenes" style="display:none;"></div><div id="pieAlmacenes" style="display:none;"></div><div id="lineAlmacenes" style="display:none;"></div>');
            jQuery("#barAlmacenes").text(barras.substr(1));
            jQuery("#barAlmacenes").peity("bar");
            jQuery("#contenidoGraficaAlmacenes").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioHistogramaAlmacenes) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioHistogramaAlmacenes = false;
            }
        }
    }
}
function graficarTortaAlmacenes()
{
    var GRAFICA = 'torta_almacenes';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histAlmacenes").removeClass("pointsAlmacenes");
    jQuery("#histogramaAlmacenes").css("background", "#2f2f2f");
    jQuery("#tortaAlmacenes").css("background", "#78bde7");
    jQuery("#puntosAlmacenes").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10Almacenes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaAlmacenes").html('');
            jQuery("#contenidoGraficaAlmacenes").html('<div id="barTiposVentas" style="display:none;"></div><div id="pieAlmacenes" style="display:none;"></div><div id="lineAlmacenes" style="display:none;"></div>');
            jQuery("#pieAlmacenes").text(barras.substr(1));
            jQuery("#pieAlmacenes").peity("pie");
            jQuery("#contenidoGraficaAlmacenes").append($("canvas.peity"));

            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaAlmacenes) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaAlmacenes = false;
            }
        }
    }
}
function graficarLineaAlmacenes()
{
    var GRAFICA = 'linea_almacenes';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histAlmacenes").removeClass("barsAlmacenes");
    jQuery("#histogramaAlmacenes").css("background", "#2f2f2f");
    jQuery("#tortaAlmacenes").css("background", "#2f2f2f");
    jQuery("#puntosAlmacenes").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10Almacenes();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + Math.abs(puntos[i]['y']);
            }
            jQuery("#contenidoGraficaAlmacenes").html('');
            jQuery("#contenidoGraficaAlmacenes").html('<div id="barAlmacenes" style="display:none;"></div><div id="pieAlmacenes" style="display:none;"></div><div id="lineAlmacenes" style="display:none;"></div>');

            jQuery("#lineAlmacenes").text(barras.substr(1));
            jQuery("#lineAlmacenes").peity("line");
            jQuery("#contenidoGraficaAlmacenes").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaAlmacenes) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioLineaAlmacenes = false;
            }
        }
    }
}
function tabVentas1()
{
    jQuery("#navVentas").css("background", "#2f2f2f");
    jQuery("#ventas-tab-1").css("background", "#78bde7");
    jQuery("#ventas-tab-2").css("background", "#2f2f2f");
    jQuery("#ventas-tab-3").css("background", "#2f2f2f");
    jQuery("#contenido-tab-1").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
    jQuery("#contenido-tab-2").css('display', 'none');
    jQuery("#contenido-tab-3").css('display', 'none');
}
function tabVentas2()
{
    jQuery("#ventas-tab-1").css("background", "#2f2f2f");
    jQuery("#ventas-tab-2").css("background", "#78bde7");
    jQuery("#ventas-tab-3").css("background", "#2f2f2f");
    jQuery("#navVentas").css("background", "#2f2f2f");
    jQuery("#contenido-tab-1").css('display', 'none');
    jQuery("#contenido-tab-2").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
    jQuery("#contenido-tab-3").css('display', 'none');
}
function tabVentas3()
{
    jQuery("#ventas-tab-1").css("background", "#2f2f2f");
    jQuery("#ventas-tab-2").css("background", "#2f2f2f");
    jQuery("#ventas-tab-3").css("background", "#78bde7");
    jQuery("#navVentas").css("background", "#78bde7");
    jQuery("#contenido-tab-1").css('display', 'none');
    jQuery("#contenido-tab-2").css('display', 'none');
    jQuery("#contenido-tab-3").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
}
function traerTop10Almacenes()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_almacenes";
    var sql = "select m.d_almacen||'('||m.c_almacen||')' almacen, sum(h.vr_subtotal) from m_puntos_venta m inner join h_ventas h on m.c_almacen=h.c_almacen  where h.f_factura = '" + date + "' group by 1 order by 1;";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_tipos = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_tipos[u] = xmlGetRow(id_query, u + 1, 0)['almacen'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['sum'];
        puntos[u] = {x: ar_tipos[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
function traerTop10TiposVentas()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_tipos_ventas";
    var sql = "elect first 10 m.d_tipo_venta || '(' || m.c_tipo_venta || ')' tipo_venta, sum(vr_subtotal) total from h_ventas h, m_tipos_venta m where h.c_tipo_venta = m.c_tipo_venta and h.f_factura = '" + date + "' group by 1 order by total desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_tipos = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_tipos[u] = xmlGetRow(id_query, u + 1, 0)['tipo_venta'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['total'];
        puntos[u] = {x: ar_tipos[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
function traerTop10Descuentos()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_descuentos";
    var sql = "select first 10 vr_subtotal,vr_descuento, case when vr_subtotal = 0 then 0 else ((vr_descuento*100)/vr_subtotal) end as porcentaje from h_ventas where f_factura='" + date + "' order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_descuentos = [];
    var ar_ventas = [];
    var ar_porcentaje = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['vr_subtotal'];
        ar_descuentos[u] = xmlGetRow(id_query, u + 1, 0)['vr_descuento'];
        ar_porcentaje[u] = xmlGetRow(id_query, u + 1, 0)['porcentaje'];
        puntos[u] = {x: ar_ventas[u], y: ar_descuentos[u], z: ar_porcentaje[u]};
    }
    puntos.size = size;
    return puntos;
}
function traerTop10Productos()
{
    //var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_productos";
    var sql = "select first 10 p.d_producto||'('||p.c_barra||')' producto, sum(v.pr_venta*v.cn_venta) ventas from mv_ventas v,vw_productos p where v.c_barra=p.c_barra and p.c_barra <> '0' group by 1 order by 2 desc;";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_productos = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_productos[u] = xmlGetRow(id_query, u + 1, 0)['producto'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['ventas'];
        puntos[u] = {x: ar_productos[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
function traerTop10Clientes()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_clientes";
    var sql = "select first 10 c.nombres ||' '|| c.apellidos ||'('||round(cc_cliente,0)||')' cliente,sum(vr_subtotal) valor_venta from h_ventas a, m_clientes c where a.cc_cliente=c.cedula and f_factura='" + date + "' group by 1 order by valor_venta desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_cedulas = [], ar_ventas = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_cedulas[u] = xmlGetRow(id_query, u + 1, 0)['cliente'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['valor_venta'];
        puntos[u] = {x: ar_cedulas[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
pts = {};
function traerTop10Vendedores()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_vendedores";
    var sql = "select d_vendedor || '(' || hv.c_vendedor || ')' vendedor, sum(vr_subtotal) valor_venta from h_ventas hv, m_vendors v where hv.c_vendedor = v.c_vendedor and f_factura='" + date + "' group by 1 order by valor_venta desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_cedulas = [], ar_ventas = [];
    pts = {};
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_cedulas[u] = xmlGetRow(id_query, u + 1, 0)['vendedor'];
        ar_ventas[u] = xmlGetRow(id_query, u + 1, 0)['valor_venta'];
        puntos[u] = {x: ar_cedulas[u], y: ar_ventas[u]};
    }
    puntos.size = size;
    return puntos;
}
var jdg;
function llenarTablaVentasXCliente()
{
    var datos = traerTop10Clientes();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxclientes-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxclientes-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang138'>Cliente</span></th>" + "<th align='right'><span data-lang-id='lang139'>Ventas</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    var total;
    for (var i = 0; i < size; i++) {
        total = toCurrency(datos[i]['y']);
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + "$ " + total + "" + espacio + "</td>";
        document.getElementById("tab-ventasxclientes-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-ventasxclientes-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasXVendedor()
{
    var datos = traerTop10Vendedores();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxvendedores-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxvendedores-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>" + espacio + "<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>" + espacio + "<span data-lang-id='lang141'>Vendedor</span></th>" + "<th align='right'><span data-lang-id='lang139'>Vendido</span>" + espacio + "</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    var total;
    for (var i = 0; i < size; i++) {
        total = toCurrency(datos[i]['y']);
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "<td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + "$ " + total + "&nbsp;&nbsp;</td>";
        document.getElementById("tab-ventasxvendedores-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-ventasxvendedores-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasxProducto()
{
    var datos = traerTop10Productos();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxproductos-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxproductos-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'> " + espacio + "<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>" + espacio + "<span data-lang-id='lang144'>Barra</span></th>" + "<th align='right'><span data-lang-id='lang139'>Ventas</span>" + espacio + "</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    var total;
    for (var i = 0; i < size; i++) {
        total = toCurrency(datos[i]['y']);
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "<td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + "$ " + total.substr(1) + "" + espacio + "</td>";
        document.getElementById("tab-ventasxproductos-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-ventasxvendedores-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasxDescuento()
{
    var datos = traerTop10Descuentos();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxdescuentos-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxdescuentos-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang139'>Vendido</span></th>" + "<th align='left'><span data-lang-id='lang147'>Descuento</span></th>" + "<th align='right'><span data-lang-id='lang148'>Porcentaje</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    var numero;
    var descuento;
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        numero = parseFloat(datos[i]['z']).toFixed(2);
        descuento = toCurrency(datos[i]['x']);
        filas[i].innerHTML = "<td align='left'>&nbsp;&nbsp;" + (i + 1) + "</td>" + "<td align='left'>" + espacio + "$ " + descuento + "</td>" + "<td align='left'>$ " + toCurrency(datos[i]['y']) + "</td>" + "<td align='right'>" + numero + " %&nbsp;&nbsp;</td>";
        document.getElementById("tab-ventasxdescuentos-1").appendChild(filas[i]);
    }
    if (size === -1) {
        document.getElementById("tab-ventasxdescuentos-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasxTiposVentas()
{
    var datos = traerTop10TiposVentas();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxtipoventas-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxtipoventas-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'><span data-lang-id='lang150'>Tipo de venta</span></th>" + "<th align='right'><span data-lang-id='lang139'>Ventas</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    var total;
    for (var i = 0; i < size; i++) {
        total = toCurrency(datos[i]['y']);
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>&nbsp;&nbsp;" + (i + 1) + "<td align='left'>" + datos[i]['x'] + "</td>" + "<td align='right'>$ " + total + "&nbsp;&nbsp;</td>";
        document.getElementById("tab-ventasxtipoventas-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-ventasxtipoventas-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}
function llenarTablaVentasxAlmacenes()
{
    var datos = traerTop10Almacenes();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-ventasxalmacenes-1").innerHTML = "";
    }
    document.getElementById("tab-ventasxalmacenes-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr align='left'>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registros</span></th>" + "<th align='left'><span data-lang-id='lang153'>Almacenes</span></th>" + "<th align='right'><span data-lang-id='lang139'>Ventas</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>&nbsp;&nbsp;" + (i + 1) + "</td>" + "<td align='left'>" + datos[i]['x'] + "</td>" + "<td align='right'>$ " + toCurrency(datos[i]['y']) + "&nbsp;&nbsp;</td>";
        document.getElementById("tab-ventasxalmacenes-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-ventasxvendedores-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}