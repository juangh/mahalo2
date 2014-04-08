var username;
var userpass;
var ar_data = Array();
var DataQuery = Array();
var SQLStatus = 0;

function xmlQueryDB(Query, idQuery, QueryLocal, QueryPage, url, usuario, password) {
     if (!QueryLocal)
            var QueryLocal = 1;
        if (!QueryPage)
            var QueryPage = 'QueryDB.php';
        var segundos = seconsNumber();

     $.ajax({
        url: url + QueryPage + "?t=" + segundos + "&Query=" + escape(Query),
        username: username,
        password: userpass,
        async: false,
        success: function(a) {
            DataQuery[idQuery] = generarObjXml(a);
        },
        error: function(xhr) {
            alert("status : " + xhr.status);
            alert("response text : " + xhr.ResponseText);
        }
    });
    
}

/*function ClassAjax()
 {
 var obj;
 if (window.XMLHttpRequest) { // no es IE
 obj = new XMLHttpRequest();
 }
 else { // Es IE o no tiene el objeto
 try {
 obj = new ActiveXObject("Microsoft.XMLHTTP");
 }
 catch (e) {
 alert("El navegador utilizado no está soportado");
 }
 }
 juand = obj;
 alert("obj en class ajax: " + obj);
 
 return obj;
 }*/

function ClassAjax()
{
    
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
        //alert("obj en class ajax: " + xmlHttp.readyState);
    }
    catch (e) {       
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
            //alert("obj en class ajax: " + xmlHttp.readyState);
        }
        catch (e) { }
    }   
    //alert(xmlHttp);
    if (!xmlHttp) {
        alert("Error creating the XMLHttpRequest object.");
    } else {
        return xmlHttp;
    }    
}

function generarObjXml(text) 
{
    var xmlDoc;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(text);
    }
    return xmlDoc;
}

function xmlQueryDBAsincronico(Query, idQuery, QueryLocal, QueryPage, strFuncion) {
    //Se ejecuta la traida de datos asincronica y se enruta el proceso cuando se evalua la funcion a ejecutar despues de traer los datos.
    

    if (navigator.appName !== "Microsoft Internet Explorer") {
        try {
            if (!QueryLocal)
                var QueryLocal = 1;
            if (!QueryPage)
                var QueryPage = 'QueryDB.php';
            var segundos = seconsNumber();
            var path = getPathServerQuery(QueryLocal);

            if (path == false || path == undefined)
                return errorControladoAccessBd(idQuery);
            if ((path == "./" && c_control_autonomo == 1) || path == "http://" + GetServerSecondary() + "/prs/")
                Query = procesaQueryLocal(Query);
                ajax = ClassAjax();
                ajax.open("GET", path + QueryPage + "?t=" + segundos + "&Query=" + escape(Query), true);
                ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        DataQuery[idQuery] = xml_crea_object(); /* Crea el objeto XML - Esta funcion esta en xmlLoad.js */
                        DataQuery[idQuery].async = "true";
                        DataQuery[idQuery].loadXML(ajax.responseText);
                        eval(strFuncion + "();");
                    } else {
                        errorControladoAccessBd(idQuery);
                    }
                }
            };
            ajax.send("t=" + segundos + "&Query=" + escape(Query));
        } catch (e) {
            return false;
        }
    }
}


/*QueryLocal = 1 -->Accede al servidor, QueryLocal = 2 -->Accede al local*/
/*c_control_autonomo = 0 --> Entro por remoto, c_control_autonomo = 1 -->Entro por Local*/
function getPathServerQuery(QueryLocal) {
    
    
    var path = "./";
    if (QueryLocal == 2 && c_control_autonomo == 1)
        return path;

    if (QueryLocal == 1 && TestServerXMLHttpRq('http://' + WsRemoto + httppath)) {
        path = pathRetornoServidorQuery();
    } else {
        if (ValidaServer(GetServerSecondary(), 80)) {
            if (c_control_autonomo == 0) {
                path = "http://" + GetServerSecondary() + "/prs/";//entro por remoto
            }
        }
        else {
            return false;
        }
    }

    return path;
}

function pathRetornoServidorQuery() {
    

    
    var path = "./";
    if (c_control_autonomo == 1) {//entro por local
        if (PortRemoto == 443) {
            path = 'https://' + WsRemoto + httppath;
        } else {
            path = 'http://' + WsRemoto + httppath;
        }
    }
    return path;
}

