function ejecutarTransacciones() {
    var id_query = "busqueda_fechas";
    var fechaInicial = formatearFecha($("#date_inicial_transacciones").val());
    var fechaFinal = formatearFecha($("#date_corte_transacciones").val());
    var valuesStart = fechaInicial.split("/");
    var valuesEnd = fechaFinal.split("/");
    var sql = "SELECT MDY(" + valuesEnd[1] + "," + valuesEnd[0] + "," + valuesEnd[2] + ") - MDY(" + valuesStart[1] + "," + valuesStart[0] + "," + valuesStart[2] + ") diff FROM sysmaster:sysdual";
    xmlQueryDB(sql, id_query, 1, false, ruta, username, userpass);
    var res = xmlGetRow(id_query, 0, 0)['diff'];
    if (res < 0) {
        verificarFechas();
    } else {
        tabTransacciones3();
        getTableInventario();
    }
}
function verificarFechas()
{
    alert('La fecha de inicio debe ser menor que la fecha de corte');
    tabTransacciones1();
    return;
}
function tabTransacciones1() {
    jQuery("#inventa").css("background", "#2f2f2f");
    jQuery("#inventario-tab-1").css("background", "#78bde7");
    jQuery("#inventario-tab-2").css("background", "#2f2f2f");
    jQuery("#inventario-tab-3").css("background", "#2f2f2f").on('click', function() {
    });
    jQuery("#contenidoinv-tab-1").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'}).trigger('create');
    jQuery("#contenidoinv-tab-2").css('display', 'none').trigger('create');
    jQuery("#contenidoinv-tab-3").css('display', 'none').trigger('create');
}
function tabTransacciones2()
{
    jQuery("#inventario-tab-1").css("background", "#2f2f2f");
    jQuery("#inventario-tab-2").css("background", "#78bde7");
    jQuery("#inventario-tab-3").css("background", "#2f2f2f");
    jQuery("#inventa").css("background", "#2f2f2f");
    jQuery("#contenidoinv-tab-1").css('display', 'none').trigger('create');
    jQuery("#contenidoinv-tab-2").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'}).trigger('create');
    jQuery("#contenidoinv-tab-3").css('display', 'none').trigger('create');
}
function tabTransacciones3()
{
    jQuery("#inventa").css("background", "#78bde7");
    jQuery("#inventario-tab-1").css("background", "#2f2f2f");
    jQuery("#inventario-tab-2").css("background", "#2f2f2f");
    jQuery("#inventario-tab-3").css("background", "#78bde7");
    jQuery("#contenidoinv-tab-1").css('display', 'none').trigger('create');
    jQuery("#contenidoinv-tab-2").css('display', 'none').trigger('create');
    jQuery("#contenidoinv-tab-3").css({'display': 'block', 'margin-top': '30px', 'padding': '0 20px'}).trigger('create');
}
function obtenerFiltrosInventario()
{
    var txtFechaInicio = obtenerFechaInicio($("#date_inicial_transacciones").val());
    var txtFechaCorte = obtenerFechaCorte($("#date_corte_transacciones").val());
    var chcAlmacen = obtenerAlmacen($("#select_almacenes_transacciones").val());
    var txtReferencia = obtenerReferencia($("#txt_referencia_transacciones").val());
    var txtPlu = obtenerPlu($("#txt_plu_transacciones").val());
    var chcTalla = obtenerTipoDocumento($("#select_tallas_transacciones").val());
    var chcColor = obtenerTipoDocumento($("#select_colores_transacciones").val());
    var chcLinea = obtenerTipoDocumento($("#select_lineas_transacciones").val());
    var chcCategoria = obtenerTipoDocumento($("#select_categorias_transacciones").val());
    var chcSubcategoria = obtenerTipoDocumento($("#select_subcategorias_transacciones").val());
    var chcMarca = obtenerTipoDocumento($("#select_marcas_transacciones").val());
    var chcSegmento = obtenerTipoDocumento($("#select_segmentos_transacciones").val());
    var chcSector = obtenerTipoDocumento($("#select_sectores_transacciones").val());
    var chcColeccion = obtenerTipoDocumento($("#select_colecciones_transacciones").val());
    var chcClasificacion = obtenerTipoDocumento($("#select_clasificaciones_transacciones").val());
    var chcOrigen = obtenerTipoDocumento($("#select_almacenes_origen_transacciones").val());
    var chcDestino = obtenerTipoDocumento($("#select_almacenes_destino_transacciones").val());
    var chcConcepto = obtenerTipoDocumento($("#select_conceptos_transacciones").val());
    var txtBarra = obtenerBarra($("#txt_barra_transacciones").val());
    var txtDocumento = obtenerDocumento($("#txt_documento_transacciones").val());
    var chcNit = obtenerDocReferencia($("#select_nit_transacciones").val());
    var txtDocReferencia = obtenerDocReferencia($("#txt_documentoref_transacciones").val());
    var chcEstadoKardex = obtenerEstadoKardex($("#select_estadokardex_transacciones").val());
    var txtDescReferencia = obtenerReferencia($("#txt_descreferencia_transacciones").val());
    var filtros = new Array(txtFechaInicio, txtFechaCorte, chcAlmacen, txtReferencia, txtPlu, chcTalla, chcColor, chcLinea, chcCategoria, chcSubcategoria, chcMarca, chcSegmento, chcSector, chcColeccion, chcClasificacion, chcOrigen, chcDestino, chcConcepto, txtBarra, txtDocumento, chcNit, txtDocReferencia, chcEstadoKardex, txtDescReferencia);
    return filtros;
}
var longitud_campos = 0;
var total_cantidad = 0;
function obtenerCamposInventario()
{
    var posicion = 0;
    var checkbox_group = new Array();
    if (jQuery("input[name=checkbox-h-7a]").is(":checked")) {
        checkbox_group.push("c_linea");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7d]")) {
        checkbox_group.push("c_almacen");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7e]").is(":checked")) {
        checkbox_group.push("c_referencia");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7f]").is(":checked")) {
        checkbox_group.push("d_referencia");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7g]").is(":checked")) {
        checkbox_group.push("c_barra");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7h]").is(":checked")) {
        checkbox_group.push("c_plu");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7i]").is(":checked")) {
        checkbox_group.push("c_talla");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7j]").is(":checked")) {
        checkbox_group.push("c_color_proveedor");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7k]").is(":checked")) {
        checkbox_group.push("c_proveedor");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7l]")) {
        checkbox_group.push("cod_trasl");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7m]").is(":checked")) {
        checkbox_group.push("nit");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7n]")) {
        checkbox_group.push("documento");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7o]").is(":checked")) {
        checkbox_group.push("f_trx");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7p]").is(":checked")) {
        checkbox_group.push("origen");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7q]").is(":checked")) {
        checkbox_group.push("destino");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7r]").is(":checked")) {
        checkbox_group.push("nit_movto");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7s]").is(":checked")) {
        checkbox_group.push("cs_factura");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7t]").is(":checked")) {
        checkbox_group.push("c_clasificacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7u]").is(":checked")) {
        checkbox_group.push("c_categoria");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7v]").is(":checked")) {
        checkbox_group.push("c_subcategoria");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7w]").is(":checked")) {
        checkbox_group.push("c_segmento");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7x]").is(":checked")) {
        checkbox_group.push("c_sector");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7y]").is(":checked")) {
        checkbox_group.push("c_marca");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7z]").is(":checked")) {
        checkbox_group.push("c_coleccion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7aa]").is(":checked")) {
        checkbox_group.push("presentacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ab]").is(":checked")) {
        checkbox_group.push("ubicacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ac]").is(":checked")) {
        checkbox_group.push("f_creacion");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ad]").is(":checked")) {
        checkbox_group.push("c_grupo");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ae]").is(":checked")) {
        checkbox_group.push("c_ciudad");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7af]").is(":checked")) {
        checkbox_group.push("c_unidad_medida");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ag]").is(":checked")) {
        checkbox_group.push("doc_kardex_referencia");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ah]").is(":checked")) {
        checkbox_group.push("observacion_detalle");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7ai]")) {
        checkbox_group.push("st_kardex");
        posicion++;
    }
    if (jQuery("input[name=checkbox-h-7aj]")) {
        checkbox_group.push("cant_trx");
        posicion++;
        total_cantidad = posicion;
    }
    if (jQuery("input[name=checkbox-h-7ak]").is(":checked")) {
        checkbox_group.push("costot");
        posicion++;
    }
    longitud_campos = checkbox_group.length;
    return checkbox_group;
}
function getTableInventario()
{
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var camposInventario = obtenerCamposInventario();
    var filtrosInventario = obtenerFiltrosInventario();
    $("#spn_nummaxperminv").html(getMaxRegs(username, userpass));
    $("#tbl_transacciones").html("<thead style='background: #d0e841;'></thead><tbody><tr><td colspan='34'><h4 style='text-align:center; color:red;'>Consultando la información...</h4></td></tr></tbody>");
    $.ajax({
        data: {peticion: 'get_data', campos: camposInventario, filtros: filtrosInventario},
        url: urlInformeTransaccionesMobile,
        cache: false,
        username: username,
        password: userpass,
        success: function(values) {
            values = $.trim(values);
            var elementos_division = values.split("!");
            var total_servidor = elementos_division[0];
            var valores_tabla = elementos_division[1];
            var filas_tabla = valores_tabla.split("^");
            var tabla = '';
            if (filas_tabla.length > 1) {
                var columnas_tabla = new Array();
                for (var i = 0; i < filas_tabla.length; i++) {
                    columnas_tabla[i] = $.trim(filas_tabla[i]).split("|");
                }
                for (var i = 0; i < filas_tabla[i].length; i++) {
                    tabla += "<tr><td>" + (i + 1) + "</td>";
                    for (var j = 0; j < (columnas_tabla[i].length - 3); j++) {
                        tabla += "<td>" + columnas_tabla[i][j] + "</td>";
                    }
                    tabla += "</tr>";
                }
                for (var i = 0; i < 1; i++) {
                    tabla += "<tr style='color:white;background:black;border:none;'><td>Total</td>";
                    for (var j = 0; j < (columnas_tabla[i].length - 3); j++) {
                        if (j === (total_cantidad - 1)) {
                            tabla += "<td style='border:none;'>" + total_servidor + "</td>";
                        } else {
                            tabla += "<td style='border:none;'>&nbsp;</td>";
                        }
                    }
                    tabla += "</tr>";
                }
                $("#tbl_transacciones thead").html(cabezaInv());
                $("#tbl_transacciones tbody").html(tabla);
            } else {
                $("#tbl_transacciones").html("<thead style='background: #d0e841;'></thead><tbody><tr><td colspan='34'><h4 style='text-align:center; color:red;'>La busqueda no arroja resultados...</h4></td></tr></tbody>");
            }
        }
    });
}
function cabezaInv()
{
    var header = '<tr style="font-weight:bold"><td>Registro</td>';
    if (jQuery("input[name=checkbox-h-7a]").is(":checked")) {
        header += "<td>Linea</td>";
    }
    if (jQuery("input[name=checkbox-h-7d]")) {
        header += "<td>Almacen</td>";
    }
    if (jQuery("input[name=checkbox-h-7e]").is(":checked")) {
        header += "<td>Referencia</td>";
    }
    if (jQuery("input[name=checkbox-h-7f]").is(":checked")) {
        header += "<td>Descripcion</td>";
    }
    if (jQuery("input[name=checkbox-h-7g]").is(":checked")) {
        header += "<td>Barra</td>";
    }
    if (jQuery("input[name=checkbox-h-7h]").is(":checked")) {
        header += "<td>Plu</td>";
    }
    if (jQuery("input[name=checkbox-h-7i]").is(":checked")) {
        header += "<td>Talla</td>";
    }
    if (jQuery("input[name=checkbox-h-7j]").is(":checked")) {
        header += "<td>Color</td>";
    }
    if (jQuery("input[name=checkbox-h-7k]").is(":checked")) {
        header += "<td>Proveedor</td>";
    }
    if (jQuery("input[name=checkbox-h-7l]")) {
        header += "<td>Concepto</td>";
    }
    if (jQuery("input[name=checkbox-h-7m]").is(":checked")) {
        header += "<td>Nit Proveedor</td>";
    }
    if (jQuery("input[name=checkbox-h-7n]")) {
        header += "<td>Nro Doc</td>";
    }
    if (jQuery("input[name=checkbox-h-7o]").is(":checked")) {
        header += "<td>Fecha Doc</td>";
    }
    if (jQuery("input[name=checkbox-h-7p]").is(":checked")) {
        header += "<td>Alm Origen</td>";
    }
    if (jQuery("input[name=checkbox-h-7q]").is(":checked")) {
        header += "<td>Alm Destino</td>";
    }
    if (jQuery("input[name=checkbox-h-7r]").is(":checked")) {
        header += "<td>Nit Movimiento</td>";
    }
    if (jQuery("input[name=checkbox-h-7s]").is(":checked")) {
        header += "<td>Documento Prov</td>";
    }
    if (jQuery("input[name=checkbox-h-7t]").is(":checked")) {
        header += "<td>Clasificacion</td>";
    }
    if (jQuery("input[name=checkbox-h-7u]").is(":checked")) {
        header += "<td>Categoria</td>";
    }
    if (jQuery("input[name=checkbox-h-7v]").is(":checked")) {
        header += "<td>SubCategoria</td>";
    }
    if (jQuery("input[name=checkbox-h-7w]").is(":checked")) {
        header += "<td>Segmento</td>";
    }
    if (jQuery("input[name=checkbox-h-7x]").is(":checked")) {
        header += "<td>Sector</td>";
    }
    if (jQuery("input[name=checkbox-h-7y]").is(":checked")) {
        header += "<td>Marca</td>";
    }
    if (jQuery("input[name=checkbox-h-7z]").is(":checked")) {
        header += "<td>Coleccion</td>";
    }
    if (jQuery("input[name=checkbox-h-7aa]").is(":checked")) {
        header += "<td>Presentacion</td>";
    }
    if (jQuery("input[name=checkbox-h-7ab]").is(":checked")) {
        header += "<td>Ubicacion</td>";
    }
    if (jQuery("input[name=checkbox-h-7ac]").is(":checked")) {
        header += "<td>Fecha Creacion</td>";
    }
    if (jQuery("input[name=checkbox-h-7ad]").is(":checked")) {
        header += "<td>Grupo Almacen</td>";
    }
    if (jQuery("input[name=checkbox-h-7ae]").is(":checked")) {
        header += "<td>Ciudad</td>";
    }
    if (jQuery("input[name=checkbox-h-7af]").is(":checked")) {
        header += "<td>Unidad de medida</td>";
    }
    if (jQuery("input[name=checkbox-h-7ag]").is(":checked")) {
        header += "<td>Nro Doc Referencia</td>";
    }
    if (jQuery("input[name=checkbox-h-7ah]").is(":checked")) {
        header += "<td>Observación al item</td>";
    }
    if (jQuery("input[name=checkbox-h-7ai]")) {
        header += "<td>Estado</td>";
    }
    if (jQuery("input[name=checkbox-h-7aj]")) {
        header += "<td>Cantidad</td>";
    }
    if (jQuery("input[name=checkbox-h-7ak]").is(":checked")) {
        header += "<td>Costo</td>";
    }
    header += '</tr>';
    return header;
}

