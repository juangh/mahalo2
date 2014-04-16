/******************/

function graficarHistogramaCreditosUno()
{
    var GRAFICA = 'historial_creditos_uno';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosUno").removeClass("pointsCreditosUno");
    jQuery("#histogramaCreditosUno").css("background", "#78bde7");
    jQuery("#tortaCreditosUno").css("background", "#2f2f2f");
    jQuery("#puntosCreditosUno").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosUno();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosUno").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosUno").html('');
                jQuery("#contenidoGraficaCreditosUno").html('<div id="barCreditosUno" style="display:none;"></div><div id="pieCreditosUno" style="display:none;"></div><div id="lineCreditosUno" style="display:none;"></div>');
                jQuery("#barCreditosUno").text(barras.substr(1));
                jQuery("#barCreditosUno").peity("bar");
                jQuery("#contenidoGraficaCreditosUno").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosUno) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosUno = false;
                }
            }
        }
    }
}
function graficarTortaCreditosUno()
{
    var GRAFICA = 'torta_creditos_uno';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosUno").removeClass("pointsCreditosUno");
    jQuery("#histogramaCreditosUno").css("background", "#2f2f2f");
    jQuery("#tortaCreditosUno").css("background", "#78bde7");
    jQuery("#puntosCreditosUno").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosUno();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosUno").html('');
            jQuery("#contenidoGraficaCreditosUno").html('<div id="barCreditosUno" style="display:none;"></div><div id="pieCreditosUno" style="display:none;"></div><div id="lineCreditosUno" style="display:none;"></div>');
            jQuery("#pieCreditosUno").text(barras.substr(1));
            jQuery("#pieCreditosUno").peity("pie");
            jQuery("#contenidoGraficaCreditosUno").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosUno) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosUno = false;
            }
        }
    }
}
function graficarLineaCreditosUno()
{
    var GRAFICA = 'linea_creditos_uno';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosUno").removeClass("barsKardexTres");
    jQuery("#histogramaCreditosUno").css("background", "#2f2f2f");
    jQuery("#tortaCreditosUno").css("background", "#2f2f2f");
    jQuery("#puntosCreditosUno").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosUno();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosUno").html('');
            jQuery("#contenidoGraficaCreditosUno").html('<div id="barCreditosUno" style="display:none;"></div><div id="pieCreditosUno" style="display:none;"></div><div id="lineCreditosUno" style="display:none;"></div>');
            jQuery("#lineCreditosUno").text(barras.substr(1));
            jQuery("#lineCreditosUno").peity("line");
            jQuery("#contenidoGraficaCreditosUno").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLinea) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosUno = false;
            }
        }
    }
}

function traerTop10CreditosUno()
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

function llenarTablaCreditosUno()
{
    var datos = traerTop10CreditosUno();
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

function graficarHistogramaCreditosDos()
{
    var GRAFICA = 'historial_creditos_dos';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosDos").removeClass("pointsCreditosDos");
    jQuery("#histogramaCreditosDos").css("background", "#78bde7");
    jQuery("#tortaCreditosDos").css("background", "#2f2f2f");
    jQuery("#puntosCreditosDos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosDos();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosDos").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosDos").html('');
                jQuery("#contenidoGraficaCreditosDos").html('<div id="barCreditosDos" style="display:none;"></div><div id="pieCreditosDos" style="display:none;"></div><div id="lineCreditosDos" style="display:none;"></div>');
                jQuery("#barCreditosDos").text(barras.substr(1));
                jQuery("#barCreditosDos").peity("bar");
                jQuery("#contenidoGraficaCreditosDos").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosDos) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosDos = false;
                }
            }
        }
    }
}
function graficarTortaCreditosDos()
{
    var GRAFICA = 'torta_creditos_dos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosDos").removeClass("pointsCreditosDos");
    jQuery("#histogramaCreditosDos").css("background", "#2f2f2f");
    jQuery("#tortaCreditosDos").css("background", "#78bde7");
    jQuery("#puntosCreditosDos").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosDos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosDos").html('');
            jQuery("#contenidoGraficaCreditosDos").html('<div id="barCreditosDos" style="display:none;"></div><div id="pieCreditosDos" style="display:none;"></div><div id="lineCreditosDos" style="display:none;"></div>');
            jQuery("#pieCreditosDos").text(barras.substr(1));
            jQuery("#pieCreditosDos").peity("pie");
            jQuery("#contenidoGraficaCreditosDos").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosDos) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosDos = false;
            }
        }
    }
}
function graficarLineaCreditosDos()
{
    var GRAFICA = 'linea_creditos_dos';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosDos").removeClass("barsCreditosDos");
    jQuery("#histogramaCreditosDos").css("background", "#2f2f2f");
    jQuery("#tortaCreditosDos").css("background", "#2f2f2f");
    jQuery("#puntosCreditosDos").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosDos();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosDos").html('');
            jQuery("#contenidoGraficaCreditosDos").html('<div id="barCreditosDos" style="display:none;"></div><div id="pieCreditosDos" style="display:none;"></div><div id="lineCreditosDos" style="display:none;"></div>');
            jQuery("#lineCreditosDos").text(barras.substr(1));
            jQuery("#lineCreditosDos").peity("line");
            jQuery("#contenidoGraficaCreditosDos").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLinea) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosDos = false;
            }
        }
    }
}

