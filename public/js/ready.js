const socket = io();

var stats = JSON.parse(localStorage['datatopass']);

console.log(stats)

function sendData() {
    socket.emit("SendEndResult", stats);
    window.location.href = "singlePlayer.html"
}

anychart.onDocumentReady(function () {

  // create a data set
  var data = anychart.data.set([
    ["Wockhardt", stats.WockHolding],
    ["HDFC", stats.HdfcHolding],
    ["TATA", stats.TataHolding],
    ["ONGC", stats.OngcHolding],
    ["Reliance", stats.RelHolding],
    ["Infosys", stats.InfoHolding]
  ]);

  // create a chart
  var chart = anychart.bar();

  // create a bar series and set the data
  var series = chart.bar(data);

  // set the chart title
  chart.title("Your Holdings");

  // set the titles of the axes
  chart.xAxis().title("Company");
  chart.yAxis().title("Shares");

  // set the container id
  chart.container("chartContainer");

  // initiate drawing the chart
  chart.draw();
});