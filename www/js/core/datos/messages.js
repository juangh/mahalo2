
/*
 * Julio Gallego 04-10-2009 11:26 Se adiciona parametro zindex a la funcion LoadPOSMsn
 * 
 * */


var PopupMessage;
var MsgAnt=false;
    
function changeObjType(idObj, newType) /* cambia un objeto idObj a tipo newType */
{
		object = getElement(idObj);
		object2 = document.createElement('INPUT');
		object2.setAttribute('type', newType);
		document.body.replaceChild(object2, object);
}
   
function setUserVar(nameGlobal,valor) /* setea la variable global nameGlobal con el valor */
   {
   		var inputAllowed = validarMainInput(valor,'MSG0');
   		
   		if (inputAllowed == true) {
	   		eval(nameGlobal + "=valor;");
	   		getElement('dataInput').value = "";
			/*alert(getElement('dataInput').type);
			  changeObjType('dataInput','password');*/
	   		ApilaModo(9997);
   		}
}

/* carga el mensajero con el codigo del mensaje y el modo */   
function LoadPOSMsn(msgCode, modo, param, param2, capa, swObligarCerrar, param3){
       if (msgCode == MsgAnt) return;
       if(!swObligarCerrar)var swObligarCerrar=0;
       if (!modo ) var modo=0;
   	   if (!param) var param="";
   	   if (!param2) var param2="";
   	   if (!param3) var param3="";
   	   if (!capa) var capa=800;
   	   MsgAnt = msgCode;
	   	var attrMsg = DatosParaMsgXML(language, msgCode); /* Array Datos mensaje en XML */
	    if (!attrMsg['type']) attrMsg['type'] = "1";
 	    var msg = attrMsg['msg'].replace('%m',param);
	    var msg = msg.replace('%n',param2).replace('%w',param3);
	    if (attrMsg['type'] == 0) modo=4;
	   	ModoMsg = modo; /* modo: 0=hasta pulsar tecla en el input
	    						   		1=Fijo con boton de cerrar ventana mensaje
	    						   		>1 como timerOut (# segundos) */
	  	
	   	var divMsgX = 0; /* seteo la posicion por defecto del lenguaje */
	   	var divMsgY = 0;
	   	
	   	if (attrMsg['type'] == 1) {
		   	divMsgX = findMousePosX() - 130;   	
		   	divMsgY = findMousePosY() + 20;
	   	}
	   	else {
	   		divMsgX = 550;   	
		   	divMsgY = 60;
	   	}
	   	
	   	if(divMsgX < 0) divMsgX = 0;
	   	
	   	if(divMsgY < 0)	divMsgY = 0;
	      	 
	    ObjMsg = getElement('dv_msgBox'); 	 
	    if(!ObjMsg){alert(msg);return false;}
	    /*if ( isIE) ObjMsg.setAttribute("className", 'MsgBox');
		else */
	    if (isNS) ObjMsg.setAttribute("class", 'MsgBox'); 	 
		ObjMsg.style.zIndex = capa; 	
		ObjMsg.style.position = "absolute";	
	   	ObjMsg.style.top = divMsgY + ' px';
	   	ObjMsg.style.left = divMsgX + ' px';
		ObjMsg.style.width = attrMsg['width'] + ' px';
	   	ObjMsg.style.height = attrMsg['height'] + ' px';
	   	
	   	ObjMsg.style.visibility = 'visible';
	   	ObjMsg.style.display = 'block';
	   	if(swObligarCerrar==0)ObjMsg.onclick=IntCloseDivMensaje;
	   	else ObjMsg.onclick=IntCloseDivMensajeNoAction;
	   	
	   	MsgTxt=MsgTxt+msg+";";
	   	var ar_msg = MsgTxt.split(";");
	   	
	   	 if ( sw_modo_local==1 ) path="http://"+GetServerSecondary()+"/prs/";
         else path="";
	   	 var content = '<img src="'+path+'Load.php?bg_logo_msg.png" '+
	   	     ' style="position:absolute; left:0; top: 0; height:100%;'+
	   	     ' width:100%;" >';
	   	 
         content += "<div id='contenMsgGeneral'   "+
                    " style='position:absolute; left:0; top: 0; overflow:auto;' width='100%' >" +
         		"<table border='0' cellpadding='0' cellspacing='0'    width='96%' >" +
	   			    "<tr><td valign='middle' width='45%' align='right'><img src='"+path+"images/ico/" + attrMsg['ico'] + "'></td>";
	    content=content+"<td  valign='top' align='right' class='msgBox2'>Cerrar:<img src='"+path+"Load.php?x.gif' onclick='IntCloseDivMensaje()'></td>";
	   	content=content+"</tr>" ;
	   	for (var x=ar_msg.length-1; x>=0; x--) {
	   	 	content=content+"<tr><td  align='center'>&nbsp;</td>"+
	   	 	        "<td  valign='top' align='right' class='msgBox2' ><br>" + ar_msg[x] + "</td></tr>";
	   	}
        content=content+"</table></div>";
	    ObjMsg.innerHTML = content;
	    ResizeDivMensajesGenerales(ObjMsg,attrMsg['height']);
	   	if ( ModoMsg > 1 && swObligarCerrar==0) 
	   		timerCloseMsg = setTimeout("IntCloseDivMensaje();",ModoMsg*1000);

}

