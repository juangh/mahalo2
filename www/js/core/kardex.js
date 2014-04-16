function graficarHistogramaKardexConcepto()
{
    var GRAFICA = 'historial_kardex';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardex").removeClass("pointsKardex");
    jQuery("#histogramaKardexConcepto").css("background", "#78bde7");
    jQuery("#tortaKardexConcepto").css("background", "#2f2f2f");
    jQuery("#puntosKardexConcepto").css("background", "#2f2f2f");
    var puntos = traerTop10KardexConceptos();
    var colores = coloresFijos(puntos.size + 1);
    jQuery.fn.peity.defaults.bar = {colours: colores, delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaConcepto").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaConcepto").html('<div id="barKardex" style="display:none;"></div><div id="pieKardex" style="display:none;"></div><div id="lineKardex" style="display:none;"></div>');
                jQuery("#barKardex").text(barras.substr(1));
                jQuery("#barKardex").peity("bar");
                jQuery("#contenidoGraficaConcepto").append($("canvas.peity"));
                jQuery("#contenidoGraficaConcepto").css('width', '70%');
                $("#legenda_torta_concepto").css("overflow", "scroll");
                $("#legenda_torta_concepto").css("height", "350px");
                $("#legenda_torta_concepto").html("<br><b>TOTAL VENTAS</b><BR><BR>");
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                for (var i = 0; i < (puntos.size + 1); i++) {
                    $("#legenda_torta_concepto").append("<div style='padding-left:10px;border:1px solid black;background:" + colores[i] + "; margin-top:5px;margin-left:5px;width:10px;height:10px;float:left;'></div><div style='float:left;'>&nbsp;" + puntos[i]['y'] + "</div><br>");
                }
                if (inicioHistogramaKardexConcepto) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexConcepto = false;
                }
            }
        }
    }
}
function graficarTortaKardexConcepto()
{
    var GRAFICA = 'torta_kardex';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardex").removeClass("pointsKardex");
    jQuery("#histogramaKardexConcepto").css("background", "#2f2f2f");
    jQuery("#tortaKardexConcepto").css("background", "#78bde7");
    jQuery("#puntosKardexConcepto").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexConceptos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaConcepto").html('');
            jQuery("#contenidoGraficaConcepto").html('<div id="barKardex" style="display:none;"></div><div id="pieKardex" style="display:none;"></div><div id="lineKardex" style="display:none;"></div>');
            jQuery("#pieKardex").text(barras.substr(1));
            jQuery("#pieKardex").peity("pie");
            jQuery("#contenidoGraficaConcepto").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexConcepto) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexConcepto = false;
            }
        }
    }
}
function graficarLineaKardexConcepto()
{
    var GRAFICA = 'linea_kardex';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardex").removeClass("barsKardex");
    jQuery("#histogramaKardexConcepto").css("background", "#2f2f2f");
    jQuery("#tortaKardexConcepto").css("background", "#2f2f2f");
    jQuery("#puntosKardexConcepto").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexConceptos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaConcepto").html('');
            jQuery("#contenidoGraficaConcepto").html('<div id="barKardex" style="display:none;"></div><div id="pieKardex" style="display:none;"></div><div id="lineKardex" style="display:none;"></div>');
            jQuery("#lineKardex").text(barras.substr(1));
            jQuery("#lineKardex").peity("line");
            jQuery("#contenidoGraficaConcepto").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexConcepto) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexConcepto = false;
            }
        }
    }
}