function getMaxDiasXQueryInv(usuario, password)
{
    var id_query = "busqueda_maxdiasxquery";
    var sql = "SELECT valor FROM m_parametros_portal WHERE nombre='NUM_MAXIMO_DE_RANGO_DE_DIAS_FECHA_POR_CONSULTA' AND c_compania=" + getAlmxUsrInv(usuario, password) + " AND sw_activo=1";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['valor'];
    return res;
}
function getMaxRegsInv(usuario, password)
{
    var id_query = "busqueda_nummaxreg";
    var sql = "SELECT valor FROM m_parametros_portal WHERE c_compania=" + getAlmxUsrInv(usuario, password) + " AND nombre='NUM_MAXIMO_DE_REGISTROS_POR_CONSULTA'";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['valor'];
    return res;
}
function getAlmxUsrInv(usuario, password)
{
    var id_query = "busqueda_almxusr";
    var sql = "SELECT c_compania,cod_alm,sw_operacion_multiple_comp FROM m_usuarios WHERE c_usuario = '" + usuario + "'";
    xmlQueryDB(sql, id_query, 1, false, ruta, usuario, password);
    var res = xmlGetRow(id_query, 0, 0)['c_compania'];
    return res;
}
function loadSelectsTransacciones()
{
    loadAlmacenesTransacciones();
    loadTallasTransacciones();
    loadColoresTransacciones();
    loadLineasTransacciones();
    loadCategoriasTransacciones();
    loadSubcategoriasTransacciones();
    loadMarcasTransacciones();
    loadSegmentosTransacciones();
    loadSectoresTransacciones();
    loadColeccionesTransacciones();
    loadClasificacionesTransacciones();
    loadAlmacenesOrigenTransacciones();
    loadAlmacenesDestinoTransacciones();
    loadConceptosTransacciones();
    loadNitTransacciones();
}

