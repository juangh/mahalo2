jQuery("#select-choice-idioma").val(localStorage["idioma"]);
jQuery("#select-choice-idioma").on('change', function() { 
    localStorage["idioma"] = jQuery("#select-choice-idioma").val(); 
});

function setTagLanguage()
{
    var idioma = localStorage["idioma"];
    var path = "#" + jQuery.mobile.activePage.data('url');
    var tags2Pagina = [];
    var $lang = jQuery(path + " [data-lang-id]");

    for (var i = 0; i < $lang.length; i++) {
        tags2Pagina[i] = $lang[i].getAttributeNode("data-lang-id").value;
    }
    for (var i = 0; i < tags2Pagina.length; i++) {
        var padre = lenguajes[idioma];
        if (padre) { var hijo = padre[tags2Pagina[i]]; };
        jQuery("[data-lang-id='" + tags2Pagina[i] + "']").text(hijo);
    }
    return true;
}