function traerTop10KardexConceptos()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_concepto";
    var sql = "select first 10 d_concepto_mov ||'('||c.c_concepto_mov||')' concepto, sum(cn_kardex) movimientos from mv_kardex k inner join m_conceptos_mov c on k.c_concepto_mov = c.c_concepto_mov and k.f_kardex > 24/01/2014 group by 1 order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_conceptos = [], ar_movimientos = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_conceptos[u] = xmlGetRow(id_query, u + 1, 0)['concepto'];
        ar_movimientos[u] = xmlGetRow(id_query, u + 1, 0)['movimientos'];
        puntos[u] = {x: ar_conceptos[u], y: ar_movimientos[u]};
    }
    puntos.size = size;
    return puntos;
}
var jdg;
function llenarTablaKardexConcepto()
{
    var datos = traerTop10KardexConceptos();
    var size = datos.size + 1;
    var filas = [];
    if (size > -1) {
        for (var i = 0; i < size; i++) {
            document.getElementById("tab-kardexconcepto-1").innerHTML = "";
        }
        document.getElementById("tab-kardexconcepto-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Concepto</span></th>" + "<th align='right'><span data-lang-id=''># de Movimientos</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";

        for (var i = 0; i < size; i++) {
            //total = toCurrency(datos[i]['y']);
            filas[i] = document.createElement("tr");
            filas[i].setAttribute("id", "tr_" + i);
            filas[i].setAttribute("style", "text-align:center");
            filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + "" + datos[i]['y'] + "" + espacio + "</td>";
            document.getElementById("tab-kardexconcepto-1").appendChild(filas[i]);
        }
        if (datos.size === 0) {
            document.getElementById("tab-kardexconcepto-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
        }
    }
}

/*************/

function graficarHistogramaKardexNit()
{
    var GRAFICA = 'historial_kardex_nit';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexNit").removeClass("pointsKardexNit");
    jQuery("#histogramaKardexNit").css("background", "#78bde7");
    jQuery("#tortaKardexNit").css("background", "#2f2f2f");
    jQuery("#puntosKardexNit").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexNit();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaNit").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaNit").html('');
                jQuery("#contenidoGraficaNit").html('<div id="barKardexNit" style="display:none;"></div><div id="pieKardexNit" style="display:none;"></div><div id="lineKardexNit" style="display:none;"></div>');
                jQuery("#barKardexNit").text(barras.substr(1));
                jQuery("#barKardexNit").peity("bar");
                jQuery("#contenidoGraficaNit").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexNit) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexNit = false;
                }
            }
        }
    }
}
function graficarTortaKardexNit()
{
    var GRAFICA = 'torta_kardex_nit';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexNit").removeClass("pointsKardexNit");
    jQuery("#histogramaKardexNit").css("background", "#2f2f2f");
    jQuery("#tortaKardexNit").css("background", "#78bde7");
    jQuery("#puntosKardexNit").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexNit();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaNit").html('');
            jQuery("#contenidoGraficaNit").html('<div id="barKardexNit" style="display:none;"></div><div id="pieKardexNit" style="display:none;"></div><div id="lineKardexNit" style="display:none;"></div>');
            jQuery("#pieKardexNit").text(barras.substr(1));
            jQuery("#pieKardexNit").peity("pie");
            jQuery("#contenidoGraficaNit").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexNit) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexNit = false;
            }
        }
    }
}
function graficarLineaKardexNit()
{
    var GRAFICA = 'linea_kardex_nit';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexNit").removeClass("barsKardexNit");
    jQuery("#histogramaKardexNit").css("background", "#2f2f2f");
    jQuery("#tortaKardexNit").css("background", "#2f2f2f");
    jQuery("#puntosKardexNit").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexNit();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaNit").html('');
            jQuery("#contenidoGraficaNit").html('<div id="barKardexNit" style="display:none;"></div><div id="pieKardexNit" style="display:none;"></div><div id="lineKardexNit" style="display:none;"></div>');
            jQuery("#lineKardexNit").text(barras.substr(1));
            jQuery("#lineKardexNit").peity("line");
            jQuery("#contenidoGraficaNit").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexNit) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexNit = false;
            }
        }
    }
}