function traerItemsTransacciones(item) {
    return item;
}

function loadAlmacenesTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'almacenes_transacciones', compania: compania},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_almacenes_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colAlmTransacciones = values;
                objAlmTransacciones = JSON.parse(colAlmTransacciones);
                if (objAlmTransacciones === "") {
                    $("#select_almacenes_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_almacenes_transacciones").html("");
                    $("#select_almacenes_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objAlmTransacciones.length; i++) {
                        codAlmTransacciones[i] = objAlmTransacciones[i][punteros[0]];
                        descAlmTransacciones[i] = objAlmTransacciones[i][punteros[1]];
                        $("#select_almacenes_transacciones").append("<option value='" + codAlmTransacciones[i] + "'>" + "(" + codAlmTransacciones[i] + ") " + descAlmTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadConceptosTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'conceptos_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_conceptos_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colConceptosTransacciones = values;
                objConceptosTransacciones = JSON.parse(colConceptosTransacciones);
                if (objConceptosTransacciones === "") {
                    $("#select_conceptos_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_conceptos_transacciones").html("");
                    $("#select_conceptos_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objConceptosTransacciones.length; i++) {
                        codConceptosTransacciones[i] = objConceptosTransacciones[i][punteros[0]];
                        descConceptosTransacciones[i] = objConceptosTransacciones[i][punteros[1]];
                        $("#select_conceptos_transacciones").append("<option value='" + codConceptosTransacciones[i] + "'>" + "(" + codConceptosTransacciones[i] + ") " + descConceptosTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadNitTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'nit_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_tallas_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colNitTransacciones = values;
                objNitTransacciones = JSON.parse(colNitTransacciones);
                if (objNitTransacciones === "") {
                    $("#select_nit_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_nit_transacciones").html("");
                    $("#select_nit_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objNitTransacciones.length; i++) {
                        codNitTransacciones[i] = objNitTransacciones[i][punteros[0]];
                        descNitTransacciones[i] = objNitTransacciones[i][punteros[1]];
                        $("#select_nit_transacciones").append("<option value='" + codNitTransacciones[i] + "'>" + "(" + codNitTransacciones[i] + ") " + descNitTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function traerItemsTransacciones(item) {
    return item;
}
function loadTallasTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'tallas_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_tallas_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colTallasTransacciones = values;
                objTallasTransacciones = JSON.parse(colTallasTransacciones);
                if (objTallasTransacciones === "") {
                    $("#select_tallas_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_tallas_transacciones").html("");
                    $("#select_tallas_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objTallasTransacciones.length; i++) {
                        codTallasTransacciones[i] = objTallasTransacciones[i][punteros[0]];
                        descTallasTransacciones[i] = objTallasTransacciones[i][punteros[1]];
                        $("#select_tallas_transacciones").append("<option value='" + codTallasTransacciones[i] + "'>" + "(" + codTallasTransacciones[i] + ") " + descTallasTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadColoresTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'colores_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_colores_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colColoresTransacciones = values;
                objColoresTransacciones = JSON.parse(colColoresTransacciones);
                if (objColoresTransacciones === "") {
                    $("#select_colores_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_colores_transacciones").html("");
                    $("#select_colores_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objColoresTransacciones.length; i++) {
                        codColoresTransacciones[i] = objColoresTransacciones[i][punteros[0]];
                        descColoresTransacciones[i] = objColoresTransacciones[i][punteros[1]];
                        $("#select_colores_transacciones").append("<option value='" + codColoresTransacciones[i] + "'>" + "(" + codColoresTransacciones[i] + ") " + descColoresTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadLineasTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'lineas_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_lineas_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colLineasTransacciones = values;
                objLineasTransacciones = JSON.parse(colLineasTransacciones);
                if (objLineasTransacciones === "") {
                    $("#select_lineas_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_lineas_transacciones").html("");
                    $("#select_lineas_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objLineasTransacciones.length; i++) {
                        codLineasTransacciones[i] = objLineasTransacciones[i][punteros[0]];
                        descLineasTransacciones[i] = objLineasTransacciones[i][punteros[1]];
                        $("#select_lineas_transacciones").append("<option value='" + codLineasTransacciones[i] + "'>" + "(" + codLineasTransacciones[i] + ") " + descLineasTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadCategoriasTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'categorias_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_categorias_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colCategoriasTransacciones = values;
                objCategoriasTransacciones = JSON.parse(colCategoriasTransacciones);
                if (objCategoriasTransacciones === "") {
                    $("#select_categorias_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_categorias_transacciones").html("");
                    $("#select_categorias_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objCategoriasTransacciones.length; i++) {
                        codCategoriasTransacciones[i] = objCategoriasTransacciones[i][punteros[0]];
                        descCategoriasTransacciones[i] = objCategoriasTransacciones[i][punteros[1]];
                        $("#select_categorias_transacciones").append("<option value='" + codCategoriasTransacciones[i] + "'>" + "(" + codCategoriasTransacciones[i] + ") " + descCategoriasTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadSubcategoriasTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'subcategorias_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_subcategorias_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSubcategoriasTransacciones = values;
                objSubcategoriasTransacciones = JSON.parse(colSubcategoriasTransacciones);
                if (objSubcategoriasTransacciones === "") {
                    $("#select_subcategorias_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_subcategorias_transacciones").html("");
                    $("#select_subcategorias_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objSubcategoriasTransacciones.length; i++) {
                        codSubcategoriasTransacciones[i] = objSubcategoriasTransacciones[i][punteros[0]];
                        descSubcategoriasTransacciones[i] = objSubcategoriasTransacciones[i][punteros[1]];
                        $("#select_subcategorias_transacciones").append("<option value='" + codSubcategoriasTransacciones[i] + "'>" + "(" + codSubcategoriasTransacciones[i] + ") " + descSubcategoriasTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadMarcasTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'marcas_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_marcas_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colMarcasTransacciones = values;
                objMarcasTransacciones = JSON.parse(colMarcasTransacciones);
                if (objMarcasTransacciones === "") {
                    $("#select_marcas_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_marcas_transacciones").html("");
                    $("#select_marcas_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objMarcasTransacciones.length; i++) {
                        codMarcasTransacciones[i] = objMarcasTransacciones[i][punteros[0]];
                        descMarcasTransacciones[i] = objMarcasTransacciones[i][punteros[1]];
                        $("#select_marcas_transacciones").append("<option value='" + codMarcasTransacciones[i] + "'>" + "(" + codMarcasTransacciones[i] + ") " + descMarcasTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadSegmentosTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'segmentos_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_segmentos_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSegmentosTransacciones = values;
                objSegmentosTransacciones = JSON.parse(colSegmentosTransacciones);
                if (objSegmentosTransacciones === "") {
                    $("#select_segmentos_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_segmentos_transacciones").html("");
                    $("#select_segmentos_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objSegmentosTransacciones.length; i++) {
                        codSegmentosTransacciones[i] = objSegmentosTransacciones[i][punteros[0]];
                        descSegmentosTransacciones[i] = objSegmentosTransacciones[i][punteros[1]];
                        $("#select_segmentos_transacciones").append("<option value='" + codSegmentosTransacciones[i] + "'>" + "(" + codSegmentosTransacciones[i] + ") " + descSegmentosTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadSectoresTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'sectores_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_sectores_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colSectoresTransacciones = values;
                objSectoresTransacciones = JSON.parse(colSectoresTransacciones);
                if (objSectoresTransacciones === "") {
                    $("#select_sectores_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_sectores_transacciones").html("");
                    $("#select_sectores_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objSectoresTransacciones.length; i++) {
                        codSectoresTransacciones[i] = objSectoresTransacciones[i][punteros[0]];
                        descSectoresTransacciones[i] = objSectoresTransacciones[i][punteros[1]];
                        $("#select_sectores_transacciones").append("<option value='" + codSectoresTransacciones[i] + "'>" + "(" + codSectoresTransacciones[i] + ") " + descSectoresTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadColeccionesTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'colecciones_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_colecciones_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colColeccionesTransacciones = values;
                objColeccionesTransacciones = JSON.parse(colColeccionesTransacciones);
                if (objColeccionesTransacciones === "") {
                    $("#select_colecciones_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_colecciones_transacciones").html("");
                    $("#select_colecciones_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objColeccionesTransacciones.length; i++) {
                        codColeccionesTransacciones[i] = objColeccionesTransacciones[i][punteros[0]];
                        descColeccionesTransacciones[i] = objColeccionesTransacciones[i][punteros[1]];
                        $("#select_colecciones_transacciones").append("<option value='" + codColeccionesTransacciones[i] + "'>" + "(" + codColeccionesTransacciones[i] + ") " + descColeccionesTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadClasificacionesTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'clasificaciones_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_clasificaciones_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colClasificacionesTransacciones = values;
                objClasificacionesTransacciones = JSON.parse(colClasificacionesTransacciones);
                if (objClasificacionesTransacciones === "") {
                    $("#select_clasificaciones_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_clasificaciones_transacciones").html("");
                    $("#select_clasificaciones_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objClasificacionesTransacciones.length; i++) {
                        codClasificacionesTransacciones[i] = objClasificacionesTransacciones[i][punteros[0]];
                        descClasificacionesTransacciones[i] = objClasificacionesTransacciones[i][punteros[1]];
                        $("#select_clasificaciones_transacciones").append("<option value='" + codClasificacionesTransacciones[i] + "'>" + "(" + codClasificacionesTransacciones[i] + ") " + descClasificacionesTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadAlmacenesOrigenTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'almacenes_origen_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_almacenes_origen_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colAlmOrigenTransacciones = values;
                objAlmOrigenTransacciones = JSON.parse(colAlmOrigenTransacciones);
                if (objAlmOrigenTransacciones === "") {
                    $("#select_almacenes_origen_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_almacenes_origen_transacciones").html("");
                    $("#select_almacenes_origen_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objAlmOrigenTransacciones.length; i++) {
                        codAlmOrigenTransacciones[i] = objAlmOrigenTransacciones[i][punteros[0]];
                        descAlmOrigenTransacciones[i] = objAlmOrigenTransacciones[i][punteros[1]];
                        $("#select_almacenes_origen_transacciones").append("<option value='" + codAlmOrigenTransacciones[i] + "'>" + "(" + codAlmOrigenTransacciones[i] + ") " + descAlmOrigenTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
}
function loadAlmacenesDestinoTransacciones()
{
    var punteros = new Array(0, 1);
    var urlInformeTransaccionesMobile = rutaPortalInventario;
    var onCache = false;
    $.ajax({
        data: {peticion: 'almacenes_destino_transacciones'},
        url: urlInformeTransaccionesMobile,
        cache: onCache,
        username: username,
        password: userpass,
        success: function(values) {
            if (values.indexOf("Fatal error") !== -1) {
                $("#select_almacenes_destino_transacciones").html("<option value='all'>Error al traer los datos...</center></option>");
            } else {
                colAlmDestinoTransacciones = values;
                objAlmDestinoTransacciones = JSON.parse(colAlmDestinoTransacciones);
                if (objAlmDestinoTransacciones === "") {
                    $("#select_almacenes_destino_transacciones").html("<option value='all'>No se recibieron los datos...</center></option>");
                } else {
                    $("#select_almacenes_destino_transacciones").html("");
                    $("#select_almacenes_destino_transacciones").append("<option value='all'>Todos</option>");
                    for (var i = 0; i < objAlmDestinoTransacciones.length; i++) {
                        codAlmDestinoTransacciones[i] = objAlmDestinoTransacciones[i][punteros[0]];
                        descAlmDestinoTransacciones[i] = objAlmDestinoTransacciones[i][punteros[1]];
                        $("#select_almacenes_destino_transacciones").append("<option value='" + codAlmDestinoTransacciones[i] + "'>" + "(" + codAlmDestinoTransacciones[i] + ") " + descAlmDestinoTransacciones[i] + "</option>");
                    }
                }
            }
        }
    });
} 