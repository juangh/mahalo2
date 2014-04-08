function tabVentasGeneral1()
{
    jQuery("#informeVentas").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-1").css("background", "#78bde7");
    jQuery("#ventasgen-tab-2").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-3").css("background", "#2f2f2f");
    jQuery("#contenidogen-tab-1").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'}).trigger('create');
    jQuery("#contenidogen-tab-2").css('display', 'none').trigger('create');
    jQuery("#contenidogen-tab-3").css('display', 'none').trigger('create');
}
function tabVentasGeneral2()
{
    jQuery("#informeVentas").css("background", "#2f2f2f");
    jQuery("#informe-ventas-general").trigger("create");
    jQuery("#ventasgen-tab-1").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-2").css("background", "#78bde7");
    jQuery("#ventasgen-tab-3").css("background", "#2f2f2f");
    jQuery("#contenidogen-tab-1").css('display', 'none').trigger('create');
    jQuery("#contenidogen-tab-2").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'}).trigger('create');
    jQuery("#contenidogen-tab-3").css('display', 'none').trigger('create');
}
function tabVentasGeneral3()
{
    jQuery("#ventasgen-tab-3").css('display', 'block');
    jQuery("#ventasgen-tab-1").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-2").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-3").css("background", "#78bde7");
    jQuery("#informeVentas").css("background", "#78bde7");
    jQuery("#contenidogen-tab-1").css('display', 'none');
    jQuery("#contenidogen-tab-2").css('display', 'none');
    jQuery("#contenidogen-tab-3").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'});
}
function obtenerFiltros()
{
    var filtros = new Array();
    var txtFechaInicio = '';
    var txtFechaCorte = '';
    var chcAlmacen = '';
    var txtCedula = '';
    var txtReferencia = '';
    var txtPlu = '';
    var chcTalla = '';
    var chcColor = '';
    var chcLinea = '';
    var chcCategoria = '';
    var chcSubcategoria = '';
    var chcMarca = '';
    var chcSegmento = '';
    var chcSector = '';
    var chcColeccion = '';
    var chcClasificacion = '';
    var chcProveedor = '';
    var chcTipoDocumento = '';
    var chcTipoVenta = '';
    var chcVendedor = '';
    var chcAnulado = '';
    var txtReferenciaDesc = '';
    txtFechaInicio = obtenerFechaInicio($("#date_inicial").val());
    txtFechaCorte = obtenerFechaCorte($("#date_corte").val());
    chcAlmacen = obtenerAlmacen($("#select_almacenes").val());
    txtCedula = obtenerCedula($("#txt_cedula").val());
    txtReferencia = obtenerReferencia($("#txt_referencia").val());
    txtPlu = obtenerPlu($("#txt_plu").val());
    chcTalla = obtenerTipoDocumento($("#select_tallas").val());
    chcColor = obtenerTipoDocumento($("#select_colores").val());
    chcLinea = obtenerTipoDocumento($("#select_lineas").val());
    chcCategoria = obtenerTipoDocumento($("#select_categorias").val());
    chcSubcategoria = obtenerTipoDocumento($("#select_subcategorias").val());
    chcMarca = obtenerTipoDocumento($("#select_marcas").val());
    chcSegmento = obtenerTipoDocumento($("#select_segmentos").val());
    chcSector = obtenerTipoDocumento($("#select_sectores").val());
    chcColeccion = obtenerTipoDocumento($("#select_colecciones").val());
    chcClasificacion = obtenerTipoDocumento($("#select_clasificaciones").val());
    chcProveedor = obtenerTipoDocumento($("#select_proveedores").val());
    chcTipoDocumento = obtenerTipoDocumento($("#select_tipodocumento").val());
    chcTipoVenta = obtenerTipoVenta($("#select_tipoventa").val());
    chcVendedor = obtenerVendedor($("#select_vendedor").val());
    chcAnulado = obtenerDocumentoAnulado($("#select_anulado").val());
    txtReferenciaDesc = obtenerReferencia($("#txt_referencia_desc").val());
    filtros = new Array(txtFechaInicio, txtFechaCorte, chcAlmacen, txtCedula,
            txtReferencia, txtPlu, chcTalla, chcColor, chcLinea, chcCategoria, chcSubcategoria, chcMarca,
            chcSegmento, chcSector, chcColeccion, chcClasificacion, chcProveedor,
            chcTipoDocumento, chcTipoVenta, chcVendedor, chcAnulado, txtReferenciaDesc);
    return filtros;
}
function obtenerCampos()
{
    var checkbox_group = new Array();
    var posicion = 0;
    if (jQuery("input[name=checkbox-h-6a]").is(":checked")) {
        checkbox_group.push("c_linea");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6b]").is(":checked")) {
        checkbox_group.push("c_categoria");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6c]").is(":checked")) {
        checkbox_group.push("c_subcategoria");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6d]").is(":checked")) {
        checkbox_group.push("c_segmento");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6e]").is(":checked")) {
        checkbox_group.push("c_sector");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6f]")) {
        checkbox_group.push("c_almacen");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6g]").is(":checked")) {
        checkbox_group.push("c_clasificacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6h]").is(":checked")) {
        checkbox_group.push("c_producto");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6i]").is(":checked")) {
        checkbox_group.push("d_producto");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6j]").is(":checked")) {
        checkbox_group.push("c_barra");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6k]").is(":checked")) {
        checkbox_group.push("sku");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6l]").is(":checked")) {
        checkbox_group.push("c_talla");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6m]").is(":checked")) {
        checkbox_group.push("c_color_proveedor");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6n]").is(":checked")) {
        posicion++;
        checkbox_group.push("c_coleccion");
    }
    if (jQuery("input[name=checkbox-h-6o]").is(":checked")) {
        posicion++;
        checkbox_group.push("c_proveedor");
    }
    if (jQuery("input[name=checkbox-h-6p]").is(":checked")) {
        posicion++;
        checkbox_group.push("d_presentacion");
    }
    if (jQuery("input[name=checkbox-h-6q]").is(":checked")) {
        posicion++;
        checkbox_group.push("ubicacion");
    }
    if (jQuery("input[name=checkbox-h-6r]").is(":checked")) {
        checkbox_group.push("c_grupo");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6s]").is(":checked")) {
        checkbox_group.push("c_ciudad");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6t]").is(":checked")) {
        checkbox_group.push("c_marca");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6u]").is(":checked")) {
        checkbox_group.push("f_creacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6v]").is(":checked")) {
        checkbox_group.push("c_vendedor");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6w]").is(":checked")) {
        checkbox_group.push("cc_cliente");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6x]").is(":checked")) {
        checkbox_group.push("c_tipo_venta");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6y]").is(":checked")) {
        checkbox_group.push("caja");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6z]").is(":checked")) {
        checkbox_group.push("factura");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aa]").is(":checked")) {
        checkbox_group.push("f_factura");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ab]").is(":checked")) {
        checkbox_group.push("vr_margen");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ac]").is(":checked")) {
        checkbox_group.push("f_sistema");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ad]").is(":checked")) {
        checkbox_group.push("t_sistema");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ae]").is(":checked")) {
        checkbox_group.push("c_lista_precio");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6af]").is(":checked")) {
        checkbox_group.push("us_creacion");
    }
    if (jQuery("input[name=checkbox-h-6ag]").is(":checked")) {
        checkbox_group.push("preciomae");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ah]").is(":checked")) {
        checkbox_group.push("d_referencia_prov");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ai]").is(":checked")) {
        checkbox_group.push("precio_venta_un");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aj]").is(":checked")) {
        checkbox_group.push("tipo_factura");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ak]").is(":checked")) {
        checkbox_group.push("anulado");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6al]").is(":checked")) {
        checkbox_group.push("c_iva");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6am]").is(":checked")) {
        checkbox_group.push("doc_referencia");
        posicion++;
    }
    return checkbox_group;
}
function obtenerTotales()
{
    var checkbox_group = new Array();
    var posicion = 0;
    if (jQuery("input[name=checkbox-h-6an]")) {
        checkbox_group.push("vr_bruto");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ao]")) {
        checkbox_group.push("vr_neto");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ap]")) {
        checkbox_group.push("vr_descuento");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aq]")) {
        checkbox_group.push("vr_iva");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ar]").is(":checked")) {
        checkbox_group.push("cn_venta");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6as]").is(":checked")) {
        checkbox_group.push("pr_compra");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6at]").is(":checked")) {
        checkbox_group.push("pr_compram");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6au]").is(":checked")) {
        checkbox_group.push("vr_utilidad");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6av]").is(":checked")) {
        ++i;
        checkbox_group.push("part_util");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aw]").is(":checked")) {
        checkbox_group.push("part_vtas");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ax]").is(":checked")) {
        checkbox_group.push("nro_registros");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6ay]").is(":checked")) {
        checkbox_group.push("nro_facturas");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6az]").is(":checked")) {
        checkbox_group.push("neto_sin_iva");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aaa]").is(":checked")) {
        checkbox_group.push("dif_prventa");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-6aab]").is(":checked")) {
        checkbox_group.push("vr_descuento_por");
        posicion++;
    }
    return checkbox_group;
}
function obtenerTabla()
{
    var campos = obtenerCampos();
    var camposQuery = new Array();
    var j = 0;
    for (var i = 0; i < camposVentasGeneral.length; i++) {
        if (campos[i] === 1) {
            camposQuery[j] = camposVentasGeneral[i];
            ++j;
        }
    }
    return camposQuery;
}
function obtenerFechaInicio(fecha)
{
    return asignarFecha(fecha);
}
function obtenerFechaCorte(fecha)
{
    return asignarFecha(fecha);
}
function obtenerAlmacen(almacen)
{
    return almacen;
}
function obtenerCedula(cedula)
{
    return cedula;
}
function obtenerDocumento(documento)
{
    return documento;
}
function obtenerDocReferencia(referencia)
{
    return referencia;
}
function obtenerEstadoKardex(estado)
{
    return estado;
}
function obtenerReferencia(referencia)
{
    return referencia;
}
function obtenerPlu(plu)
{
    return plu;
}
function obtenerTipoDocumento(tipoDocumento)
{
    return tipoDocumento;
}
function obtenerBarra(barra)
{
    return barra;
}
function obtenerTipoVenta(tipoVenta)
{
    return tipoVenta;
}
function obtenerVendedor(vendedor)
{
    return vendedor;
}
function obtenerDocumentoAnulado(documentoAnulado)
{
    return documentoAnulado;
}
function asignarFecha(fecha)
{
    var date = checkDate(fecha);
    return date;
}
function checkDate(fecha)
{
    var date = formatearFecha(fecha);
    var separador = '/';
    var d = new Date();
    function addDigit2Date() {
        var date = new Date();
        var month = date.getMonth() + 1;
        month = new String(month).toString();
        var digitos = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (digitos.indexOf(month)) {
            month = "0" + month;
        }
        return month;
    }
    var month = addDigit2Date();
    var year = new String(d.getFullYear()).toString();
    var day = new String(d.getDate()).toString();
    if (validaFechaDDMMAAAA(date) === true) {
        return date;
    } else {
        return day + separador + month + separador + year;
    }
}
function formatearFecha(fecha)
{
    var separador = '/';
    var componentesFecha = new Array();
    var component1, component2, component3;
    var verificaTermino;
    var date = new Date();
    function addDigit2Date() {
        var date = new Date();
        var month = date.getMonth() + 1;
        month = new String(month).toString();
        var digitos = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (digitos.indexOf(month)) {
            month = "0" + month;
        }
        return month;
    }
    var month = addDigit2Date();
    var year = new String(date.getFullYear()).toString();
    var day = new String(date.getDate()).toString();
    function isNumeric(expression)
    {
        return (String(expression).search(/^\d+$/) !== -1);
    }
    function verificaTermino(termino1, termino2, termino3) {
        if ((isNumeric(termino1) === false) || (isNumeric(termino2) === false) || (isNumeric(termino3) === false)
                || (termino1 <= 0) || (termino2 <= 0) || (termino3 <= 0)) {
            return day + separador + month + separador + year;
        }
        return true;
    }
    function addDigit2Date() {
        var date = new Date();
        var month = date.getMonth() + 1;
        month = new String(month).toString();
        var digitos = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (digitos.indexOf(month)) {
            month = "0" + month;
        }
        return month;
    }
    if (fecha.indexOf("-") === 4) {
        componentesFecha = fecha.split("-");
        verificaTermino = verificaTermino(componentesFecha[0], componentesFecha[1], componentesFecha[2]);
        if (verificaTermino === true) {
            component3 = componentesFecha[0];
            component2 = componentesFecha[1];
            component1 = componentesFecha[2];
        } else {
            return day + separador + month + separador + year;
        }

    } else if (fecha.indexOf("/") === 2) {
        componentesFecha = fecha.split("/");
        verificaTermino = verificaTermino(componentesFecha[0], componentesFecha[1], componentesFecha[2]);
        if (verificaTermino === true) {
            component1 = componentesFecha[0];
            component2 = componentesFecha[1];
            component3 = componentesFecha[2];
        } else {
            return day + separador + month + separador + year;
        }
    } else {
        return day + separador + month + separador + year;
    }
    if (typeof(component1) === "undefined") {
        return day + separador + month + separador + year;
    }
    return component1 + separador + component2 + separador + component3;
}
function formatearFecha2(fecha)
{
    var separador = '-';
    var componentesFecha = new Array();
    var component1, component2, component3;
    var verificaTermino;
    var date = new Date();
    function addDigit2Date() {
        var date = new Date();
        var month = date.getMonth() + 1;
        month = new String(month).toString();
        var digitos = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (digitos.indexOf(month)) {
            month = "0" + month;
        }
        return month;
    }
    var month = addDigit2Date();
    var year = new String(date.getFullYear()).toString();
    var day = new String(date.getDate()).toString();
    function isNumeric(expression)
    {
        return (String(expression).search(/^\d+$/) !== -1);
    }
    function verificaTermino(termino1, termino2, termino3) {
        if ((isNumeric(termino1) === false) || (isNumeric(termino2) === false) || (isNumeric(termino3) === false)
                || (termino1 <= 0) || (termino2 <= 0) || (termino3 <= 0)) {
            return year + separador + month + separador + day;
        }
        return true;
    }
    function addDigit2Date() {
        var date = new Date();
        var month = date.getMonth() + 1;
        month = new String(month).toString();
        var digitos = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (digitos.indexOf(month)) {
            month = "0" + month;
        }
        return month;
    }
    if (fecha.indexOf("-") === 4) {
        componentesFecha = fecha.split("-");
        verificaTermino = verificaTermino(componentesFecha[0], componentesFecha[1], componentesFecha[2]);
        if (verificaTermino === true) {
            component3 = componentesFecha[0];
            component2 = componentesFecha[1];
            component1 = componentesFecha[2];
        } else {
            return year + separador + month + separador + day;
        }

    } else if (fecha.indexOf("/") === 2) {
        componentesFecha = fecha.split("/");
        verificaTermino = verificaTermino(componentesFecha[0], componentesFecha[1], componentesFecha[2]);
        if (verificaTermino === true) {
            component1 = componentesFecha[0];
            component2 = componentesFecha[1];
            component3 = componentesFecha[2];
        } else {
            return year + separador + month + separador + day;
        }
    } else {
        return year + separador + month + separador + day;
    }
    if (typeof(component1) === "undefined") {
        return year + separador + month + separador + day;
    }
    return component1 + separador + component2 + separador + component3;
}
function getCurrentDate()
{
    return formatearFecha2(new Date().toString());
}
function validaFechaDDMMAAAA(fecha)
{
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;
    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9")))
                return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) === -1)
                returnString += c;
        }
        return returnString;
    }
    function daysInFebruary(year) {
        return (((year % 4 === 0) && ((!(year % 100 === 0)) || (year % 400 === 0))) ? 29 : 28);
    }
    function DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31;
            if (i === 4 || i === 6 || i === 9 || i === 11) {
                this[i] = 30;
            }
            if (i === 2) {
                this[i] = 29;
            }
        }
        return this;
    }
    function isDate(dtStr) {
        var daysInMonth = DaysArray(12);
        var pos1 = dtStr.indexOf(dtCh);
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
        var strDay = dtStr.substring(0, pos1);
        var strMonth = dtStr.substring(pos1 + 1, pos2);
        var strYear = dtStr.substring(pos2 + 1);
        strYr = strYear;
        if (strDay.charAt(0) === "0" && strDay.length > 1)
            strDay = strDay.substring(1);
        if (strMonth.charAt(0) === "0" && strMonth.length > 1)
            strMonth = strMonth.substring(1);
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) === "0" && strYr.length > 1)
                strYr = strYr.substring(1);
        }
        month = parseInt(strMonth);
        day = parseInt(strDay);
        year = parseInt(strYr);
        if (pos1 === -1 || pos2 === -1) {
            return false;
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return false;
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month === 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
            return false;
        }
        if (strYear.length !== 4 || year === 0 || year < minYear || year > maxYear) {
            return false;
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) !== -1 || isInteger(stripCharsInBag(dtStr, dtCh)) === false) {
            return false;
        }
        return true;
    }
    if (isDate(fecha)) {
        return true;
    } else {
        return false;
    }
}
function loadAlmacenes()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'almacenes_ventas', compania: compania},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_almacenes").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colAlmVentasGen = values;
                objAlmVentasGen = JSON.parse(colAlmVentasGen);
                if (objAlmVentasGen === "") {
                    $("#select_almacenes").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_almacenes").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_almacenes").append("<option value='all'><span data-lang-id=\"lang43\"\">All</span></option>");
                    } else {
                        $("#select_almacenes").append("<option value='all'><span data-lang-id=\"lang43\"\">Todos</span></option>");
                    }
                    if (objProveedoresVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objAlmVentasGen.length; i++) {
                            codAlmVentasGen[i] = objAlmVentasGen[i][punteros[0]];
                            descAlmVentasGen[i] = objAlmVentasGen[i][punteros[1]];
                            $("#select_almacenes").append("<option value='" + codAlmVentasGen[i] + "'>" + "(" + codAlmVentasGen[i] + ") " + descAlmVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadTiposDocumentos()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'tiposdoc_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_tipodocumento").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colTipoDocVentasGen = values;
                objTipoDocVentasGen = JSON.parse(colTipoDocVentasGen);
                if (objTipoDocVentasGen === "") {
                    $("#select_tipodocumento").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_tipodocumento").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_tipodocumento").append("<option value='all'>All</option>");
                    } else {
                        $("#select_tipodocumento").append("<option value='all'>Todos</option>");
                    }
                    if (objTipoDocVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objTipoDocVentasGen.length; i++) {
                            codTipoDocVentasGen[i] = objTipoDocVentasGen[i][punteros[0]];
                            descTipoDocVentasGen[i] = objTipoDocVentasGen[i][punteros[1]];
                            $("#select_tipodocumento").append("<option value='" + codTipoDocVentasGen[i] + "'>" + "(" + codTipoDocVentasGen[i] + ") " + descTipoDocVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadTiposVentas()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'tiposven_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_tipoventa").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colTipoVenVentasGen = values;
                objTipoVenVentasGen = JSON.parse(colTipoVenVentasGen);
                if (objTipoVenVentasGen === "") {
                    $("#select_tipoventa").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_tipoventa").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_tipoventa").append("<option value='all'>All</option>");
                    } else {
                        $("#select_tipoventa").append("<option value='all'>Todos</option>");
                    }
                    if (objTipoVenVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objTipoVenVentasGen.length; i++) {
                            codTipoVenVentasGen[i] = objTipoVenVentasGen[i][punteros[0]];
                            descTipoVenVentasGen[i] = objTipoVenVentasGen[i][punteros[1]];
                            $("#select_tipoventa").append("<option value='" + codTipoVenVentasGen[i] + "'>" + "(" + codTipoVenVentasGen[i] + ") " + descTipoVenVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadVendedores()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'vendedores_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_vendedor").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colVendVentasGen = values;
                objVendVentasGen = JSON.parse(colVendVentasGen);
                if (objVendVentasGen === "") {
                    $("#select_vendedor").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_vendedor").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_vendedor").append("<option value='all'>All</option>");
                    } else {
                        $("#select_vendedor").append("<option value='all'>Todos</option>");
                    }
                    if (objVendVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objVendVentasGen.length; i++) {
                            codVendVentasGen[i] = objVendVentasGen[i][punteros[0]];
                            descVendVentasGen[i] = objVendVentasGen[i][punteros[1]];
                            $("#select_vendedor").append("<option value='" + codVendVentasGen[i] + "'>" + "(" + codVendVentasGen[i] + ") " + descVendVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadTallas()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'tallas_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_tallas").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colTallasVentasGen = values;
                objTallasVentasGen = JSON.parse(colTallasVentasGen);
                if (objTallasVentasGen === "") {
                    $("#select_tallas").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_tallas").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_tallas").append("<option value='all'>All</option>");
                    } else {
                        $("#select_tallas").append("<option value='all'>Todos</option>");
                    }
                    if (objTallasVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objTallasVentasGen.length; i++) {
                            codTallasVentasGen[i] = objTallasVentasGen[i][punteros[0]];
                            descTallasVentasGen[i] = objTallasVentasGen[i][punteros[1]];
                            $("#select_tallas").append("<option value='" + codTallasVentasGen[i] + "'>" + "(" + codTallasVentasGen[i] + ") " + descTallasVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadColores()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'colores_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_colores").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colColorVentasGen = values;
                objColorVentasGen = JSON.parse(colColorVentasGen);
                if (objColorVentasGen === "") {
                    $("#select_colores").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_colores").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_colores").append("<option value='all'>All</option>");
                    } else {
                        $("#select_colores").append("<option value='all'>Todos</option>");
                    }
                    if (objColorVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objColorVentasGen.length; i++) {
                            codColorVentasGen[i] = objColorVentasGen[i][punteros[0]];
                            descColorVentasGen[i] = objColorVentasGen[i][punteros[1]];
                            $("#select_colores").append("<option value='" + codColorVentasGen[i] + "'>" + "(" + codColorVentasGen[i] + ") " + descColorVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadLineas()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'lineas_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_lineas").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colLineasVentasGen = values;
                objLineasVentasGen = JSON.parse(colLineasVentasGen);
                if (objLineasVentasGen === "") {
                    $("#select_lineas").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_lineas").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_lineas").append("<option value='all'>All</option>");
                    } else {
                        $("#select_lineas").append("<option value='all'>Todos</option>");
                    }
                    if (objLineasVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objLineasVentasGen.length; i++) {
                            codLineasVentasGen[i] = objLineasVentasGen[i][punteros[0]];
                            descLineasVentasGen[i] = objLineasVentasGen[i][punteros[1]];
                            $("#select_lineas").append("<option value='" + codLineasVentasGen[i] + "'>" + "(" + codLineasVentasGen[i] + ") " + descLineasVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadCategorias()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'categorias_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_categorias").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colCategoriasVentasGen = values;
                objCategoriasVentasGen = JSON.parse(colCategoriasVentasGen);
                if (objCategoriasVentasGen === "") {
                    $("#select_categorias").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_categorias").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_categorias").append("<option value='all'>All</option>");
                    } else {
                        $("#select_categorias").append("<option value='all'>Todos</option>");
                    }
                    if (objCategoriasVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objCategoriasVentasGen.length; i++) {
                            codCategoriasVentasGen[i] = objCategoriasVentasGen[i][punteros[0]];
                            descCategoriasVentasGen[i] = objCategoriasVentasGen[i][punteros[1]];
                            $("#select_categorias").append("<option value='" + codCategoriasVentasGen[i] + "'>" + "(" + codCategoriasVentasGen[i] + ") " + descCategoriasVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadSubcategorias()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'subcategorias_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_subcategorias").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSubcategoriasVentasGen = values;
                objSubcategoriasVentasGen = JSON.parse(colSubcategoriasVentasGen);
                if (objSubcategoriasVentasGen === "") {
                    $("#select_subcategorias").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_subcategorias").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_subcategorias").append("<option value='all'>All</option>");
                    } else {
                        $("#select_subcategorias").append("<option value='all'>Todos</option>");
                    }
                    if (objSubcategoriasVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objSubcategoriasVentasGen.length; i++) {
                            codSubcategoriasVentasGen[i] = objSubcategoriasVentasGen[i][punteros[0]];
                            descSubcategoriasVentasGen[i] = objSubcategoriasVentasGen[i][punteros[1]];
                            $("#select_subcategorias").append("<option value='" + codSubcategoriasVentasGen[i] + "'>" + "(" + codSubcategoriasVentasGen[i] + ") " + descSubcategoriasVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadMarcas()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'marcas_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_marcas").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colMarcasVentasGen = values;
                objMarcasVentasGen = JSON.parse(colMarcasVentasGen);
                if (objMarcasVentasGen === "") {
                    $("#select_marcas").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_marcas").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_marcas").append("<option value='all'>All</option>");
                    } else {
                        $("#select_marcas").append("<option value='all'>Todos</option>");
                    }
                    if (objMarcasVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objMarcasVentasGen.length; i++) {
                            codMarcasVentasGen[i] = objMarcasVentasGen[i][punteros[0]];
                            descMarcasVentasGen[i] = objMarcasVentasGen[i][punteros[1]];
                            $("#select_marcas").append("<option value='" + codMarcasVentasGen[i] + "'>" + "(" + codMarcasVentasGen[i] + ") " + descMarcasVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadSegmentos()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'segmentos_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_segmentos").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSegmentosVentasGen = values;
                objSegmentosVentasGen = JSON.parse(colSegmentosVentasGen);
                if (objSegmentosVentasGen === "") {
                    $("#select_segmentos").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_segmentos").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_segmentos").append("<option value='all'>All</option>");
                    } else {
                        $("#select_segmentos").append("<option value='all'>Todos</option>");
                    }
                    if (objSegmentosVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objSegmentosVentasGen.length; i++) {
                            codSegmentosVentasGen[i] = objSegmentosVentasGen[i][punteros[0]];
                            descSegmentosVentasGen[i] = objSegmentosVentasGen[i][punteros[1]];
                            $("#select_segmentos").append("<option value='" + codSegmentosVentasGen[i] + "'>" + "(" + codSegmentosVentasGen[i] + ") " + descSegmentosVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadSectores()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'sectores_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_sectores").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSectoresVentasGen = values;
                objSectoresVentasGen = JSON.parse(colSectoresVentasGen);
                if (objSectoresVentasGen === "") {
                    $("#select_sectores").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_sectores").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_sectores").append("<option value='all'>All</option>");
                    } else {
                        $("#select_sectores").append("<option value='all'>Todos</option>");
                    }
                    if (objSectoresVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objSectoresVentasGen.length; i++) {
                            codSectoresVentasGen[i] = objSectoresVentasGen[i][punteros[0]];
                            descSectoresVentasGen[i] = objSectoresVentasGen[i][punteros[1]];
                            $("#select_sectores").append("<option value='" + codSectoresVentasGen[i] + "'>" + "(" + codSectoresVentasGen[i] + ") " + descSectoresVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadColecciones()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'colecciones_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_colecciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colColeccionesVentasGen = values;
                objColeccionesVentasGen = JSON.parse(colColeccionesVentasGen);
                if (objColeccionesVentasGen === "") {
                    $("#select_colecciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_colecciones").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_colecciones").append("<option value='all'>All</option>");
                    } else {
                        $("#select_colecciones").append("<option value='all'>Todos</option>");
                    }
                    if (objColeccionesVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objColeccionesVentasGen.length; i++) {
                            codColeccionesVentasGen[i] = objColeccionesVentasGen[i][punteros[0]];
                            descColeccionesVentasGen[i] = objColeccionesVentasGen[i][punteros[1]];
                            $("#select_colecciones").append("<option value='" + codColeccionesVentasGen[i] + "'>" + "(" + codColeccionesVentasGen[i] + ") " + descColeccionesVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadClasificaciones()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'clasificaciones_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_clasificaciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colClasificacionesVentasGen = values;
                objClasificacionesVentasGen = JSON.parse(colClasificacionesVentasGen);
                if (objClasificacionesVentasGen === "") {
                    $("#select_clasificaciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_clasificaciones").html("");
                    if (localStorage["idioma"] === 'en') {
                        $("#select_clasificaciones").append("<option value='all'>All</option>");
                    } else {
                        $("#select_clasificaciones").append("<option value='all'>Todos</option>");
                    }
                    if (objClasificacionesVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objClasificacionesVentasGen.length; i++) {
                            codClasificacionesVentasGen[i] = objClasificacionesVentasGen[i][punteros[0]];
                            descClasificacionesVentasGen[i] = objClasificacionesVentasGen[i][punteros[1]];
                            $("#select_clasificaciones").append("<option value='" + codClasificacionesVentasGen[i] + "'>" + "(" + codClasificacionesVentasGen[i] + ") " + descClasificacionesVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadProveedores()
{
    var punteros = new Array(0, 1);
    var urlInformeVentasGeneralMobile = rutaPortal;
    var onCache = false;
    var segundos = seconsNumber();
    $.ajax({
        data: {peticion: 'proveedores_ventas'},
        url: urlInformeVentasGeneralMobile + "?tiempo=" + segundos,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_proveedores").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colProveedoresVentasGen = values;
                objProveedoresVentasGen = JSON.parse(colProveedoresVentasGen);
                if (objProveedoresVentasGen === "") {
                    $("#select_proveedores").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    if (localStorage["idioma"] === 'en') {
                        $("#select_proveedores").html("<option value='all'>All</option>");
                    } else {
                        $("#select_proveedores").html("<option value='all'>Todos</option>");
                    }
                    if (objProveedoresVentasGen.length === '') {
                        alert("No se han cargado los datos");
                    }
                    else {
                        for (var i = 0; i < objProveedoresVentasGen.length; i++) {
                            codProveedoresVentasGen[i] = objProveedoresVentasGen[i][punteros[0]];
                            descProveedoresVentasGen[i] = objProveedoresVentasGen[i][punteros[1]];
                            $("#select_proveedores").append("<option value='" + codProveedoresVentasGen[i] + "'>" + "(" + codProveedoresVentasGen[i] + ") " + descProveedoresVentasGen[i] + "</option>");
                        }
                    }
                }
            }
        }
    });
}
function loadSelects()
{
    loadAlmacenes();
    loadTiposDocumentos();
    loadTiposVentas();
    loadVendedores();
    loadTallas();
    loadColores();
    loadLineas();
    loadCategorias();
    loadSubcategorias();
    loadMarcas();
    loadSegmentos();
    loadSectores();
    loadColecciones();
    loadClasificaciones();
    loadProveedores();
}

function soloNumeros() {
    if (((event.keyCode < 48) && (event.keyCode !== 45 && event.keyCode !== 47)) || (event.keyCode > 57)) {
        event.returnValue = false;
    }
}

function ejecutarVentas() {
    var id_query = "busqueda_fechas";
    var fechaInicial = formatearFecha($("#date_inicial").val());
    var fechaFinal = formatearFecha($("#date_corte").val());
    var valuesStart = fechaInicial.split("/");
    var valuesEnd = fechaFinal.split("/");
    var sql = "SELECT MDY(" + valuesEnd[1] + "," + valuesEnd[0] + "," + valuesEnd[2] + ") - MDY(" + valuesStart[1] + "," + valuesStart[0] + "," + valuesStart[2] + ") diff FROM sysmaster:sysdual";
    xmlQueryDB(sql, id_query, 1, false, ruta, username, userpass);
    var res = xmlGetRow(id_query, 0, 0)['diff'];
    if (res < 0) {
        verificarFechas();
    } else {
        tabVentasGeneral3();
        introTable();
    }
}
function verificarFechas()
{
    alert('La fecha de inicio debe ser menor que la fecha de corte');
    tabVentasGeneral1();
    return;
}
function introTable()
{
    jQuery("#ventasgen-tab-1").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-2").css("background", "#2f2f2f");
    jQuery("#ventasgen-tab-3").css("background", "#78bde7");
    var msj = "";
    if (localStorage["idioma"] === 'es') {
        msj = "Consultando la información...";
    } else {
        msj = "Search information...";
    }
    $("#tbl_ventasgen").html("<thead style='background: #d0e841'></thead><tbody><tr><td><h4 style='text-align:center; color:red;'>" + msj + "</h4></td></tr></tbody>");
    getTable();
}
function getTable()
{
    var urlInformeVentasGeneralMobile = rutaPortal;
    array = new Array();
    totales = new Array();
    array = obtenerCampos();
    totales = obtenerTotales();
    var filtros = obtenerFiltros();

    if (array.length < 1 && totales.length < 1) {
        array.push('c_almacen');
        totales.push('vr_bruto');
        totales.push('vr_neto');
        totales.push('vr_descuento');
        totales.push('vr_iva');
        var eraserFields = 1;
    }

    $("#spn_nummaxperm").html(getMaxRegs(username, userpass));

    $.ajax({
        data: {peticion: 'get_data', campos: array, filtros: filtros, totales: totales},
        url: urlInformeVentasGeneralMobile,
        username: username,
        password: userpass,
        success: function(values) {
            var datos = new Array();
            datos = values.split("  #  ");
            var primerTermino = $.trim(datos[0]);
            var segundoTermino = $.trim(datos[1]);
            var registros = new Array();
            var cabecera = primerTermino.split("|");
            var cuerpo = segundoTermino.split("^");
            var size = primerTermino.length;
            cuerpo.pop();
            for (var k = 0; k < cuerpo.length; k++) {
                registros[k] = cuerpo[k].split("|");
            }
            $("#tbl_ventasgen thead").html(cabeza(cabecera));
            $("#tbl_ventasgen tbody").html(contenido(size, registros));
            $("#ventasgen-tab-3").css("background", "#78bde7");
        }
    });
}

var nettotal = 0;
var bruttotal = 0;
var desctotal = 0;
var ivatotal = 0;
var pos = 0;
var pos2 = 0;
var pos3 = 0;
var pos4 = 0;
var rev = false;
var rev2 = false;
var rev3 = false;
var rev4 = false;
function cabeza(cabecera)
{
    var l = 0;
    var i = 0;
    var header = new Array();
    var headerMsj;
    if (localStorage["idioma"] === "es") {
        headerMsj = new Array("Linea", "Categoria", "Subcategoría", "Segmento", "Sector", "Almacén", "Clasificación", "Código referencia", "Descripción referencia", "Código barra", "Código plu", "Talla", "Color", "Colección", "Proveedor", "Presentación", "Ubicación", "Grupo Almacen", "Ciudad", "Marca", "Fecha creación", "Vendedor", "Cliente", "Tipo venta", "Caja", "Número Factura", "Fecha Factura", "Margen utilidad", "Fecha sistema", "Hora factura", "Escala", "Usuario", "Precio venta maestro", "Referencia proveedor", "Valor unitario", "Tipo documento", "Documento anulado", "Tarifa de impuesto", "Documento referencia", "Bruto", "Neto", "Descuento", "IVA", "Cantidad", "Precio compra", "Precio compra maestro", "Utilidad", "Participación utilidad", "Participación ventas", "Número de productos", "Número de facturas", "Neto antes de IVA", "Diferencia precio venta", "Porcentaje de descuento");
    } else {
        headerMsj = new Array("Line", "Category", "Subcategory", "Segment", "Section", "Store", "Clasification", "Reference code", "Reference description", "Barcode", "Plu code", "Size", "Color", "Colection", "Supplier", "Presentation", "Location", "Store group", "City", "Brand", "Creation date", "Salesman", "Customer", "Type of sales", "Till", "Invoice number", "Invoice date", "Utility margin", "System date", "Invoice hour", "Scale", "User", "Sale price master", "Supplier reference", "Unit value", "Document type", "Null document", "Tax rate", "Reference document", "Totals", "Net", "Discont", "IVA", "Quantity", "Purchase price", "Purchase master price", "Utility", "Utility participation", "Sales participation", "Number products", "Number invoices", "Net before IVA", "Sales price difference", "Discount percentage");
    }
    for (var k = 0; k < cabecera.length; k++) {
        switch ($.trim(cabecera[k])) {
            case "c_linea":
                header[i] = headerMsj[0];
                break;
            case "c_categoria":
                header[i] = headerMsj[1];
                break;
            case "c_subcategoria":
                header[i] = headerMsj[2];
                break;
            case "c_segmento":
                header[i] = headerMsj[3];
                break;
            case "c_sector":
                header[i] = headerMsj[4];
                break;
            case "c_almacen":
                header[i] = headerMsj[5];
                break;
            case "c_clasificacion":
                header[i] = headerMsj[6];
                break;
            case "c_producto":
                header[i] = headerMsj[7];
                break;
            case "d_producto":
                header[i] = headerMsj[8];
                break;
            case "c_barra":
                header[i] = headerMsj[9];
                break;
            case "sku":
                header[i] = headerMsj[10];
                break;
            case "c_talla":
                header[i] = headerMsj[11];
                break;
            case "c_color_proveedor":
                header[i] = headerMsj[12];
                break;
            case "c_coleccion":
                header[i] = headerMsj[13];
                break;
            case "c_proveedor":
                header[i] = headerMsj[14];
                break;
            case "d_presentacion":
                header[i] = headerMsj[15];
                break;
            case "ubicacion":
                header[i] = headerMsj[16];
                break;
            case "c_grupo":
                header[i] = headerMsj[17];
                break;
            case "c_ciudad":
                header[i] = headerMsj[18];
                break;
            case "c_marca":
                header[i] = headerMsj[19];
                break;
            case "f_creacion":
                header[i] = headerMsj[20];
                break;
            case "c_vendedor":
                header[i] = headerMsj[21];
                break;
            case "cc_cliente":
                header[i] = headerMsj[22];
                break;
            case "c_tipo_venta":
                header[i] = headerMsj[23];
                break;
            case "caja":
                header[i] = headerMsj[24];
                break;
            case "factura":
                header[i] = headerMsj[25];
                break;
            case "f_factura":
                header[i] = headerMsj[26];
                break;
            case "vr_margen":
                header[i] = headerMsj[27];
                break;
            case "f_sistema":
                header[i] = headerMsj[28];
                break;
            case "t_sistema":
                header[i] = headerMsj[29];
                break;
            case "c_lista_precio":
                header[i] = headerMsj[30];
                break;
            case "us_creacion":
                header[i] = headerMsj[31];
                break;
            case "preciomae":
                header[i] = headerMsj[32];
                break;
            case "d_referencia_prov":
                header[i] = headerMsj[33];
                break;
            case "precio_venta_un":
                header[i] = headerMsj[34];
                break;
            case "tipo_factura":
                header[i] = headerMsj[35];
                break;
            case "anulado":
                header[i] = headerMsj[36];
                break;
            case "c_iva":
                header[i] = headerMsj[37];
                break;
            case "doc_referencia":
                header[i] = headerMsj[38];
                break;
            case "vr_bruto":
                rev2 = true;
                bruttotal = i;
                pos2 = i;
                header[i] = headerMsj[39];
                break;
            case "vr_neto":
                rev = true;
                nettotal = i;
                pos = i + 1;
                header[i] = headerMsj[40];
                break;
            case "vr_descuento":
                rev3 = true;
                desctotal = i;
                pos3 = i + 2;
                header[i] = headerMsj[41];
                break;
            case "vr_iva":
                rev4 = true;
                ivatotal = i;
                pos4 = i + 3;
                header[i] = headerMsj[42];
                break;
            case "cn_venta":
                header[i] = headerMsj[43];
                break;
            case "pr_compra":
                header[i] = headerMsj[44];
                break;
            case "pr_compram":
                header[i] = headerMsj[45];
                break;
            case "vr_utilidad":
                header[i] = headerMsj[46];
                break;
            case "part_util":
                header[i] = headerMsj[47];
                break;
            case "part_vtas":
                header[i] = headerMsj[48];
                break;
            case "nro_registros":
                header[i] = headerMsj[49];
                break;
            case "nro_facturas":
                header[i] = headerMsj[50];
                break;
            case "neto_sin_iva":
                header[i] = headerMsj[51];
                break;
            case "dif_prventa":
                header[i] = headerMsj[52];
                break;
            case "vr_descuento_por":
                header[i] = headerMsj[53];
                break;
            default :
                break;
        }
        ++i;
        l++;
    }
    if (localStorage["idioma"] === 'es') {
        header.unshift("Registro");
    } else {
        header.unshift("Record");
    }
    var output = "<tr style='width:100%;'>";
    for (var i = 0; i < header.length; i++) {
        output += "<th>" + header[i] + "</th>";
    }
    output += "</tr>";
    return output;
}
function formatNumber(n)
{
    var number = new String(n);
    var result = "", isNegative = false;
    if (number.indexOf("-") > -1) {
        number = number.substr(1);
        isNegative = true;
    }
    while (number.length > 3) {
        result = "." + number.substr(number.length - 3) + result;
        number = number.substring(0, number.length - 3);
    }
    result = number + result;
    if (isNegative)
        result = "-" + result;
    return result;
}
function replaceAll(text, busca, reemplaza) {
    while (text.toString().indexOf(busca) != - 1)
        text = text.toString().replace(busca, reemplaza);
    return text;
}
function contenido(longitud, registros)
{
    var output = "";
    var total = 0;
    var total2 = 0;
    var total3 = 0;
    var total4 = 0;
    var aux = 0;
    var aux2 = 0;
    var aux3 = 0;
    var aux4 = 0;
    var error = false;
    if (longitud > 0) {
        if ((registros.length === 0) && (obtenerCampos().length > 0)) {
            if (localStorage["idioma"] === "en") {
                output += "<tr><td colspan='54' style='text-align: center; color:red;'>Information not found</td></tr>";
            } else {
                output += "<tr><td colspan='54' style='text-align: center; color:red;'>Información no encontrada</td></tr>";
            }
            error = true;
        }
        if ((obtenerCampos().length === 0) && (error === false)) {
            if (localStorage["idioma"] === "en") {
                output += "<tr><td colspan='54' style='text-align: center; color:red;'>Have at least one field!!!</td></tr>";
            } else {
                //output += "<tr><td colspan='54' style='text-align: center; color:red;'>Seleccione por lo menos un campo!!!</td></tr>";
            }
            error = true;
        }
        for (var i = 0; i < registros.length; i++) {
            output += "<tr>";
            for (var j = 0; j < registros[i].length; j++) {
                if (j === 0) {
                    output += "<td>" + (i + 1) + "</td>";
                }
                if ((nettotal === j) && (registros.length > 0) && (rev)) {
                    aux = parseInt(replaceAll(registros[i][j], ",", ""));
                    total += aux;
                }
                if ((bruttotal === j) && (registros.length > 0) && (rev2)) {
                    aux2 = parseInt(replaceAll(registros[i][j], ",", ""));
                    total2 += aux2;
                }
                if ((desctotal === j) && (registros.length > 0) && (rev3)) {
                    aux3 = parseInt(replaceAll(registros[i][j], ",", ""));
                    total3 += aux3;
                }
                if ((ivatotal === j) && (registros.length > 0) && (rev4)) {
                    aux4 = parseInt(replaceAll(registros[i][j], ",", ""));
                    total4 += aux4;
                }
                output += "<td class='td_" + i + "'>" + registros[i][j] + "</td>";
            }
            output += "</tr>";
        }
        var izquierda = pos--;
        izquierda--;
        var derecha = pos++;
        derecha++;
        derecha++;
        if (total !== 0) {
            output += "<tr style='background:black; color:white'><td style='text-align:left' colspan='" + izquierda + "'>&nbsp;&nbsp;Total :</td><td>" + (formatNumber(total2)) + "</td><td>" + (formatNumber(total)) + "</td><td>" + (formatNumber(total3)) + "</td><td>" + (formatNumber(total4)) + "</td><td colspan='" + (derecha - 1) + "'></td></tr>";
        }
    } else {
        if (localStorage["idioma"] === "en") {
            output += "<tr><td colspan='54' style='text-align: center; color:red;'>No records to display!!!</td></tr>";
        } else {
            output += "<tr><td colspan='54' style='text-align: center; color:red;'>No existen registros para visualizar!!!</td></tr>";
        }
    }
    rev = false;
    rev2 = false;
    rev3 = false;
    rev4 = false;
    return output;
}
function getMaxDiasXQuery(usuario, password)
{
    var id_query = "busqueda_maxdiasxquery";
    var sql = "SELECT valor FROM m_parametros_portal WHERE nombre='NUM_MAXIMO_DE_RANGO_DE_DIAS_FECHA_POR_CONSULTA' AND c_compania=" + getAlmxUsr(usuario, password) + " AND sw_activo=1";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['valor'];
    return res;
}
function getMaxRegs(usuario, password)
{
    var id_query = "busqueda_nummaxreg";
    var sql = "SELECT valor FROM m_parametros_portal WHERE c_compania=" + getAlmxUsr(usuario, password) + " AND nombre='NUM_MAXIMO_DE_REGISTROS_POR_CONSULTA'";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['valor'];
    return res;
}
function getAlmxUsr(usuario, password)
{
    var id_query = "busqueda_almxusr";
    var sql = "SELECT c_compania,cod_alm,sw_operacion_multiple_comp FROM m_usuarios WHERE c_usuario = '" + usuario + "'";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['c_compania'];
    return res;
}  