function traerTop10KardexNit()
{
    //var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_nit";
    var sql = "select first 10 nit, sum(vr_factura) as v_facturas from h_kardex group by 1 order by 2 desc;";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['nit'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['v_facturas'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexNit()
{
    var datos = traerTop10KardexNit();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardexnit-1").innerHTML = "";
    }
    document.getElementById("tab-kardexnit-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Nit</span></th>" + "<th align='right'><span data-lang-id=''>Valor Facturas</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardexnit-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardexnit-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaKardexClientes()
{
    var GRAFICA = 'historial_kardex_clientes';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexNit").removeClass("pointsKardexNit");
    jQuery("#histogramaKardexNit").css("background", "#78bde7");
    jQuery("#tortaKardexNit").css("background", "#2f2f2f");
    jQuery("#puntosKardexNit").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexNit();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaNit").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaKardexClientes").html('');
                jQuery("#contenidoGraficaKardexClientes").html('<div id="barKardexClientes" style="display:none;"></div><div id="pieKardexClientes" style="display:none;"></div><div id="lineKardexClientes" style="display:none;"></div>');
                jQuery("#barKardexClientes").text(barras.substr(1));
                jQuery("#barKardexClientes").peity("bar");
                jQuery("#contenidoGraficaKardex").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexNit) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexNit = false;
                }
            }
        }
    }
}
function graficarTortaKardexClientes()
{
    var GRAFICA = 'torta_kardex_clientes';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexNit").removeClass("pointsKardexNit");
    jQuery("#histogramaKardexClientes").css("background", "#2f2f2f");
    jQuery("#tortaKardexNit").css("background", "#78bde7");
    jQuery("#puntosKardexNit").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexNit();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexClientes").html('');
            jQuery("#contenidoGraficaKardexClientes").html('<div id="barKardexClientes" style="display:none;"></div><div id="pieKardexClientes" style="display:none;"></div><div id="lineKardexClientes" style="display:none;"></div>');
            jQuery("#pieKardexKardexClientes").text(barras.substr(1));
            jQuery("#pieKardexKardexClientes").peity("pie");
            jQuery("#contenidoGraficaKardex").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexClientes) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexClientes = false;
            }
        }
    }
}
function graficarLineaKardexClientes()
{
    var GRAFICA = 'linea_kardex_clientes';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexNit").removeClass("barsKardexClientes");
    jQuery("#histogramaKardexClientes").css("background", "#2f2f2f");
    jQuery("#tortaKardexClientes").css("background", "#2f2f2f");
    jQuery("#puntosKardexClientes").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexNit();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexClientes").html('');
            jQuery("#contenidoGraficaKardexClientes").html('<div id="barKardexClientes" style="display:none;"></div><div id="pieKardexClientes" style="display:none;"></div><div id="lineKardexClientes" style="display:none;"></div>');
            jQuery("#lineKardexKardexClientes").text(barras.substr(1));
            jQuery("#lineKardexNit").peity("line");
            jQuery("#contenidoGraficaKardexClientes").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexNit) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexNit = false;
            }
        }
    }
}