function ResizeDivMensajesGenerales(ObjMsg,ObjHeight){
	var ob=getElement("contenMsgGeneral");	
	var heightRow=ob.clientHeight;
	if(heightRow<(ObjHeight-90) && heightRow>100){
		ObjMsg.style.height = ''+(parseFloat(heightRow)+60)+''+ ' px';
		return true;
	}
	if(heightRow<=100)ObjMsg.style.height = ''+(190)+''+ ' px';
	return true;
}

function IntCloseDivMensajeNoAction(){
	return true;
}

function NetearVarMensajesMensajero(){
	MsgTxt='';
	MsgAnt = "";
	return true;
}
   
function MessageFalse(msgCode, modo, param, param2) {
   	  if (!modo ) var modo=0;
   	  if (!param) var param="";
   	  if (!param2) var param2="";
   	  LoadPOSMsn(msgCode, modo, param, param2);
   	  return false;
}
   
function DatosParaMsgXML(language, msgCode) {
	if (!xmlMsgs) return getMsgError(msgCode) ;
	var attrMsg = ArrayAttribute(xmlMsgs, language, msgCode);
   	
   	if (!attrMsg ) return getMsgError(msgCode) ;
   	
   	return attrMsg;
}

function getMsgError(msgCode) {
	var attrMsg = Array();
	attrMsg['msg'] = msgCode+" No configurado" ;
	attrMsg['ico'] = ""; 
	attrMsg['modonew'] = "";
	attrMsg['type'] = 1;
	return attrMsg;
}
   
   
function validarMainInput(valor, msgCode) /*valida si txt_main esta vacio*/
   {
	   	if(valor == "") return MessageFalse(msgCode, 4);
	   	else	   		return true;
}
   
function findMousePosX(){
		/* capture the mouse position*/
   var posx = 0;
   var e = window.event;
   if (!e) return 0;
   if (e.pageX || e.pageY) posx = e.pageX;
   else if(e.clientX || e.clientY)
    	posx = e.clientX;
  
   if(!posx || posx<0) posx = 0;	
   if(posx>700)posx=600;

   return posx; 	
}

function findMousePosY(){
	/* capture the mouse position*/
    var posy = 0;
    var e = window.event;
    if (!e) return 0;
    if (e.pageX || e.pageY) 
    	posy = e.pageY;
    else if(e.clientX || e.clientY) 
    	posy = e.clientY;
	
	if(!posy || posy<0)posy = 0;
    if(posy>500)posy=500;
    	
	return posy;
}
	  
function IntCloseDivMensaje()
{
	if (timerCloseMsg > 0 ) clearTimeout(timerCloseMsg);
	timerCloseMsg = 0;
	ObjMsg = getElement('dv_msgBox');
	if ( ObjMsg ) { 
		ObjMsg.style.visibility = "hidden";
		ObjMsg.style.zIndex = 0;
		MsgTxt="";
	}
	MsgAnt = "";

}

