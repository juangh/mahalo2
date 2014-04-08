function traerValoresGestionUsuario()
{
    var id_query = "busqueda_gestion";
    var sql = "SELECT FIRST 1 pp.sw_factura_manual, pp.mac, pp.puerto, pp.c_compania, pp.c_almacen, pp.caja FROM m_puntos_pago pp INNER JOIN m_posuser us ON (pp.c_compania = us.c_compania AND pp.c_almacen = us.c_almacen) WHERE us.usuario= '" + username + "'";
    xmlQueryDB(sql, id_query, 1, false, ruta);
    outer[0] = xmlGetRow("busqueda_gestion", 0, 0)['puerto'];
    outer[1] = xmlGetRow("busqueda_gestion", 0, 0)['mac'];
    outer[2] = xmlGetRow("busqueda_gestion", 0, 0)['sw_factura_manual'];
    if (outer[2] === "1") {$("#flip-max").val('on').slider('refresh');} 
    else {$("#flip-max").val('off').slider('refresh');}
    $("#txtMac").val(outer[1]);
    $("#chcPuerto").val(outer[0]).selectmenu('refresh');
    outer[3] = xmlGetRow("busqueda_gestion", 0, 0)['c_compania'];
    outer[4] = xmlGetRow("busqueda_gestion", 0, 0)['c_almacen'];
    outer[5] = xmlGetRow("busqueda_gestion", 0, 0)['caja'];
    return outer;
}

function modificarValoresGestionUsuario()
{
    var ar_key = new Array();
    var ar_factura_manual = new Array();
    var strXml = '';
    ar_key["c_compania"] = outer[3];
    ar_key["c_almacen"] = outer[4];
    ar_key["caja"] = outer[5];
    if (estado === "on") {factura = 1;} else {factura = 0;}
    if (outer[2] !== factura) {ar_factura_manual["sw_factura_manual"] = factura;} 
    else {ar_factura_manual["sw_factura_manual"] = outer[2];}
    if (outer[1] !== $("#txtMac").text().toString()) {ar_factura_manual["mac"] = $("#txtMac").val().toString();} 
    else {ar_factura_manual["mac"] = outer[1];}
    if (outer[0] !== $("#chcPuerto").val().toString()) {ar_factura_manual["puerto"] = $("#chcPuerto").val().toString();} 
    else {ar_factura_manual["puerto"] = outer[0];}
    CrearUpdate("m_puntos_pago", ar_factura_manual, ar_key, "UPDATE");
    strXml = ArmarXml(strUpdate, strControl, str_Delete);
    if (!strXml)
        return false;
    return strXml;
}

function guardarBotonConf()
{
    var strXml = modificarValoresGestionUsuario();
    if (!strXml) { return false; }
    var obj = ExecuteClientSoap(strXml);
    if (ValidaObjStatusTransaction(obj) === false) {
        outer[3] = xmlGetRow("busqueda_gestion", 0, 0)['c_compania'];
        outer[4] = xmlGetRow("busqueda_gestion", 0, 0)['c_almacen'];
        outer[5] = xmlGetRow("busqueda_gestion", 0, 0)['caja'];
        $("#flip-max").slider("refresh");
        $("#chcPuerto").selectmenu("refresh");
        alert('error al realizar la operación');
    } else {
        alert('registro actualizado');
        traerValoresGestionUsuario();
    }
}