function traerTop10KardexClientes()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_nit";
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '" + date + "'  group by h.cc_cliente order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['cedula'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['cantidad'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexClientes()
{
    var datos = traerTop10KardexClientes();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardexclientes-1").innerHTML = "";
    }
    document.getElementById("tab-kardexclientes-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Nit</span></th>" + "<th align='right'><span data-lang-id=''>Valor Facturas</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardexclientes-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardexclientes-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaKardexTres()
{
    var GRAFICA = 'historial_kardex_tres';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexTres").removeClass("pointsKardexTres");
    jQuery("#histogramaKardexTres").css("background", "#78bde7");
    jQuery("#tortaKardexTres").css("background", "#2f2f2f");
    jQuery("#puntosKardexTres").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexTres();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaTres").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaKardexTres").html('');
                jQuery("#contenidoGraficaKardexTres").html('<div id="barKardexTres" style="display:none;"></div><div id="pieKardexTres" style="display:none;"></div><div id="lineKardexTres" style="display:none;"></div>');
                jQuery("#barKardexTres").text(barras.substr(1));
                jQuery("#barKardexTres").peity("bar");
                jQuery("#contenidoGraficaTres").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexTres) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexTres = false;
                }
            }
        }
    }
}
function graficarTortaKardexTres()
{
    var GRAFICA = 'torta_kardex_tres';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexTres").removeClass("pointsKardexTres");
    jQuery("#histogramaKardexTres").css("background", "#2f2f2f");
    jQuery("#tortaKardexTres").css("background", "#78bde7");
    jQuery("#puntosKardexTres").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexTres();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexTres").html('');
            jQuery("#contenidoGraficaKardexTres").html('<div id="barKardexTres" style="display:none;"></div><div id="pieKardexTres" style="display:none;"></div><div id="lineKardexTres" style="display:none;"></div>');
            jQuery("#pieKardexKardexTres").text(barras.substr(1));
            jQuery("#pieKardexKardexTres").peity("pie");
            jQuery("#contenidoGraficaKardexTres").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexTres) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexTres = false;
            }
        }
    }
}
function graficarLineaKardexTres()
{
    var GRAFICA = 'linea_kardex_tres';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexTres").removeClass("barsKardexTres");
    jQuery("#histogramaKardexTres").css("background", "#2f2f2f");
    jQuery("#tortaKardexTres").css("background", "#2f2f2f");
    jQuery("#puntosKardexTres").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexTres();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexTres").html('');
            jQuery("#contenidoGraficaKardexTres").html('<div id="barKardexTres" style="display:none;"></div><div id="pieKardexTres" style="display:none;"></div><div id="lineKardexTres" style="display:none;"></div>');
            jQuery("#lineKardexKardexTres").text(barras.substr(1));
            jQuery("#lineKardexTres").peity("line");
            jQuery("#contenidoGraficaKardexTres").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexTres) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexTres = false;
            }
        }
    }
}

function traerTop10KardexTres()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_tres";
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '" + date + "'  group by h.cc_cliente order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['cedula'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['cantidad'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexTres()
{
    var datos = traerTop10KardexTres();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardextres-1").innerHTML = "";
    }
    document.getElementById("tab-kardextres-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardextres-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardextres-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaKardexCuatro()
{
    var GRAFICA = 'historial_kardex_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexCuatro").removeClass("pointsKardexCuatro");
    jQuery("#histogramaKardexCuatro").css("background", "#78bde7");
    jQuery("#tortaKardexCuatro").css("background", "#2f2f2f");
    jQuery("#puntosKardexCuatro").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexCuatro();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCuatro").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaKardexCuatro").html('');
                jQuery("#contenidoGraficaKardexCuatro").html('<div id="barKardexCuatro" style="display:none;"></div><div id="pieKardexCuatro" style="display:none;"></div><div id="lineKardexCuatro" style="display:none;"></div>');
                jQuery("#barKardexCuatro").text(barras.substr(1));
                jQuery("#barKardexCuatro").peity("bar");
                jQuery("#contenidoGraficaCuatro").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexCuatro) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexCuatro = false;
                }
            }
        }
    }
}
function graficarTortaKardexCuatro()
{
    var GRAFICA = 'torta_kardex_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexCuatro").removeClass("pointsKardexCuatro");
    jQuery("#histogramaKardexCuatro").css("background", "#2f2f2f");
    jQuery("#tortaKardexCuatro").css("background", "#78bde7");
    jQuery("#puntosKardexCuatro").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexCuatro").html('');
            jQuery("#contenidoGraficaKardexCuatro").html('<div id="barKardexCuatro" style="display:none;"></div><div id="pieKardexCuatro" style="display:none;"></div><div id="lineKardexCuatro" style="display:none;"></div>');
            jQuery("#pieKardexKardexCuatro").text(barras.substr(1));
            jQuery("#pieKardexKardexCuatro").peity("pie");
            jQuery("#contenidoGraficaKardexCuatro").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexCuatro) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexCuatro = false;
            }
        }
    }
}
function graficarLineaKardexCuatro()
{
    var GRAFICA = 'linea_kardex_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexCuatro").removeClass("barsKardexCuatro");
    jQuery("#histogramaKardexCuatro").css("background", "#2f2f2f");
    jQuery("#tortaKardexCuatro").css("background", "#2f2f2f");
    jQuery("#puntosKardexCuatro").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexCuatro").html('');
            jQuery("#contenidoGraficaKardexCuatro").html('<div id="barKardexCuatro" style="display:none;"></div><div id="pieKardexCuatro" style="display:none;"></div><div id="lineKardexCuatro" style="display:none;"></div>');
            jQuery("#lineKardexKardexCuatro").text(barras.substr(1));
            jQuery("#lineKardexCuatro").peity("line");
            jQuery("#contenidoGraficaKardexCuatro").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexCuatro) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexCuatro = false;
            }
        }
    }
}

