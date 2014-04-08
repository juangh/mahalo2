function Trim(str) {
    str = str.replace(/^\s*|\s*$/g, "");
    return str;
}


function IsNumeric(sText)
{
    var ValidChars = "+-0123456789.";
    var IsNumber = true;
    var Char;
    if (sText.length < 1)
        return false;
    for (i = 0; i < sText.length; i++)
    {
        Char = sText.charAt(i);

        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
            break;
        }
    }
    return IsNumber;

}

/*Esta funcion se encarga de crear toda la estructra de tablas y datos para el encabezado y retornarla*/
function CreaInsertCabeza(tabname, ar_datos, sw_createTable, cs_logCreate, ignoreDuplicado) {
    /*tabname:Nombre de la tabla sobre la cual se desea insertar.
     * ar_values:Vector con el nombre de la columna y el values a ser insertado.
     */


    if (!ignoreDuplicado)
        ignoreDuplicado = 0;
    if (!sw_createTable)
        sw_createTable = 0;
    if (!cs_logCreate)
        cs_logCreate = 0;

    if (!ar_tabCabeza[tabname])
        ar_tabCabeza[tabname] = 1;
    else {
        if (sw_createTable || sw_createTable || cs_logCreate) {
            Message("Ya creo encabezado de:" + tabname + " e intenta crearlo de nuevo ");
        }
        CreaInsertDetalle(tabname, tabname, ar_datos);
        return true;
    }

    strCabeza = '<ENCABEZADO tabname="' + Trim(tabname) + '" nrows="' + 1 + '" ignoreDuplicado="' + ignoreDuplicado + '"  ncols="' + 1 + '" sw_createTable="' + sw_createTable + '" cs_logCreate="' + cs_logCreate + "\">\n";
    for (var i in ar_datos) {
        if (NoItem(i, ar_datos))
            continue;
        if (i == 'swEdit')
            continue;
        var tipo = getTipoDato(ar_datos[i], i);
        strCabeza += '<COL colname="' + i + '" value="' + ar_datos[i] + '" tipo="' + tipo + "\"></COL>\n";
        ar_cabeza[tabname] = strCabeza;
    }

}

/*Esta funcion se encarga de crear toda la estructra de tablas y datos para el detalle y retornarla*/
function CreaInsertDetalle(tabnamecabeza, tabname, ar_datos) {
    /*tabname:Nombre de la tabla sobre la cual se desea insertar.
     * tabnamecabeza:Nombre de la tabla padre sobre la cual se va a insertar el detalle.
     * ar_values:Vector con el nombre de la columna y el values a ser insertado.
     * tiptable:Tipo de tabla, ej: ENCABEZADO, DETALLE, UPDATE*/
    if (!ar_tabCabeza[tabnamecabeza]) {
        CreaInsertCabeza(tabname, ar_datos);
        return true;
    }
    var strDetalle = "";

    if (!ar_detalle[tabnamecabeza])
        ar_detalle[tabnamecabeza] = new Array();

    if (idxDetail[tabnamecabeza] == undefined) {
        idxDetail[tabnamecabeza] = 0;
    } else {
        idxDetail[tabnamecabeza]++;
    }

    if (tabnamecabeza != NameCabeza) {
        NameCabeza = tabnamecabeza;
        NameDetalle = "";
    }

    if (Trim(tabname) != Trim(NameDetalle)) {
        if (NameDetalle != "") {
            strDetalle = "</DETALLE>";
        }
        NameDetalle = tabname;
        strDetalle += "<DETALLE tabname=\"" + Trim(tabname) + "\" nrows=\"" + 1 + "\" ncols=\"" + 1 + "\">\n";
    }
    strDetalle += "<ROW>\n";
    for (var i in ar_datos) {
        if (NoItem(i, ar_datos))
            continue;
        if (i == 'swEdit')
            continue;
        var tipo = getTipoDato(ar_datos[i], i);
        strDetalle += "<COL colname=\"" + i + "\" value=\"" + ar_datos[i] + "\" tipo=\"" + tipo + "\"></COL>\n";

    }
    strDetalle += "</ROW>\n";
    var local_Z = idxDetail[tabnamecabeza];
    ar_detalle[tabnamecabeza][local_Z] = strDetalle;
}

/*Esta funcion se encarga de crear toda la estructura de UPDATE por tabla y retornarla*/
function CrearUpdate(tabname, ar_values, ar_llave, tiptable) {
    /*tabname:Nombre de la tabla sobre la cual se realizara el Update*/
    var whereSetRemoto = '';
    if (!tiptable || tiptable == "")
        tiptable = "UPDATE";
    if (tiptable == "UPDATE") {
        strUpdate += "\n<UPDATE tabname=\"" + Trim(tabname) + "\">\n";
        var swControlWConsecutivos = 0;
        for (var x in ar_values) {
            if (NoItem(x, ar_values))
                continue;
            if (x == 'swEdit')
                continue;
            var tipo = getTipoDato(ar_values[x], x);
            strUpdate += "<COL colname=\"" + x + "\" value=\"" + ar_values[x] + "\" tipo=\"" + tipo + "\"></COL>\n";
            if (tabname == 'm_puntos_pago' || tabname == 'm_order_stations') {
                var signo = signoActualizaConsecWhere();
                whereSetRemoto += "<WHERE colname=\"ABS(" + x + ")\" value=\"ABS(" + ar_values[x] + ")\" signo=\"" + signo + "\" tipo=\"" + tipo + "\"></WHERE>\n";
                if (x == 'cs_factura' || x == 'cs_devoluciones' || x == 'cs_recibo' || x == 'cs_close_caja' || x == 'cs_pedido')
                    swControlWConsecutivos = 1;
            }

        }
        for (var y in ar_llave) {
            if (NoItem(y, ar_llave))
                continue;
            if (y == 'swEdit')
                continue;
            var tipo = getTipoDato(ar_llave[y], y);
            strUpdate += "<WHERE colname=\"" + y + "\" value =\"" + ar_llave[y] + "\" signo=\"=\" tipo=\"" + tipo + "\"></WHERE>\n";

        }
        if ((tabname == 'm_puntos_pago' || tabname == 'm_order_stations') && swControlWConsecutivos == 1)
            strUpdate += whereSetRemoto;
        strUpdate += "</UPDATE>";
    }
}