function traerTop10CreditosDos()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_dos";
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

function llenarTablaCreditosUno()
{
    var datos = traerTop10CreditosDos();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-creditosdos-1").innerHTML = "";
    }
    document.getElementById("tab-creditosdos-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-creditosdos-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-creditosdos-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaCreditosTres()
{
    var GRAFICA = 'historial_creditos_tres';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosTres").removeClass("pointsCreditosTres");
    jQuery("#histogramaCreditosTres").css("background", "#78bde7");
    jQuery("#tortaCreditosTres").css("background", "#2f2f2f");
    jQuery("#puntosCreditosTres").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosTres();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosTres").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosTres").html('');
                jQuery("#contenidoGraficaCreditosTres").html('<div id="barCreditosTres" style="display:none;"></div><div id="pieCreditosTres" style="display:none;"></div><div id="lineCreditosTres" style="display:none;"></div>');
                jQuery("#barCreditosTres").text(barras.substr(1));
                jQuery("#barCreditosTres").peity("bar");
                jQuery("#contenidoGraficaCreditosTres").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosTres) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosTres = false;
                }
            }
        }
    }
}
function graficarTortaCreditosTres()
{
    var GRAFICA = 'torta_creditos_tres';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosTres").removeClass("pointsCreditosTres");
    jQuery("#histogramaCreditosTres").css("background", "#2f2f2f");
    jQuery("#tortaCreditosTres").css("background", "#78bde7");
    jQuery("#puntosCreditosTres").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosTres();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosTres").html('');
            jQuery("#contenidoGraficaCreditosTres").html('<div id="barCreditosTres" style="display:none;"></div><div id="pieCreditosTres" style="display:none;"></div><div id="lineCreditosTres" style="display:none;"></div>');
            jQuery("#pieCreditosTres").text(barras.substr(1));
            jQuery("#pieCreditosTres").peity("pie");
            jQuery("#contenidoGraficaCreditosTres").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosTres) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosTres = false;
            }
        }
    }
}
function graficarLineaCreditosTres()
{
    var GRAFICA = 'linea_creditos_tres';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosTres").removeClass("barsCreditosTres");
    jQuery("#histogramaCreditosTres").css("background", "#2f2f2f");
    jQuery("#tortaCreditosTres").css("background", "#2f2f2f");
    jQuery("#puntosCreditosTres").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosTres();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosTres").html('');
            jQuery("#contenidoGraficaCreditosTres").html('<div id="barCreditosTres" style="display:none;"></div><div id="pieCreditosTres" style="display:none;"></div><div id="lineCreditosTres" style="display:none;"></div>');
            jQuery("#lineCreditosTres").text(barras.substr(1));
            jQuery("#lineCreditosTres").peity("line");
            jQuery("#contenidoGraficaCreditosTres").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaTres) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosTres = false;
            }
        }
    }
}

function traerTop10CreditosTres()
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