function traerTop10KardexCuatro()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_cuatro";
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '" + date + "'  group by h.cc_cliente order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['cedula'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['cantidad'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexCuatro()
{
    var datos = traerTop10KardexCuatro();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardexcuatro-1").innerHTML = "";
    }
    document.getElementById("tab-kardexcuatro-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardexcuatro-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardexcuatro-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaKardexCinco()
{
    var GRAFICA = 'historial_kardex_cinco';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexCinco").removeClass("pointsKardexCinco");
    jQuery("#histogramaKardexCinco").css("background", "#78bde7");
    jQuery("#tortaKardexCinco").css("background", "#2f2f2f");
    jQuery("#puntosKardexCinco").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexCinco();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCinco").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaKardexCinco").html('');
                jQuery("#contenidoGraficaKardexCinco").html('<div id="barKardexCinco" style="display:none;"></div><div id="pieKardexCinco" style="display:none;"></div><div id="lineKardexCinco" style="display:none;"></div>');
                jQuery("#barKardexCinco").text(barras.substr(1));
                jQuery("#barKardexCinco").peity("bar");
                jQuery("#contenidoGraficaCuatro").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexCinco) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexCinco = false;
                }
            }
        }
    }
}
function graficarTortaKardexCinco()
{
    var GRAFICA = 'torta_kardex_cinco';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexCuatro").removeClass("pointsKardexCinco");
    jQuery("#histogramaKardexCinco").css("background", "#2f2f2f");
    jQuery("#tortaKardexCinco").css("background", "#78bde7");
    jQuery("#puntosKardexCinco").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexCinco").html('');
            jQuery("#contenidoGraficaKardexCinco").html('<div id="barKardexCinco" style="display:none;"></div><div id="pieKardexCinco" style="display:none;"></div><div id="lineKardexCinco" style="display:none;"></div>');
            jQuery("#pieKardexKardexCinco").text(barras.substr(1));
            jQuery("#pieKardexKardexCinco").peity("pie");
            jQuery("#contenidoGraficaKardexCinco").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexCinco) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexCinco = false;
            }
        }
    }
}
function graficarLineaKardexCinco()
{
    var GRAFICA = 'linea_kardex_cinco';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexCinco").removeClass("barsKardexCinco");
    jQuery("#histogramaKardexCinco").css("background", "#2f2f2f");
    jQuery("#tortaKardexCinco").css("background", "#2f2f2f");
    jQuery("#puntosKardexCinco").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexCinco();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexCinco").html('');
            jQuery("#contenidoGraficaKardexCinco").html('<div id="barKardexCinco" style="display:none;"></div><div id="pieKardexCinco" style="display:none;"></div><div id="lineKardexCinco" style="display:none;"></div>');
            jQuery("#lineKardexKardexCinco").text(barras.substr(1));
            jQuery("#lineKardexCinco").peity("line");
            jQuery("#contenidoGraficaKardexCinco").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexCinco) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexCinco = false;
            }
        }
    }
}

