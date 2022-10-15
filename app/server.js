const express = require('express');
const app = express();
const client = require('prom-client');


// --------------- Default Metrics ---------------
const collectDefaultMetrics = client.collectDefaultMetrics;
// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });


// --------------- Custom Metrics ---------------
const httpRequestsTotal = new client.Counter({
  name: 'http_request_operations_total',
  help: 'Total number of Http requests'
})

const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of Http requests in seconds',
  buckets: [0.1, 0.5, 2, 5, 10]
})


// --------------- Functions ---------------
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.get('/', function (req, res) {
    // Simulate sleep for a random number of milliseconds
    var start = new Date()
    var simulateTime = Math.floor(Math.random() * (10000 - 500 + 1) + 500)

    setTimeout(function(argument) {
      // Simulate execution time
      var end = new Date() - start
      httpRequestDurationSeconds.observe(end / 1000); //convert to seconds
    }, simulateTime)

    httpRequestsTotal.inc();
    res.send('<h1>Hello World!</h1>')
});


// --------------- Start the App ---------------
app.listen(3000, function () {
  console.log("app listening on port 3000!");
});