function llenarTablaCreditosTres()
{
    var datos = traerTop10CreditosTres();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-creditostres-1").innerHTML = "";
    }
    document.getElementById("tab-creditostres-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-creditostres-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-creditostres-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaCreditosCuatro()
{
    var GRAFICA = 'historial_creditos_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosCuadro").removeClass("pointsCreditosCuatro");
    jQuery("#histogramaCreditosCuatro").css("background", "#78bde7");
    jQuery("#tortaCreditosCuatro").css("background", "#2f2f2f");
    jQuery("#puntosCreditosCuatro").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosCuatro();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosCuatro").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosCuatro").html('');
                jQuery("#contenidoGraficaCreditosCuatro").html('<div id="barCreditosCuatro" style="display:none;"></div><div id="pieCreditosCuatro" style="display:none;"></div><div id="lineCreditosCuatro" style="display:none;"></div>');
                jQuery("#barCreditosCuatro").text(barras.substr(1));
                jQuery("#barCreditosCuatro").peity("bar");
                jQuery("#contenidoGraficaCreditosCuatro").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosCuatro) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosCuatro = false;
                }
            }
        }
    }
}
function graficarTortaCreditosCuatro()
{
    var GRAFICA = 'torta_creditos_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosCuatro").removeClass("pointsCreditosCuatro");
    jQuery("#histogramaCreditosCuatro").css("background", "#2f2f2f");
    jQuery("#tortaCreditosCuatro").css("background", "#78bde7");
    jQuery("#puntosCreditosCuatro").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosCuatro").html('');
            jQuery("#contenidoGraficaCreditosCuatro").html('<div id="barCreditosTres" style="display:none;"></div><div id="pieCreditosCuatro" style="display:none;"></div><div id="lineCreditosCuatro" style="display:none;"></div>');
            jQuery("#pieCreditosCuatro").text(barras.substr(1));
            jQuery("#pieCreditosCuatro").peity("pie");
            jQuery("#contenidoGraficaCreditosCuatro").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosCuatro) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosCuatro = false;
            }
        }
    }
}
function graficarLineaCreditosCuatro()
{
    var GRAFICA = 'linea_creditos_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosCuatro").removeClass("barsCreditosCuatro");
    jQuery("#histogramaCreditosCuatro").css("background", "#2f2f2f");
    jQuery("#tortaCreditosCuatro").css("background", "#2f2f2f");
    jQuery("#puntosCreditosCuatro").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosCuatro();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosCuatro").html('');
            jQuery("#contenidoGraficaCreditosCuatro").html('<div id="barCreditosCuatro" style="display:none;"></div><div id="pieCreditosCuatro" style="display:none;"></div><div id="lineCreditosCuatro" style="display:none;"></div>');
            jQuery("#lineCreditosCuatro").text(barras.substr(1));
            jQuery("#lineCreditosCuatro").peity("line");
            jQuery("#contenidoGraficaCreditosCuatro").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaCuatro) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosCuatro = false;
            }
        }
    }
}

function traerTop10CreditosCuatro()
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

