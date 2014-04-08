function NoItem(idx,ar_data){
	if(idx == 'indexOf' || typeof ar_data[idx] == 'function') return true;
	
	return false;
}

/* Modulo manejo de archivos XML */
function xml_crea_object() {
       var objXML = new Object();

    try {
        objXML = new ActiveXObject("Microsoft.XMLDOM");
    }
    catch (e) {
        try {
            objXML = document.implementation.createDocument("", "", null);
        }
        catch (E) {
            objXML = false;
            alert('error al crear el objeto xml');
        }
    }
    if (objXML)
        objXML.async = "false";

    return objXML;	
} 

var xml_MsgsPos;

function getMsg(msgCode, param, param2){
	if(!xml_MsgsPos)xml_MsgsPos=loadXML('xml/MsgsPos.xml');
	if(!param) param ="";
	if(!param2) param2 ="";
	var attrMsg = ArrayAttribute(xml_MsgsPos, language, msgCode);
	   	
	   	if ( ! attrMsg ) {
	   		var attrMsg = Array();
	   		attrMsg['msg'] = msgCode+" No configurado" ;
	   	}
	   	
	   	var msg = attrMsg['msg'].replace('%m',param);
	    msg = msg.replace('%n',param2);
	   	return msg;
}

function getLanguage(tagCode) {
    
    if (!xml_Language)
        var xml_Language = loadXML('xml/lenguajes.xml');

    var attrLanguage = ArrayAttribute(xml_Language, language, tagCode);

    if (!attrLanguage) {
        var attrLanguage = Array();
        attrLanguage['tag'] = tagCode + " No configurado ";
    }

    return attrLanguage['tag'];
}

function loadXML(xmlFile){
	 var obj= new xml_crea_object();  
	 obj.async=false;
	 obj.onreadystatechange=verify;
	 obj.load(xmlFile);
	 if (!obj.documentElement ) return false;
	 return obj;
}

function verify()
{ 
 if (this.readyState != 4) return false; 
}

function getXMLDataUnq(obj, nodo1, idx1, nodo2, idx2, attr) {

  if (!obj || !obj.getElementsByTagName(nodo1) || !obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2) ) return false;
  
  if ( obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2)[idx2] )
     return obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2)[idx2].getAttribute(attr);
  else
     return false; 
}

function getXMLNodo2(obj, nodo1, idx1, nodo2) {
   try {
     if (!obj || !obj.getElementsByTagName(nodo1) || !obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2) ) return false;	
     if ( obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2) ) 
        return obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2); 
     else
        return false;
   }
   catch (err) { return false; } 
}

function getXMLNodo1B(obj, nodo1) {
  if (obj.getElementsByTagName(nodo1))
      return obj.getElementsByTagName(nodo1); 
   else
     return false; 
}
function getXMLGetAttributes(obj, nodo1, idx1, nodo2, idx2) {  
  if ( obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2)[idx2].attributes ) 
		
		return obj.getElementsByTagName(nodo1)[idx1].getElementsByTagName(nodo2)[idx2].attributes; 
   else
		//alert('arrayattrsssswwwwwww');
		return false; 
}

 function ForEachAttribute(xmlObj, Nodo, SubNodo, Funcion)  {
   ar_attributos = getXMLGetAttributes(xmlObj, Nodo, 0, SubNodo,0);
   for( var x = 0; x < ar_attributos.length; x++ ) {
     if( ar_attributos[x]) {
       Name=ar_attributos[x].nodeName;
       Value=ar_attributos[x].nodeValue;
       eval(Funcion) ;
     }
   }
} 

function ArrayAttribute(xmlObj, Nodo, SubNodo, idx)  {
   
   var ar_nodo = Array();
   if (!idx) idx=0;
   
   try  {
	 ar_attributos = getXMLGetAttributes(xmlObj, Nodo, 0, SubNodo,idx);
   }
   catch (err) { alert(err.message);
        return false; };
   
   if (! ar_attributos) return false;
   for( var x = 0; x < ar_attributos.length; x++ ) {
     if( ar_attributos[x]) {
       Name=ar_attributos[x].nodeName;
       Value=ar_attributos[x].nodeValue;
       ar_nodo[Name] = Value;
     }
   }

   if ( x > 0) return ar_nodo;
   else return false;
} /* function */