function getTipoDato(valor, campo) {
    var tipo = 'S';
    if (IsNumeric(valor))
        tipo = "N";
    else
        tipo = "S";
    valor = valor + '';

    if (campo == 'TEXT')
        tipo = "N";

    if (valor.indexOf("CURRVAL") >= 0 || valor.indexOf("NEXTVAL") >= 0)
        tipo = "N";
    if (tipo == "N") {
        if (ar_FieldConf[campo])
            var temp = ar_FieldConf[campo]['type'];
        if (temp && temp != "") {
            if (temp == "A" || temp == "D" || temp == "S") {
                temp = "S";
                tipo = temp;
            }
        }
    }
    return tipo;
}

/*Esta funcion se enccarga de crear toda la estructura de DELETE por tabla y retornarla*/
function CreaDelete(tabname, ar_llave) {

    str_Delete += "\n<DELETE tabname=\"" + Trim(tabname) + "\">\n";
    for (var t in ar_llave) {
        if (NoItem(t, ar_llave))
            continue;
        if (t == 'swEdit')
            continue;
        str_Delete += "<WHERE colname= \"" + t + "\" value =\"" + ar_llave[t] + "\" signo=\"=\"></WHERE>\n";

    }
    str_Delete += "</DELETE>";
}

/*Esta funcion se encarga de crear toda la estructura de control por tabla y retornarla */
function CreaControl(tabname, d_control, colname, type, valor, ar_llave) {

    strControl = "\n<CONTROL tabname=\"" + Trim(tabname) + "\" d_control=\"" + d_control + "\"" +
            " colname=\"" + colname + "\" type=\"" + type + "\" valor=\"" + valor + "\">";
    for (var j in ar_llave) {
        if (NoItem(j, ar_llave))
            continue;
        if (j == 'swEdit')
            continue;
        strControl += "<KEY colname=\"" + j + "\" value=\"" + ar_llave[j] + "\"></KEY>";

    }
    strControl += "</CONTROL>";
}

/*Esta funcion se encarga de armar la cadena XML y retornarla*/
function ArmarXml(strUpdate, strControl, str_Delete)
{
    if (!str_Delete)
        str_Delete = '';

    var strXml = '<QUERY>';
    strXml += str_Delete;

    var numDetalle = 0;
    for (var t in ar_cabeza) {
        if (NoItem(t, ar_cabeza))
            continue;
        strXml += ar_cabeza[t];
        for (var h in ar_detalle[t]) {
            if (NoItem(h, ar_detalle[t]))
                continue;
            numDetalle++;
            strXml += ar_detalle[t][h];
            /*strXml += '</DETALLE>';*/
        }
        if (numDetalle > 0) {
            strXml += '</DETALLE></ENCABEZADO>';
            numDetalle = 0;
        } else {
            strXml += '</ENCABEZADO>';
            numDetalle = 0;
        }

    }
    strXml = strXml.replace("</ROW>\n<DETALLE", "</ROW></DETALLE>\n<DETALLE");
    strXml += strUpdate;
    strXml += strControl;
    strXml += '</QUERY>';

    /*se limpian las variables.*/
    LimpiaVariables();
    return strXml;
}

/*Esta funcion se encarga de recibir la cadena XML, realizar llamado a el cliente SOAP y 
 * recibir el XMl retornado*/
function ExecuteClientSoap(strXml) {
    try {
        var obj = SoapPeopleLocal(strXml);
        /*var obj = SoapPeople(strXml, "http://"+GetServerSecondary()+"/prs/client/ServerSOAP.php");*/
        return obj;
    }
    catch (e) {
        return false;
    }
}

function LimpiaVariables() {
    ar_cabeza = Array();
    ar_detalle = Array();
    ar_detalle_row = Array();
    ar_tabCabeza = Array();
    idxDetail = Array();

    NameCabeza = "";
    NameDetalle = "";
    strUpdate = "";
    strControl = "";
    str_Delete = "";
    z = 0;
}

function signoActualizaConsecWhere(tipo) {
    var signo = "";
    if (n_factura_manual > 0) {
        if (tipo)
            signo = "<>";
        else
            signo = "&lt;&gt;";
    }
    else {
        if (tipo)
            signo = "<=";
        else
            signo = "&lt;=";
    }
    return signo;
}

