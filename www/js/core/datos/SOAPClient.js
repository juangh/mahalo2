var Try = {these: function(funclist)
    {
        for (var a = 0, b = arguments.length; a < b; ++a)
        {
            try {
                return (arguments[a])()
            } catch (e) {
            }
        }
    }}

function ExecuteSoapTransaction(strXml) {

    var obj = SoapPeople(strXml);          /* Se envia el XML al servicio SOAP. */

    if (!obj)
        return false;

    if (ValidaObjStatusTransaction(obj))
        return true;

    return false;
}

function ExecuteSoapTransactionBack(strXml, idxTran) {

    var param = "xmlText=" + escape(strXml);

    Concurrent.Thread.create(pruebaPost, param, false, idxTran);

    return true;
}

function pruebaPost(param, url, idxTr) {

    if (!url) {
        /*var path =getPathServerQuery(1);*/
        var path = pathRetornoServidorQuery();
        if (sw_modo_local == 1) {
            ar_TransactionStatus[idxTr] = 3;
            ar_TransaccionError[idxTr] = "No se pudo traer path para transaccion"
            return false;
        }
        var url = path + '/ServerSOAPNOBloqued.php';
    }
    var req = Concurrent.Thread.Http.post(url, param);
    ar_TransaccionError[idxTr] = "Error Procesando Transaccion";
    if (req.readyState == 4) {
        if (req.status == 200) {

            var obj = LoadObjectXMLResponseTrnsaccInBack(req.responseText);

            if (!obj) {
                ar_TransaccionError[idxTr] = "Problemas al disparar el SOAP";
                ar_TransactionStatus[idxTr] = 3;
                return false;
            }
            var ar_status = xmlgetAttr(obj, "QUERY.STATUS");
            if (!ar_status) {
                ar_TransactionStatus[idxTr] = 3;
                ar_TransaccionError[idxTr] = "Error sin determinar, no armo status de la transaccion";
                return false;
            }

            var strcode = ar_status["errmsg"];
            var position = strcode.indexOf("SQLCODE=", 1);
            var sqlcode = strcode.substring(position + 8, (strcode.length - 1));

            if (ar_status["status"] == 0) {
                ar_TransaccionError[idxTr] = "Ok";
                ar_TransactionStatus[idxTr] = 2;
                return true;
            }

            ar_TransaccionError[idxTr] = "Error:" + sqlcode + " Strcode:" + strcode + " Sqlcode:" + sqlcode;
        }
        /* else LoadPOSMsn("MSG364", 1); Julio Gallego 20-04-2011 13:46*/
    }

    ar_TransactionStatus[idxTr] = 3;
    return false;
}

function LoadObjectXMLResponseTrnsaccInBack(xmlTextR) {

    if (!xmlTextR)
        return false;

    var obj = getXmlFromText(xmlTextR); /* Convierte un texto xml en un objeto */

    return obj; /* retorna objeto XML al sitio de llamado de la funcion */
}

function SoapPeople(xmlText, url) {
    if (!url) {
        var url = 'http://192.168.2.2/des_juan/ServerSOAP.php';
    }
    if (!validaQueryDato(xmlText))
        return false;

    /*WStatus("xml:"+xmlText)*/
    idxDetail = Array();
    ar_detalle = Array();

    //if(!valor)return false;
    var params = {xmlText: xmlText};

    var xmlText = LoadSOAPserver(url, params);

    /*WStatus("xml recibido:"+xmlText);*/
    if (!xmlText)
        return false;

    var obj = getXmlFromText(xmlText); /* Convierte un texto xml en un objeto */

    var txt = "<" + '?xml version="1.0" encoding="UTF-8"?> ';

    var robj = obj.getElementsByTagName("XmlReturn");

    if (robj.length < 1) {

        LoadPOSMsn("MSG310", 0, xmlText);

        return false;
    }


    txt += robj[0].childNodes[0].nodeValue; /* le saco al XML los datos devueltos por la funcion en el servidor */

    obj = getXmlFromText(txt); /* Genero objeto XML con la respuesta del resultado en el servidor */

    return obj; /* retorna objeto XML al sitio de llamado de la funcion */

}

