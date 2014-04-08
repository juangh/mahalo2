/*function traerUltimosProductos()
 {
 var id_query = "busqueda_productos";
 var path = 'http://192.168.2.2/des_juan/';
 sql = "select first 10 c_producto, d_producto, f_vigencia_hasta from m_productos order by c_producto desc";
 xmlQueryDB(sql, id_query, 1, false, path);
 ar_status = getStatusDB(id_query);
 var size = ar_status['numrows'] - 1;
 ar_datos = xmlGetRow(id_query, 1, 0);
 var ar_codigos = [], ar_nombres = [], ar_fechas = [];
 var puntos = {};
 
 for (var u = 0; u <= size; u++) {
 ar_codigos[u] = xmlGetRow(id_query, u + 1, 0)['c_producto'];
 ar_nombres[u] = xmlGetRow(id_query, u + 1, 0)['d_producto'];
 ar_fechas[u] = xmlGetRow(id_query, u + 1, 0)['f_vigencia_hasta'];
 puntos[u] = { x : ar_codigos[u], y : ar_nombres[u], z : ar_fechas[u] };
 }
 return puntos;
 }*/

/*function viewProducts()
{
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;

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

        view();
    };

    function view()
    {
        var transaccion = db.transaction(["productos"], "readwrite");

        transaccion.oncomplete = function() {};

        transaccion.onerror = function(event) {
            console.dir(event);
        };

        var productos = transaccion.objectStore("productos");
        
        if (productos) {
            var i = 0;
            var ids = [];
            var nombres = [];
            var fechas = [];
            jQuery("#top-prods > tbody > tr").remove();
            productos.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    ids[i] = cursor.value.id;
                    nombres[i] = cursor.value.nombre;
                    fechas[i] = cursor.value.fecha_vigencia;
                    jQuery("#top-prods").append("<tr><td>" + ids[i] + "</td>" +
                            "<td>" + nombres[i] + "</td>" +
                            "<td>" + fechas[i] + "</td></tr>");

                    i = i + 1;
                    cursor.continue();
                }
            };
        }
    }
}*/

function loadData()
{
    var db = openDatabase("Mahalo", "1.0", "mahalodb", 200000);
    db.transaction(populateDB, errorCB, successCB);
    
    function populateDB(tx)
    {
        tx.executeSql('DROP TABLE IF EXISTS demo');
        tx.executeSql('CREATE TABLE IF NOT EXISTS demo (id unique, data)');
        tx.executeSql('INSERT INTO demo (id, data) VALUES (1, "Dato de prueba 1")');
        tx.executeSql('INSERT INTO demo (id, data) VALUES (2, "Dato de prueba 2")');
    }

    function errorCB(err)
    {
        jQuery("#msj-productos").html("Error processing SQL: " + err.code);
    }

    function successCB()
    {
        jQuery("#msj-productos").html("Base de datos cargada correctamente");
    }
}

function getData()
{
    var db = openDatabase("Mahalo", "1.0", "mahalodb", 200000); 
    jQuery("#top-prods .data-items").remove();
    db.transaction(
        function(tx) {
            tx.executeSql("SELECT id, data FROM demo", [], function(tx,result) {
                jQuery("tr .dataitems").remove();    
                for (var i = 0; i < result.rows.length; i++) {
                        jQuery("#top-prods").append("<tr class='data-items'>" +"<td>" + result.rows.item(i)['id'] + "</td>" +"<td>" + result.rows.item(i)['data'] + "</td>" +"</tr>");
                    }
                }, 
        function() { jQuery("#top-prods").append("<tr><td colspan=\"2\">Error al cargar los registros</td></tr>");jQuery("#top-prods").css("color", "red"); }); }
    );
}