function getMsg(msgCode, param, param2){
	
	if(!param) param ="";
	if(!param2) param2 ="";
	var attrMsg = ArrayAttribute(XmlMsgPos, language, msgCode);
	   	
	   	if ( ! attrMsg ) {
	   		var attrMsg = Array();
	   		attrMsg['msg'] = msgCode+" No configurado" ;
	   	}
	   	
	   	var msg = attrMsg['msg'].replace('%m',param);
	    msg = msg.replace('%n',param2);
	   	return msg;
}

function getMsgsEs(msgCode, param, param2){
	
	if(!param) param ="";
	if(!param2) param2 ="";
	var attrMsg = ArrayAttribute(xmlMsgs, language, msgCode);
	   	
	   	if ( ! attrMsg ) {
	   		var attrMsg = Array();
	   		attrMsg['msg'] = msgCode+" No configurado" ;
	   	}
	   	
	   	var msg = attrMsg['msg'].replace('%m',param);
	    msg = msg.replace('%n',param2);
	   	return msg;
}

function getMsgErrorIfx(msgCode, param, param2){
	
	if(!param) param ="";
	if(!param2) param2 ="";
	if(!XmlMsgErrorIfx)LoadxmlMsgsErrorIfx();
	var attrMsg = ArrayAttribute(XmlMsgErrorIfx, language, msgCode);
	   	
	   	if ( ! attrMsg ) {
	   		var attrMsg = Array();
	   		attrMsg['msg'] = msgCode+" No_configurado" ;
	   	}
	   	
	   	var msg = attrMsg['msg'].replace('%m',param);
	    msg = msg.replace('%n',param2);
	   	return msg;
}

function MensajeUsuario(message, modo) {
   if (!modo ) var modo=0; /* modo: 0=hasta pulsar tecla en el input
    						   		1=Fijo con boton de cerrar ventana mensaje
    						   		>1 como timerOut (# segundos) */

	/* Aqui debe abrir la venta */
	ObjMsg = getElement('dv_msgBox');
	if ( ! ObjMsg ) {
		 CreaDivMensaje(DivInput);
		 ObjMsg = getElement('dv_msgBox');
	}
	ObjMsg.innerText = message;
	ObjMsg.style.visibility = "visible";
	alert(message);
	if ( ModoMsg > 1 ) timerCloseMsg = setTimeout("IntCloseDivMensaje();",ModoMsg*1000);		 
	
}

function CreaDivMensaje(obj) {
    if (!objInput) setObjDataInput();
	if ( ! obj) {
		 obj = objInput;
	}
	Xtop = obj.offsetTop - 32;
	Xheight=  30;
    
    alert(Xheight);
    Xwidth = parseInt(obj.style.width);
    Xleft = parseInt(obj.style.left);
	 
	MakeDiv('dv_msgBox', "", Xleft, Xtop, Xwidth, Xheight,500, "" );
}


function IntCloseDivMensajeonClick() {
	if (timerCloseMsg > 0 ) clearTimeout(timerCloseMsg);
	timerCloseMsg = 0;
	ObjMsg = getElement('dv_msgBox');
	if ( ObjMsg ) ObjMsg.style.visibility = "hidden";
	MsgAnt = "";
	
}

function CloseDivMensaje() {
    if ( ModoMsg == 1 || timerCloseMsg > 0 ) return;	
    IntCloseDivMensaje();
}	

function Message(mensaje,tiempo) {
	if (!PopupMessage) {
		PopupMessage = document.createElement("PopupMessage");
		PopupMessage.id=PopupMessage;
		if ( isIE) PopupMessage.setAttribute("className", 'csPopupMessage');
		else if (isNS) PopupMessage.setAttribute("class", 'csPopupMessage'); 
		PopupMessage.style.visibility = "visible";
		PopupMessage.style.display = "block";
		PopupMessage.style.zIndex = 1500;
		document.body.appendChild(PopupMessage);
		PopupMessage.style.left = '700'+"px";
		PopupMessage.style.top = '0'+"px";
		PopupMessage.style.width = '300'+"px"; 
		PopupMessage.style.height = '50'+"px";
	}
	PopupMessage.innerText = mensaje;
	DowngradeOpacity(PopupMessage, 10);
}