function SaveXMLLocal() {
    if (!ar_datos_registro || !ar_datos_registro["factura"])
        return;
    if (!WriteRead)
        cargaWriteReadApplet();
    if (ar_datos_registro["factura"] == 0 && ar_datos_registro["devolucion"] == 0 && ar_datos_registro["recibo"] == 0)
        return;
    clearTimeout(tiempoSaveXml);
    var txt = "h_ventas:" + ArToText(ar_datos_registro);
    txt = txt + "mv_ventas:" + ArToText(ar_productos);
    txt = txt + "mv_pagos:" + ArToText(ar_pagos);
    txt = txt + "mv_ingresos:" + ArToText(ar_ingreso_egreso);
    txt = txt + "m_cliente:" + ArToText(ar_cliente);
    var sec = (sw_modo_local == 1) ? seconsNumber() : '';
    var file = '' + LocalCurrent() + sec + ".pos";
    if (sw_autonomo == 1) {

        var subTxt = md5("" + ar_datos_registro["factura"] + ar_datos_registro["recibo"] + ar_datos_registro["devolucion"] + ar_datos_registro["vr_subtotal"] + ar_datos_registro["cc_cliente"] + ar_datos_registro["t_factura"] + ar_datos_registro["us_cajero"]);
        var fechacompleta = new Date();    /* llamada sin hacer chache */
        fechacompleta = fechacompleta.getHours() + '_' + fechacompleta.getMinutes() + '_' + fechacompleta.getSeconds();
        var modo = '';
        var sec = '';
        if (sw_modo_local == 1) {
            modo = '_local';
            sec = +'_' + fechacompleta;
        }
        var fileNuevo = LocalCurrent() + sec + modo + ".pos";
        return SavePageLocal(fileNuevo, txt + 'ctrl:' + subTxt);
    } else {

        var subTxt = md5("" + ar_datos_registro["factura"] + ar_datos_registro["recibo"] + ar_datos_registro["devolucion"] + ar_datos_registro["vr_subtotal"] + ar_datos_registro["cc_cliente"] + ar_datos_registro["t_factura"] + ar_datos_registro["us_cajero"]);

        var cl_resp = WriteRead.EscribirArchivo(file, "--" + txt + "ctrl:" + subTxt + ";", 1);
        if (parseInt(cl_resp.getCodigo()) < 1) {
            LoadPOSMsn('MSG45', cl_resp.getMensaje());
            return false;
        }

        //PrinterApplet.fileWrite(file,"--"+txt+"ctrl:"+subTxt+";");
    }
}

function validaQueryDato(xmlText) {
    if (xmlText == '<QUERY></QUERY>')
        return false;
    else

        return true;
}

function LoadSOAPserver(url, params) {

    var SoapObj = SOAP.q_async(url, 'urn:SoapPeople', 'QueryDB', params);
    
    if (SoapObj.status == 200 && SoapObj.readyState == 4) {
        return SoapObj.responseText;
    }
    if (SoapObj.status != 200) {
         alert("error en el status soap, status => " + SoapObj.status);
    }
    return false;
}

function create_xmlhttp()
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
    return obj;
    
    return Try.these(
            function() {
                return new XMLHttpRequest()
            },
            function() {
                return new ActiveXObject('Msxml2.XMLHTTP')
            },
            function() {
                return new ActiveXObject('Microsoft.XMLHTTP')
            },
            function() {
                return window.createRequest()
            }
    ) || false
}

