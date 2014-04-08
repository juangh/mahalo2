elementos_permisos = $("[data-perm]");
salida_permisos = new Array();
apuntador = 0;
$(elementos_permisos).each(function(){
    salida_permisos[apuntador] = $(this).attr("data-perm").toString();
    apuntador++;
});