function getXMLNodo1(xmlObj, nodos){
  return getXMLNodo(xmlObj, nodos)
}

function getXMLNodo(xmlObj, nodos){
	var obj= xmlObj;
	var ar_nodo = Array();
	var ar_idx = Array();
	var ar_nodo0 = nodos.split(".");
	var y = 0;
	for ( var x in ar_nodo0) { if (NoItem(x,ar_nodo0)) continue;
		
		var ar1 = ar_nodo0[x].split("/");
		ar_nodo[y]= ar1[0];
		if ( !ar1[1]) ar_idx[y] =  0;
		else ar_idx[y]=ar1[1];
		y++;
	}
	var lidx = ar_nodo.length -1;
    
	for ( var x in ar_nodo) { if (NoItem(x,ar_nodo)) continue;
		 
		 if ( x == lidx ) {
			obj = obj.getElementsByTagName(ar_nodo[x])
		 }
		 else obj = obj.getElementsByTagName(ar_nodo[x])[ar_idx[x]]
		 if (!obj ) break;
	}
	if (!obj ) return false;
	else return obj;  
	 
}

function xmlgetAttr(xmlObj, nodos) {	
	var obj= xmlObj;
	
	if (!obj ) return false;
	var ar_nodo = Array();
	var ar_idx = Array();
	if (typeof nodos != "string" ) return false;	
	var ar_nodo0 = nodos.split(".");
	var y = 0;
	for ( var x in ar_nodo0) { if (NoItem(x,ar_nodo0)) continue;
		
		var ar1 = ar_nodo0[x].split("/");
		ar_nodo[y]= ar1[0];
		if ( !ar1[1]) ar_idx[y] =  0;
		else ar_idx[y]=ar1[1];
		y++;
	}
	    
	var lidx = ar_nodo.length -1;

	for ( var x in ar_nodo) { if (NoItem(x,ar_nodo)) continue;
		 
		 if ( x == lidx ){
		 	try{
		 		obj = obj.getElementsByTagName(ar_nodo[x])[ar_idx[x]];
		 	}catch(e){
		 	 	return false;
		 	}
		 }else{
		 	try{
		 	    obj = obj.getElementsByTagName(ar_nodo[x])[ar_idx[x]];
		 	}catch(e){
		 		return false;
		 	}
		 }
		 if (!obj ) break;
	}
	    
	if (!obj ) return false;
	var ar = obj.attributes;
	var ar_data = Array();
	    
	if (ar.length < 1 ) return false;
 	for( var x = 0; x < ar.length; x++ ) {
	   if( ar[x]) {
     	 Name=ar[x].nodeName;
       	 Value=ar[x].nodeValue;
      	 ar_data[Name] = Value;
       }
	}
	return ar_data;
}

function ForEachSubNodo(xmlObj, Nodo, Funcion) {

    obj = getXMLNodo1(xmlObj, Nodo);
    /*alert (obj[1].nodeValue);
      obj = xmlObj.getElementsByTagName(Nodo);
      alert(obj[0].firstChild)*/
    if ( ! obj[0] ) {
       Message("Error XML Node:"+Nodo);
       return;
    }
    if ( obj[0].childNodes ) {
	    for( var x = 0; x < obj[0].childNodes.length; x++ ) {
	    	if (obj[0].childNodes[x].nodeName == '#text' ) continue ; /*no debe procesar este elemento en firefox*/
	        Name= obj[0].childNodes[x].nodeName;
	        SubNodo= obj[0].childNodes[x].nodeName
	        eval(Funcion);                                 /* Ejecuta la funcion y parametros enviados*/
	    }
    }
}
function ForEachSubNodoPM(xmlObj, Nodo, Funcion) {
    obj = getXMLNodo1(xmlObj, Nodo);
    if (! obj ) Message("problemas con OBJ "+Nodo)
    if ( obj[0] ) {
       if ( obj[0].hasChildNodes()  ) {
	    for( var x = 0; x < obj[0].childNodes.length; x++ ) {
	    	if (obj[0].childNodes[x].nodeName == '#text' ) continue ; /*no debe procesar este elemento en firefox*/
	        Name= obj[0].childNodes[x].nodeName;
	        SubNodo= obj[0].childNodes[x].nodeName;
            eval(Funcion);                                 /*Ejecuta la funcion y parametros enviados*/
	    }
       }
    }

}