var SOAP = {
    sens: 'http://schemas.xmlsoap.org/soap/encoding/', /* SOAP-ENC */
    xsins: 'http://www.w3.org/2001/XMLSchema-instance', /* xsi */
    svns: 'http://schemas.xmlsoap.org/soap/envelope/', /* SOAP-ENV */

    q_async: function(
            api_url, /* the endpoint address indicated by the WSDL */
            wsdl_namespace, /* the name found in targetNamespace in the WSDL */
            funtion_name, /* the function to call */
            params /* the parameters to pass */
            /* ok_callback, callback function for receiving the response */
            /* error_callback /* callback function for error situation (not supported on IE) */
            )
    {
        var req = create_xmlhttp();
        req.open('POST', api_url, false);
        /* change true to false here^ if you want to use synchronous calling instead */
        /*req.onreadystatechange =
         function() { if (req.readyState==4) { ok_callback(req); } } */

        /* if(req.onerror) req.onerror = functin() { error_callback(req); }*/
        req.send(
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<s:Envelope xmlns:s="' + SOAP.svns + '"' +
                ' xmlns:n="' + wsdl_namespace + '"' +
                '>' +
                '<s:Body><n:' + funtion_name + '>'
                + SOAP.esc_params(params)
                + '</n:' + funtion_name + '></s:Body>' +
                '</s:Envelope>');
        return req;
    },
    esc_params: function(a)
    {
        if (typeof a != 'object')
            return a.toString().
                    replace(/&/g, '&amp;').
                    replace(/</g, '&lt;').
                    replace(/>/g, '&gt;');





        var p, res = '';
        for (var p in a) {
            if (NoItem(p, a))
                continue;
            res += '<' + p + '>' + this.esc_params(a[p]) + '</' + p + '>';
        }
        return res
    },
    q_async_trans: function(url, ns, q, params, func_ok, func_nok) {
        SOAP.q_async(url, ns, q, params,
                function(req) {
                    return func_ok(SOAP.trans(req, q))
                },
                func_nok)
    },
    /* Translates a XML response object into a function return value.*/
    trans: function(req, q) {
        if (!req)
            throw "no xmlhttp?";
        var x = req.responseXML, rr = new RegExp('^' + q + 'Response$');
        if (!x)
            throw req.responseText;
        return SOAP.respt.find(x, rr)
    },
    respt: {/* response translator */
        itp: /^xsd:(int|long|short|byte|((non)?(nega|posi)tive)?integer)$/,
        ftp: /^xsd:(float|double)$/,
        find: function(xml, rr) {
            var x = xml.childNodes, a, b = x.length, n;
            for (a = 0; a < b; ++a)
            {
                n = x[a];
                var nn = n.localName;
                if (nn != 'undefined' && rr.test(nn))
                    return this.trans(n.firstChild)
                // ^Note: multipart return values not supported
                var subq = this.find(n, rr)
                if (typeof subq != 'null')
                    return subq
            }
            return null
        },
        trans: function(n)
        {
            if (n.nodeType != 1)
                throw 'unexpected nodetype: ' + n.nodeType;
            if (n.hasAttributeNS(SOAP.sens, 'arrayType'))
            {
                // Array of something
                var res = [], x = n.childNodes, a, b = x.length;
                for (a = 0; a < b; ++a)
                    res.push(this.trans(x[a]))
                return res
            }
            if (n.hasAttributeNS(SOAP.xsins, 'nil'))
                return ''; //null;
            var text = dom_rtext(n), type = n.getAttributeNS(SOAP.xsins, 'type');
            if (type == 'xsd:boolean')
                return text == 'true' || text == '1';
            if (this.itp.test(type))
                return parseInt(text, 10);
            if (this.ftp.test(type))
                return parseFloat(text);
            if (!type || /^xsd:/.test(type))
                return text;

            // It was not an XSD type, so handle it as a struct/object then.
            var res = {}, x = n.childNodes, a, b = x.length;
            for (a = 0; a < b; ++a)
            {
                var nn = x[a].localName;
                res[nn] = this.trans(x[a])
            }
            return res
        }}
}

/* Copyright (C) 1992,2007 Joel Yliluoma ( http://iki.fi/bisqwit/ ) */
/* Various javascript utility functions - http://bisqwit.iki.fi/jsgames/ */

// A very handy shorthand.
function rgel(root, id) {
    return root.getElementById(id)
}
function gel(id) {
    return rgel(document, id)
}
// Utilities for common form input properties
//  selectboxes
function id(id) {
    return gel(id).selectedIndex
}
function ids(id, v) {
    gel(id).selectedIndex = v
}
//  checkboxes
function ch(id) {
    return gel(id).checked ? 1 : 0
}
function chs(id, v) {
    gel(id).checked = v > 0
}
//  textlines
function tx(id) {
    return gel(id).value
}
function txs(id, v) {
    gel(id).value = v
}

/* Now the actual DOM functions */

function dom_wipe(block)
{

    var a, k = block.childNodes, b = k.length;

    for (a = b; a-- > 0; )
        block.removeChild(k[a])
    return block
}
var clearBlock = dom_wipe;

/* Would use 'const' here, but IE does not support it. */
var dom_is_event_activator_name =
        {onkeydown: 1, onmouseover: 1, onclick: 1, onblur: 1, onfocus: 1, onmouseout: 1,
            ondblclick: 1, onmouseup: 1, onmousedown: 1, onkeypress: 1, onkeyup: 1, onchange: 1,
            onload: 1, onmousemove: 1, onselect: 1, onsubmit: 1, onunload: 1, onerror: 1, className: 1}
function dom_tag_finish_with(t, params)
{
    for (var i in params) {
        if (NoItem(i, params))
            continue;
        if (dom_is_event_activator_name[i])
            t[i] = params[i];
        else
            t.setAttribute(i, params[i]);
    }
    return t
}
function dom_add_children(t, children)
{
    var a, b = children.length;
    for (a = 0; a < b; ++a)
        dom_append(t, children[a])
    return t
}

