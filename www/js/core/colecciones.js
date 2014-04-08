var ultimosProductos = new Array();

function traerUltimosProductos()
{
    jQuery.ajax({
        url: "./php/bd.php",
        type: "post",
        dataType: "text",
        data: {"op": "traer"},
        success: function(datos) {
            var cadena = JSON.parse(datos);
            var k = 0;
            for (var i in cadena) {
                ultimosProductos[k] = cadena[i];
                k++;
            }
        }
    });
    return true;
}

function loadDatabase()
{
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;

    //var keyRange = IDBKeyRange.lowerBound(0);

    if (!window.indexedDB) {
        window.alert("Este navegador no soporta indexedDB");
    }

    var request = window.indexedDB.open("mahalo", 1);

    request.onerror = function(e) {
        alert("Error en la colecion de datos : " + e.target.errorCode);
    };

    request.onsuccess = function(e) {
        db = e.target.result;
        db.onerror = function(e) {
            alert("Error en la Colección : " + e.target.errorCode);
            console.dir(e.target);
        };
        loadData();
    };

    function loadData()
    {
        var identificadores = [];
        var cantidadIds = ultimosProductos.length;

        for (var i = 0; i < cantidadIds; i++) {
            identificadores[i] = ultimosProductos[i]['id'];
        }

        var transaccion = db.transaction(["productos"], "readwrite");

        transaccion.oncomplete = function() {
            //console.log("Transacción realizada");
        };

        transaccion.onerror = function(event) {
            console.dir(event);
        };

        var productos = transaccion.objectStore("productos");

        if (productos) {
            var i = 0;
            var registros = [];
            productos.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    registros[i] = cursor.value.id;
                    i = i + 1;
                    cursor.continue();
                } else {
                    for (var j = 0; j < ultimosProductos.length; j++) {
                        if (!registros[j]) {
                            if (ultimosProductos[j].id) {
                                console.log(ultimosProductos);
                                db.transaction(["productos"], "readwrite").objectStore("productos").add({id: parseInt(ultimosProductos[j].id), nombre: ultimosProductos[j].nombre, fecha_vigencia: ultimosProductos[j].fecha_vigencia});
                            }
                        }
                    }
                }
            };
        }
        jQuery("#msj-productos").html("Load IndexedDB...");
    }

    request.onupgradeneeded = function(e)
    {
        var thisDb = e.target.result;

        if (!thisDb.objectStoreNames.contains("productos")) {
            var productos = thisDb.createObjectStore("productos", {
                keyPath: "id",
                autoIncrement: false
            });
            productos.createIndex("buscarNombre", "nombre", {unique: false});
            productos.createIndex("buscarFechaVigencia", "fecha_vigencia", {unique: false});
        }
    };

    return true;
}