function ForEachTag(xmlObj, Nodo, idx){
	if (!idx) var idx=0;

	if (!xmlObj) return false;

	var ar_name = Array();

	obj = getXMLNodo(xmlObj, Nodo);

    if (!obj ) return false;

    if ( obj[idx] ) {
       if ( obj[idx].hasChildNodes()  ) {
		    for( var x = 0; x < obj[idx].childNodes.length; x++ ) {
		    	if (obj[idx].childNodes[x].nodeName == '#text' ) continue ; /* no debe procesar este elemento en firefox*/
		        ar_name[x]= obj[idx].childNodes[x].nodeName;
		    }
		    if (x < 1) return false
		    else return ar_name;
        }
    }
    return false;
} 

function ForEachNodos(xmlObj, nodo) {
  try{  
	if (!xmlObj)  LoadPOSMsn("MSG45", 0, "No objeto-"+nodo);  
	var obj = getXMLNodo(xmlObj, nodo)
	if (!obj) return false;
	var ar_AllNodos = Array();
	ar_Cant = Array(nodo);
	ar_AllNodos = getForEachNodos(obj[0], nodo);
	ar_Cant = 0;
	if (ar_AllNodos.length < 1) return false;
	else return ar_AllNodos;
  }
  catch(e){
  	return false;
  }

}
 
function getForEachNodos(obj, nodo,ar_AllNodos) {
    if (!ar_AllNodos) var ar_AllNodos = Array();  
    if (!obj ) return ar_AllNodos ; 
    if (!obj.hasChildNodes()) return ar_AllNodos ; 
    for( var x = 0; x < obj.childNodes.length; x++ ) {
    	if (obj.childNodes[x].nodeName == '#text' ) continue ; /* no debe procesar este elemento en firefox*/
    	if (obj.childNodes[x].nodeName == 'xml' ) continue ;
    	if (obj.childNodes[x].hasChildNodes()) {
    		var nodoAnt = nodo;
    		nodo= (nodo.length>0) ? nodo+"."+obj.childNodes[x].nodeName : obj.childNodes[x].nodeName ;
    		ar_AllNodos = getForEachNodos(obj.childNodes[x],nodo,ar_AllNodos);
    		nodo=nodoAnt;
    	}
    	else {
    		var key = nodo+"."+obj.childNodes[x].nodeName;
    		if (!ar_Cant[key.replace(".","")]) ar_Cant[key.replace(".","")]=0;
    		else ar_Cant[key.replace(".","")]=ar_Cant[key.replace(".","")]+1;
    		var y = ar_Cant[key.replace(".","")];
    		if (y > 0 ) skey = key+"/"+y;
    		else skey=key;
    		ar_AllNodos.push(skey);
    	}
    }
    return ar_AllNodos;
}

function getXmlFromText(xmlText) {
 
	try //Internet Explorer
	  {
	  xmlDoc=xml_crea_object();
	  xmlDoc.async="false";
	  xmlDoc.loadXML(xmlText);
	  return xmlDoc;
	  }
	catch(e)
	  {
	  parser=new DOMParser();
	  xmlDoc=parser.parseFromString(xmlText,"text/xml");
	  return xmlDoc;
	  }
}





/* Fin del Modulo */