function dom_tag(t)
{
    return document.createElement(t)
}
function dom_text(content)
{
    return document.createTextNode(content)
}
function dom_tag_with(t, params)
{
    return dom_tag_finish_with(dom_tag(t), params)
}
function dom_tag_class(t, cls)
{
    return dom_tag_with(t, {className: cls})
}
function dom_tag_class_with(t, cls, params)
{
    return dom_tag_finish_with(dom_tag_class(t, cls), params)
}
function dom_tag_with_children(t, children)
{
    return dom_add_children(dom_tag(t), children)
}
function dom_tag_attr_with_children(t, params, children)
{
    return dom_add_children(dom_tag_with(t, params), children)
}
function dom_tag_class_with_children(t, cls, children)
{
    return dom_add_children(dom_tag_class(t, cls), children)
}
function dom_tag_text(t, text)
{
    return dom_tag_with_children(t, [dom_text(text)])
}
function dom_tag_attr_text(t, params, text)
{
    return dom_finish_with(dom_tag_text(t, text), params)
}
function dom_append(root, t)
{
    return root.appendChild(t)
}
function dom_rtext(t)
{
    /* Loads the text content from this tag. Assuming it has text content */
    var c = t.childNodes;
    if (!c)
        throw 'dom_rtext';
    var result = '', a, b = c.length;
    for (a = 0; a < b; ++a)
        result += c[a].nodeValue;
    return result
}
function dom_rtags(root, t)
{
    /* Loads an array of matching tags */
    return root.getElementsByTagName(t)
}
function dom_ftag(root, t)
{
    /* Loads the matching tag, throws exception if not found */
    var l = dom_rtags(root, t);
    if (l.length == 0)
        throw 'tag ' + t + ' missing';
    if (l.length > 1)
        throw 'tag ' + t + ' is ambiguous';
    return l[0]
}

function ValidaObjStatusTransaction(obj, bandera) {

    if (!obj) {
        return false;
    }
    if (!bandera) {
        bandera = false;
    }    
    
    var ar_atributes = xmlgetAttr(obj, "QUERY.STATUS");

    if (!ar_atributes) {
        return false;
    }
    
    var strcode = ar_atributes["errmsg"];
    var position = strcode.indexOf("SQLCODE=", 1);
    var sqlcode = strcode.substring(position + 8, (strcode.length - 1));

    if ((ar_atributes["status"] == 0 || ar_atributes["status"] == 100) && sqlcode == 0) {
        return true;
    } else {
        if (bandera === false) {
            /*var code = Math.abs(parseInt(sqlcode));
            var strMsgcode = getMsgErrorIfx("MSG" + code);

            if (strMsgcode.indexOf('No_configurado') >= 0)
                strMsgcode = strcode;
            alert("ocurrio un error en la validaacion del objeto trans : " +sqlcode);*/
        } else {
            /*Se debe de enviar correo reportando el Error*/
            return false;
        }

        return false;
    }
}


function ExecuteSoapTransactionLocal(strXml) {
    var obj = SoapPeopleLocal(strXml);
    /* Se envia el XML al servicio SOAP Local. */
    if (!obj)
        return false;
    if (ValidaObjStatusTransaction(obj)) {
        //alert('dato guardado en autonomo')
        return true;
    }

    return false;
}


function SoapPeopleLocal(texto, url) {
    var xmlText = '';
    var xmlText = texto;
    if (!url) {     
        var url = "http://192.168.2.2/des_juan/LocalServerSOAPMobile.php";
        //var url = "http://192.168.2.2/des_juan/QueryDB.php";
    }
    if (!validaQueryDato(xmlText)) {
        return false;
    }
    /*WStatus("xml:"+xmlText)*/
    idxDetail = Array();
    ar_detalle = Array();
    ar_respuesta = false;
    LoadSOAPserverLocal(url, xmlText);
    return AdaptaRespuestaLocal(ar_respuesta);
}

function AdaptaRespuestaLocal(Texto)
{
    var xmlText2 = '';
    var xmlText2 = Texto;
    if (!xmlText2)
        return false;
    xmlText2=xmlText2.replace("  \n<?xml","<?xml");
    
    var obj = generarObjXml(xmlText2); /* Genero objeto XML con la respuesta del resultado en el servidor */
    return obj;
}

function LoadSOAPserverLocal(url, xmlText) {
    try {       
        ajax = ClassAjax();
        ajax.open("POST", url, false, username, userpass);
        ajax.onreadystatechange = function() {
                  
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    var res = ajax.responseText;
                    ar_respuesta = res;
                } else {
                    LoadPOSMsn("MSG321", 1);
                    return false;
                }
            }
        };
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send("t=" + seconsNumber() + "&xmlText=" + escape(xmlText) + "");

    } /* try */
    catch (e) {
        LoadPOSMsn("MSG321", 1);
        return false;
    }
}