function llenarTablaCreditosCuatro()
{
    var datos = traerTop10CreditosCuatro();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-creditoscuatro-1").innerHTML = "";
    }
    document.getElementById("tab-creditoscuatro-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-creditoscuatro-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-creditoscuatro-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaCreditosCinco()
{
    var GRAFICA = 'historial_creditos_cuatro';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosCinco").removeClass("pointsCreditosCinco");
    jQuery("#histogramaCreditosCinco").css("background", "#78bde7");
    jQuery("#tortaCreditosCinco").css("background", "#2f2f2f");
    jQuery("#puntosCreditosCinco").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosCinco();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosCinco").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosCinco").html('');
                jQuery("#contenidoGraficaCreditosCinco").html('<div id="barCreditosCuatro" style="display:none;"></div><div id="pieCreditosCuatro" style="display:none;"></div><div id="lineCreditosCuatro" style="display:none;"></div>');
                jQuery("#barCreditosCinco").text(barras.substr(1));
                jQuery("#barCreditosCinco").peity("bar");
                jQuery("#contenidoGraficaCreditosCinco").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosCinco) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosCinco = false;
                }
            }
        }
    }
}
function graficarTortaCreditosCinco()
{
    var GRAFICA = 'torta_creditos_cinco';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosCinco").removeClass("pointsCreditosCinco");
    jQuery("#histogramaCreditosCinco").css("background", "#2f2f2f");
    jQuery("#tortaCreditosCinco").css("background", "#78bde7");
    jQuery("#puntosCreditosCinco").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosCinco();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosCinco").html('');
            jQuery("#contenidoGraficaCreditosCinco").html('<div id="barCreditosTres" style="display:none;"></div><div id="pieCreditosCuatro" style="display:none;"></div><div id="lineCreditosCuatro" style="display:none;"></div>');
            jQuery("#pieCreditosCinco").text(barras.substr(1));
            jQuery("#pieCreditosCinco").peity("pie");
            jQuery("#contenidoGraficaCreditosCinco").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosCinco) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosCinco = false;
            }
        }
    }
}
function graficarLineaCreditosCinco()
{
    var GRAFICA = 'linea_creditos_cinco';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosCinco").removeClass("barsCreditosCinco");
    jQuery("#histogramaCreditosCinco").css("background", "#2f2f2f");
    jQuery("#tortaCreditosCinco").css("background", "#2f2f2f");
    jQuery("#puntosCreditosCinco").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosCinco();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosCinco").html('');
            jQuery("#contenidoGraficaCreditosCinco").html('<div id="barCreditosCinco" style="display:none;"></div><div id="pieCreditosCinco" style="display:none;"></div><div id="lineCreditosCinco" style="display:none;"></div>');
            jQuery("#lineCreditosCinco").text(barras.substr(1));
            jQuery("#lineCreditosCinco").peity("line");
            jQuery("#contenidoGraficaCreditosCinco").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaCinco) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosCinco = false;
            }
        }
    }
}

