google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawChart);
google.load("visualization", "2", {packages: ["corechart"]});
google.setOnLoadCallback(drawChartPie);
google.load("visualization", "3", {packages: ["corechart"]});
google.setOnLoadCallback(drawChartLine);

function drawChart() {
    var ventasxprod = traerVentas2Prod();
    if (ventasxprod) {
        var gdata = new Array();
        for (var i = 0; i < 10; i++) {
            gdata[i] = [ventasxprod[i]['x'].toString(), parseFloat(ventasxprod[i]['y'])];
        }
    }
    var options = {hAxis: {title: 'Productos'}, gridlines: {color: '#000000'}, backgroundColor: '#78bde7'};
    var data = google.visualization.arrayToDataTable([
        ['Código de barras', 'Número de ventas'],
        gdata[0], gdata[1], gdata[2], gdata[3], gdata[4], gdata[5], gdata[6], gdata[7], gdata[8], gdata[9]]);

    var chart = new google.visualization.ColumnChart(document.getElementById('contenidoGrafica'));
    chart.draw(data, options);
}
function drawChartPie() {
    var ventasxprod = traerVentas2Prod();
    if (ventasxprod) {
        var gdata = new Array();
        for (var i = 0; i < 10; i++) {
            gdata[i] = [ventasxprod[i]['x'].toString(), parseFloat(ventasxprod[i]['y'])];
        }
    }
    var data = google.visualization.arrayToDataTable([
        ['Item', 'Número de ventas'],
        gdata[0], gdata[1], gdata[2], gdata[3], gdata[4], gdata[5], gdata[6], gdata[7], gdata[8], gdata[9]]);
    var options = {backgroundColor: '#78bde7'};
    var chart = new google.visualization.PieChart(document.getElementById('contenidoGrafica'));
    chart.draw(data, options);
}
function drawChartLine() {
    var ventasxprod = traerVentas2Prod();
    if (ventasxprod) {
        var gdata = new Array();
        for (var i = 0; i < 10; i++) {
            gdata[i] = [i.toString(), parseFloat(ventasxprod[i]['y'])];
        }
    }
    var data = google.visualization.arrayToDataTable([
        ['Item', 'Número de ventas'],
        gdata[0], gdata[1], gdata[2], gdata[3], gdata[4], gdata[5], gdata[6], gdata[7], gdata[8], gdata[9]]);
    var options = {backgroundColor: '#78bde7'};
    var chart = new google.visualization.LineChart(document.getElementById('contenidoGrafica'));
    chart.draw(data, options);
}