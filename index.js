var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World! Hello from Jenkins CI/CD test and production!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at 0.0.0.0:5000:" + app.get('port'))
})
