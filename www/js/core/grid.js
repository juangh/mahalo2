function drawGrid(elementos)
{
    if (elementos === "") {
        return "<div style='color:red'>Usuario sin privilegios</div>";
    }

    var items = new Array();
    var teclados = new Array();
    var puntero = new Array();
    var TOTAL_ELEMENTOS = 9;
    var i = 0;
    var j = 0;

    $.each(elementos, function(k) {
        items[i] = [parseInt(k.split("teclado-")[1]), "on"];
        i++;
    });

    var array = new Array();
    for (var i = 0; i < TOTAL_ELEMENTOS; i++) {
        if (items[i] !== undefined) {
            array[items[i][0]] = items[i][1];
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === undefined) {
            array[i] = 'off';
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === 'on') {
            puntero[j] = i;
            teclados[j] = [i, array[i]];
            j++;
        }
    }
    for (var i = 0; i < 9; i++) {
        if (puntero.indexOf(i) === -1) {
            puntero.push(i);
            teclados.push([i, array[i]]);
        }
    }
    var tag = '';
    var posicion = ['a', 'c', 'b'];
    var output = "<div class=\"ui-grid-b\">";
    var k = 0;
    var tag = 0;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (teclados[tag][1] === 'on') {
                output += "<div class=\"ui-grid-b\" style=\"display:inline-block; text-align:center; margin: auto; width: 30%;\">" +
                        "<div class=\"ui-block-" + posicion[k] + " ampliarBloque\" style=\"width:100%; text-align:center; \" data-grid-position=\"" + puntero[tag] + "\">";
                if (anclas[puntero[tag]] === 'http://mahalo.saas.com.co/portalmahalo') {
                    output +=
                            "<span onclick='loadUrl()'>" +
                            "<figure>" +
                            "<img src=" + imagenes[puntero[tag]] + " width=\"48\" height=\"48\" />" +
                            "<figcaption><span data-lang-id=\"lang" + (puntero[tag] + 5) + "\">" + secciones[puntero[tag]] + "</span></figcaption>" +
                            "</figure>" +
                            "</span>" +
                            "</div>" +
                            "</div>";
                } else {
                    output +=
                            "<a style=\"text-decoration:none; color:inherit; font-weight:normal;\" href=" + anclas[puntero[tag]] + " data-inline=\"true\" data-transition=\"" + transiciones[puntero[tag]] + "\">" +
                            "<figure>" +
                            "<img src=" + imagenes[puntero[tag]] + " width=\"48\" height=\"48\" />" +
                            "<figcaption><span data-lang-id=\"lang" + (puntero[tag] + 5) + "\">" + secciones[puntero[tag]] + "</span></figcaption>" +
                            "</figure>" +
                            "</a>" +
                            "</div>" +
                            "</div>";
                }
                if (k === 2) {
                    k = 0;
                } else {
                    k += 1;
                }
            } else {
                output += "<div class=\"ui-grid-b\" style=\"display:inline-block; text-align:center; margin: auto; width: 30%;\">" +
                        "<div class=\"ui-block-" + posicion[k] + " ampliarBloque\" style=\"width:100%; text-align:center; \" data-grid-position=\"" + puntero[tag] + "\">" +
                        "<a style=\"text-decoration:none; color:inherit; font-weight:normal;\" href=" + anclas[puntero[tag]] + " data-inline=\"true\" data-transition=\"" + transiciones[puntero[tag]] + "\">" +
                        "<figure>" +
                        "</figure>" +
                        "</a>" +
                        "</div>" +
                        "</div>";
                if (k === 2) {
                    k = 0;
                } else {
                    k += 1;
                }
            }
            tag++;
        }
    }
    output += "</div>";
    return output;
}

function drawBottom(elementos)
{
    var items = new Array();
    var teclados = new Array();
    var puntero = new Array();
    var TOTAL_ELEMENTOS = 9;
    var i = 0;
    var j = 0;

    $.each(elementos, function(k) {
        items[i] = [parseInt(k.split("teclado-")[1]), "on"];
        i++;
    });

    var array = new Array();
    for (var i = 0; i < TOTAL_ELEMENTOS; i++) {
        if (items[i] !== undefined) {
            array[items[i][0]] = items[i][1];
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === undefined) {
            array[i] = 'off';
        }
    }

    for (var i = 0; i < 9; i++) {
        if (array[i] === 'on') {
            puntero[j] = i;
            teclados[j] = [i, array[i]];
            j++;
        }
    }

    for (var i = 0; i < 9; i++) {
        if (puntero.indexOf(i) === -1) {
            puntero.push(i);
            teclados.push([i, array[i]]);
        }
    }
    return teclados;
}