function errorControladoAccessBd(idQuery)
{
    
    
    DataQuery[idQuery] = xml_crea_object(); /* Crea el objeto XML - Esta funcion esta en xmlLoad.js */
    DataQuery[idQuery].async = "false";
    var string = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<QUERY>';
    string += "\n<SELECT0>";
    string += "\n<SQLCA time=\"0\"></SQLCA> ";
    string += "\n<STATUS status=\"-746\" numrows=\"-746\"";
    string += " numcols=\"0\"";
    string += " errmsg=\"Error al acceder a base de datos-No hay conexion a servidor -746\"></STATUS>";
    string += "\n</SELECT0>";
    string += "\n</QUERY>";
    DataQuery[idQuery].loadXML(string);
    return false;
}

function errorControladoAccessBdExe(idExec, msg, num)
{
    

    
    if (!msg)
        var msg = "Error al acceder a base de datos-No hay conexion a servidor";
    if (!num)
        var num = -746;
    DataQuery[idExec] = xml_crea_object(); /* Crea el objeto XML - Esta funcion esta en xmlLoad.js */
    DataQuery[idExec].async = "false";
    var string = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<QUERY>';
    string += "\n<SQLCA time=\"0\"></SQLCA> ";
    string += "\n<STATUS status=\"" + num + "\" numrows=\"0\"";
    string += " numcols=\"0\"";
    string += " errmsg=\"" + msg + "\"></STATUS>";
    string += "\n</QUERY>";
    DataQuery[idExec].loadXML(string);
}

/* idQuery=texto identificador del Query Se utiliza como parametro en el xmlGetRow
 NumRow = # registro  */

function xmlGetRow(idQuery, NumRow, numSelect) {

    
    if (!DataQuery[idQuery])
        return false;
    if (!numSelect)
        numSelect = 0;

    var ar_row = Array();
    var NumRow = NumRow - 1;   /* al pedir el primer registro (1) para el XML es el registro cero (0) */
    SQLStatus = getXMLDataUnq(DataQuery[idQuery], "QUERY", 0, "STATUS", numSelect, "status");
    var NumRows = getXMLDataUnq(DataQuery[idQuery], "QUERY", 0, "STATUS", numSelect, "numrows");
    if (SQLStatus != 0 || NumRow > NumRows)
        return false;
    if (NumRow > 0)
        ar_row = xmlgetAttr(DataQuery[idQuery], "SELECT" + numSelect + ".row/" + NumRow);
    else
        ar_row = xmlgetAttr(DataQuery[idQuery], "SELECT" + numSelect + ".row");
    return ar_row;
}

function getStatusDB(idQuery, idx) {
    
    
    if (!idx)
        idx = 0;
    if (!DataQuery[idQuery])
        return false;
    var ar_row = ArrayAttribute(DataQuery[idQuery], "QUERY", "STATUS", idx);
    return ar_row;
}



function xmlExecuteDB(Query, idExec, QueryLocal, sw_asincronico) {
    
    
    /*try{			dOCUMENTADO POR wb */
    if (!QueryLocal)
        var QueryLocal = 1;
    var segundos = seconsNumber();
    if (!sw_asincronico)
        var sw_asincronico = false;
    if (QueryLocal == 1)
        var path = "http://" + GetServerSecondary() + "/prs/";
    else
        var path = "./";
    var ajax = OpenAjaxDir(path + "ExecuteDB.php", idExec, sw_asincronico); /* Aqui abajo controle en caso de no tener permisos para ajax */
    //ajax.open("POST", path+"ExecuteDB.php", false);
    if (!ajax)
        return false;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                DataQuery[idExec] = xml_crea_object(); /* Crea el objeto XML - Esta funcion esta en xmlLoad.js */
                DataQuery[idExec].async = "false";
                DataQuery[idExec].loadXML(ajax.responseText);
            } else
                errorControladoAccessBdExe(idExec, 'error servidor', ajax.status);
        }
    };
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send("t=" + segundos + "&Query=" + escape(Query) + "");

    /*} 
     catch (e) { 
     errorControladoAccessBdExe(idExec); 
     } documentado por WB */
}


function xmlExecuteDBInstalacionAutonomo(Query, idExec, QueryLocal) {
    
    
    try {
        if (!QueryLocal)
            var QueryLocal = 1;
        var segundos = seconsNumber();
        if (QueryLocal == 1)
            var path = "http://" + GetServerSecondary() + "/prs/";
        else
            var path = "./";
        var ajax = OpenAjaxDir(path + "ExecuteDBInstall.php", idExec); /* Aqui abajo controle en caso de no tener permisos para ajax */
        //ajax.open("POST", path+"ExecuteDB.php", false);
        if (!ajax)
            return false;
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    DataQuery[idExec] = xml_crea_object(); /* Crea el objeto XML - Esta funcion esta en xmlLoad.js */
                    DataQuery[idExec].async = "false";
                    DataQuery[idExec].loadXML(ajax.responseText);
                } else
                    errorControladoAccessBdExe(idExec, 'error servidor', ajax.status);

            }
        };
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send("t=" + segundos + "&Query=" + escape(Query) + "");

    }
    catch (e) {
        errorControladoAccessBdExe(idExec);
    }
}

