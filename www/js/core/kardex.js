function graficarHistogramaKardexConcepto()
{
    var GRAFICA = 'historial_kardex';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsKardex").removeClass("pointsKardex");
    jQuery("#histogramaKardexConcepto").css("background", "#78bde7");
    jQuery("#tortaKardexConcepto").css("background", "#2f2f2f");
    jQuery("#puntosKardexConcepto").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10KardexConceptos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaConcepto").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaConcepto").html('');
                jQuery("#contenidoGraficaConcepto").html('<div id="barKardex" style="display:none;"></div><div id="pieKardex" style="display:none;"></div><div id="lineKardex" style="display:none;"></div>');
                jQuery("#barKardex").text(barras.substr(1));
                jQuery("#barKardex").peity("bar");
                jQuery("#contenidoGraficaConcepto").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
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
    var sql = "select h.cc_cliente cedula, sum(cn_kardex) cantidad from h_kardex as h inner join mv_kardex as m on h.c_concepto_mov = m.c_concepto_mov and m.f_kardex > '"+date+"'  group by h.cc_cliente order by 2 desc";
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