function traerTop10CreditosCinco()
{
    var date = formatearFecha(new Date().toString());
    var id_query = "busqueda_top_kardex_cinco";
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

function llenarTablaCreditosCinco()
{
    var datos = traerTop10CreditosCinco();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-creditoscinco-1").innerHTML = "";
    }
    document.getElementById("tab-creditoscinco-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-creditoscinco-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-creditoscinco-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/

function graficarHistogramaCreditosSeis()
{
    var GRAFICA = 'historial_creditos_seis';
    var posicion = 0;
    jQuery("canvas.peity").last().removeClass("barsCreditosSeis").removeClass("pointsCreditosSeis");
    jQuery("#histogramaCreditosSeis").css("background", "#78bde7");
    jQuery("#tortaCreditosSeis").css("background", "#2f2f2f");
    jQuery("#puntosCreditosSeis").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.bar = {colours: ["#4d89f9"], delimiter: ",", height: "100%", max: null, min: 0, spacing: 1, width: "100%"};
    var puntos = traerTop10CreditosSeis();
    jdg = puntos;
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            if (barras === '') {
                $("#contenidoGraficaCreditosSeis").html("<div style='background: white; margin-left: 25px; margin-right:25px; border:1px solid #CCC; color:red;'><h4 style='text-align:center; color:red;'>No hay datos para realizar la graficación...</h4></div>");
            } else {
                jQuery("#contenidoGraficaCreditosSeis").html('');
                jQuery("#contenidoGraficaCreditosSeis").html('<div id="barCreditosSeis" style="display:none;"></div><div id="pieCreditosSeis" style="display:none;"></div><div id="lineCreditosSeis" style="display:none;"></div>');
                jQuery("#barCreditosSeis").text(barras.substr(1));
                jQuery("#barCreditosSeis").peity("bar");
                jQuery("#contenidoGraficaCreditosSeis").append($("canvas.peity"));
                for (var i = 0; i < $("canvas.peity").length; i++) {
                    if ($("canvas.peity")[i].id === GRAFICA) {
                        posicion = i;
                    }
                }
                if (inicioHistogramaCreditosSeis) {
                    $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                    inicioHistogramaCreditosSeis = false;
                }
            }
        }
    }
}
function graficarTortaCreditosSeis()
{
    var GRAFICA = 'torta_creditos_seis';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosSeis").removeClass("pointsCreditosSeis");
    jQuery("#histogramaCreditosSeis").css("background", "#2f2f2f");
    jQuery("#tortaCreditosSeis").css("background", "#78bde7");
    jQuery("#puntosCreditosSeis").css("background", "#2f2f2f");
    jQuery.fn.peity.defaults.pie = {colours: ["#ff9900", "#fff4dd", "#ffd592"], delimiter: null, diameter: "100%", height: null, width: null};
    var puntos = traerTop10CreditosSeis();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosSeis").html('');
            jQuery("#contenidoGraficaCreditosSeis").html('<div id="barCreditosSeis" style="display:none;"></div><div id="pieCreditosSeis" style="display:none;"></div><div id="lineCreditosSeis" style="display:none;"></div>');
            jQuery("#pieCreditosSeis").text(barras.substr(1));
            jQuery("#pieCreditosSeis").peity("pie");
            jQuery("#contenidoGraficaCreditosSeis").append($("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioTortaCreditosSeis) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioTortaCreditosSeis = false;
            }
        }
    }
}
function graficarLineaCreditosSeis()
{
    var GRAFICA = 'linea_creditos_seis';
    var posicion = 0;
    jQuery("canvas.peity").removeClass("histCreditosSeis").removeClass("barsCreditosSeis");
    jQuery("#histogramaCreditosSeis").css("background", "#2f2f2f");
    jQuery("#tortaCreditosSeis").css("background", "#2f2f2f");
    jQuery("#puntosCreditosSeis").css("background", "#78bde7");
    jQuery.fn.peity.defaults.line = {colour: "#c6d9fd", strokeColour: "#4d89f9", strokeWidth: 1, delimiter: ",", height: "100%", max: null, min: 0, width: "100%"};
    var puntos = traerTop10CreditosSeis();
    if (puntos.size !== -1) {
        if (puntos) {
            var barras = "";
            for (var i = 0; i < puntos.size + 1; i++) {
                barras = barras + "," + puntos[i]['y'];
            }
            jQuery("#contenidoGraficaCreditosSeis").html('');
            jQuery("#contenidoGraficaCreditosSeis").html('<div id="barCreditosSeis" style="display:none;"></div><div id="pieCreditosSeis" style="display:none;"></div><div id="lineCreditosSeis" style="display:none;"></div>');
            jQuery("#lineCreditosSeis").text(barras.substr(1));
            jQuery("#lineCreditosSeis").peity("line");
            jQuery("#contenidoGraficaCreditosSeis").append(jQuery("canvas.peity"));
            for (var i = 0; i < $("canvas.peity").length; i++) {
                if ($("canvas.peity")[i].id === GRAFICA) {
                    posicion = i;
                }
            }
            if (inicioLineaSeis) {
                $current = $("canvas.peity:nth-last-child(" + posicion + ")");
                inicioCreditosSeis = false;
            }
        }
    }
}

function traerTop10CreditosSeis()
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

function llenarTablaCreditosSeis()
{
    var datos = traerTop10CreditosCinco();
    var size = datos.size + 1;
    var filas = [];
    for (var i = 0; i < size; i++) {
        document.getElementById("tab-creditosseis-1").innerHTML = "";
    }
    document.getElementById("tab-creditosseis-1").innerHTML = "<thead style='background: #d0e841'>" + "<tr>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id='lang137'>Registro</span></th>" + "<th align='left'>&nbsp;&nbsp;<span data-lang-id=''>Campo1</span></th>" + "<th align='right'><span data-lang-id=''>Campo2</span>&nbsp;&nbsp;</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    for (var i = 0; i < size; i++) {
        filas[i] = document.createElement("tr");
        filas[i].setAttribute("id", "tr_" + i);
        filas[i].setAttribute("style", "text-align:center");
        filas[i].innerHTML = "<td align='left'>" + espacio + (i + 1) + "</td><td align='left'>" + espacio + datos[i]['x'] + "</td>" + '<td align="right">' + " $" + toCurrency(datos[i]['y']) + "" + espacio + "</td>";
        document.getElementById("tab-creditosseis-1").appendChild(filas[i]);
    }
    if (size === 0) {
        document.getElementById("tab-creditosseis-1").innerHTML = "<thead style='background: white; color:red;'>" + "<tr>" + "<th style='padding:15px'>La búsqueda no arroja datos</th>" + "</tr>" + "</thead>" + "<tbody style='text-align: center'></tbody>";
    }
}

/******************/