function traerTop10KardexCinco()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_cuatro";
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '" + date + "'  group by h.cc_cliente order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['cedula'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['cantidad'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexCinco()
{
    var datos = traerTop10KardexCuatro();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardexcinco-1").innerHTML = "";
    }
    document.getElementById("tab-kardexcinco-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardexcinco-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardexcinco-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaKardexSeis()
{
    var GRAFICA = 'historial_kardex_seis';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardexSeis").removeClass("pointsKardexSeis");
    jQuery("#histogramaKardexSeis").css("background", "#78bde7");
    jQuery("#tortaKardexSeis").css("background", "#2f2f2f");
    jQuery("#puntosKardexSeis").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexSeis();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaSeis").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaKardexSeis").html('');
                jQuery("#contenidoGraficaKardexSeis").html('<div id="barKardexSeis" style="display:none;"></div><div id="pieKardexSeis" style="display:none;"></div><div id="lineKardexSeis" style="display:none;"></div>');
                jQuery("#barKardexSeis").text(barras.substr(1));
                jQuery("#barKardexSeis").peity("bar");
                jQuery("#contenidoGraficaSeis").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaKardexSeis) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaKardexSeis = false;
                }
            }
        }
    }
}
function graficarTortaKardexSeis()
{
    var GRAFICA = 'torta_kardex_seis';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexSeis").removeClass("pointsKardexSeis");
    jQuery("#histogramaKardexSeis").css("background", "#2f2f2f");
    jQuery("#tortaKardexSeis").css("background", "#78bde7");
    jQuery("#puntosKardexSeis").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10KardexCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexSeis").html('');
            jQuery("#contenidoGraficaKardexSeis").html('<div id="barKardexSeis" style="display:none;"></div><div id="pieKardexSeis" style="display:none;"></div><div id="lineKardexSeis" style="display:none;"></div>');
            jQuery("#pieKardexKardexSeis").text(barras.substr(1));
            jQuery("#pieKardexKardexSeis").peity("pie");
            jQuery("#contenidoGraficaKardexSeis").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaKardexSeis) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaKardexSeis = false;
            }
        }
    }
}
function graficarLineaKardexSeis()
{
    var GRAFICA = 'linea_kardex_seis';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histKardexSeis").removeClass("barsKardexSeis");
    jQuery("#histogramaKardexSeis").css("background", "#2f2f2f");
    jQuery("#tortaKardexSeis").css("background", "#2f2f2f");
    jQuery("#puntosKardexSeis").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10KardexSeis();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaKardexSeis").html('');
            jQuery("#contenidoGraficaKardexSeis").html('<div id="barKardexSeis" style="display:none;"></div><div id="pieKardexSeis" style="display:none;"></div><div id="lineKardexSeis" style="display:none;"></div>');
            jQuery("#lineKardexKardexSeis").text(barras.substr(1));
            jQuery("#lineKardexSeis").peity("line");
            jQuery("#contenidoGraficaKardexSeis").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaKardexSeis) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioKardexSeis = false;
            }
        }
    }
}

function traerTop10KardexSeis()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_seis";
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '" + date + "'  group by h.cc_cliente order by 2 desc";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    var ar_status = getStatusDB(id_query);
    var size = ar_status['numrows'] - 1;
    var ar_nits = [], ar_valores = [];
    var puntos = {};
    for (var u = 0; u <= size; u++) {
        ar_nits[u] = xmlGetRow(id_query, u + 1, 0)['cedula'];
        ar_valores[u] = xmlGetRow(id_query, u + 1, 0)['cantidad'];
        puntos[u] = {x: ar_nits[u], y: ar_valores[u]};
    }
    puntos.size = size;
    return puntos;
}

function llenarTablaKardexSeis()
{
    var datos = traerTop10KardexSeis();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-kardexseis-1").innerHTML = "";
    }
    document.getElementById("tab-kardexseis-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-kardexseis-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-kardexcinco-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}