function OpenAjaxDir(ruta, idExec, sw_asincronico) {//5Dic john
    
    
    var ajax = ClassAjax();
    if (!sw_asincronico)
        var sw_asincronico = false;
    try {
        ajax.open("POST", ruta, sw_asincronico); /* try solo para controlar este evento */
        return ajax;
    }
    catch (e) {
        Message("Problema:" + e.message + " Ruta:" + ruta);
        errorControladoAccessBdExe(idExec, e.message + " Ruta:" + ruta, -746);
        return false;
    }

}



function getStatusDBexe(idQuery) {
    
    
    if (!DataQuery[idQuery])
        return false;
    return DataQuery[idQuery];
}

function StatusError2Messages(idQuery, ar_status) {
    
    
    if (!ar_status)
        var ar_status = getStatusDB(idQuery);
    if (!ar_status)
        return;
    LoadPOSMsn("MSG95", 1, ar_status['status'], ar_status['errmsg']);


}

function procesaQueryLocal(Query) {
    
    
    var sub;
    var r = Query;
    var lo = Query.indexOf("FIRST");
    if (lo >= 0)
    {
        var ar_sql = Query.split(";");
        var nuevoSQL = '';
        for (var ui = 0; ui < ar_sql.length; ui++)
        {
            var Q = ar_sql[ui] + ';';
            var i = Q.indexOf("FIRST");
            var ar_datos = Q.substring(i, i + 20).split(' ');
            var y = Q.indexOf(ar_datos[2]);
            var z = Q.indexOf(';');
            sub = Q.substring(0, i) + Q.substring(y, z) + ' LIMIT 0,' + ar_datos[1] + Q.substring(z);
            nuevoSQL = nuevoSQL + sub;
        }
        Query = nuevoSQL;
        if (Query.indexOf("NVL(") >= 0)
            Query = Query.replace('NVL(', 'IFNULL(');
    }
    var ModOrder = Query.indexOf(".order");
    if (ModOrder >= 0)
        Query = Query.replace('.order', '.`order`');

    var ModMatches = Query.indexOf("MATCHES");
    if (ModMatches >= 0) {
        Query = Query.replace(/MATCHES/g, 'LIKE');
        var part_1 = Query.substr(0, ModMatches - 1);
        var part_2 = Query.substr(ModMatches);
        part_2 = part_2.replace(/\*/g, '%');
        return (part_1 + ' ' + part_2);
    }
    //WStatus('Q:'+Query+' SW:'+sw_modo_local)
    return Query;
}


function validarTablaAutonomo() { //john 12 Dic

    
    
    var str_query = ' select * from mv_transacciones_log ';
    xmlExecuteDB(str_query, "valida_tabla", 1);
    var ar_status = getStatusDB("valida_tabla");
    if (ar_status["status"] == 0) {
        return true;

    }
    else {
        var query = "CREATE TABLE IF NOT EXISTS mv_transacciones_log (" +
                "c_consecutivo int(11) NOT NULL auto_increment," +
                "Concepto_trans varchar(50) collate utf8_spanish_ci NOT NULL," +
                "f_ingreso datetime NOT NULL," +
                "us_ingreso varchar(30) collate utf8_spanish_ci NOT NULL," +
                "c_estado varchar(30) collate utf8_spanish_ci NOT NULL," +
                "f_envio datetime NOT NULL," +
                "us_envio varchar(30) collate utf8_spanish_ci NOT NULL," +
                "xml longtext collate utf8_spanish_ci NOT NULL," +
                "key_valida varchar(20) collate utf8_spanish_ci NOT NULL," +
                "cs_factura double NOT NULL," +
                "cs_devoluciones double NOT NULL," +
                "cs_recibo double NOT NULL," +
                "cs_close_caja double NOT NULL," +
                "c_compania double NOT NULL," +
                "c_almacen double NOT NULL," +
                "caja double NOT NULL," +
                "c_station smallint(6) NOT NULL default '0'," +
                "pedido decimal(14,0) NOT NULL default '0'," +
                "c_transacction varchar(100) collate utf8_spanish_ci default NULL," +
                "st_transacction char(1) collate utf8_spanish_ci default 'P'," +
                "neto_total varchar(100) collate utf8_spanish_ci default '0'," +
                "PRIMARY KEY  (c_consecutivo)," +
                "KEY idx_c_estado_st_transacction_log (c_estado,st_transacction)" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;";

        xmlExecuteDB(query, "valida_tabla1", 1);

        var ar_status = getStatusDB("valida_tabla1");
        if (ar_status["status"] == 0) {
            return true;
        }

    }
    return false;
}