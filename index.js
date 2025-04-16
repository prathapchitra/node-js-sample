var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Stanford capital is leading outsourcing firm based in Mumbai and UAE. We are solution providers in the areas of Finance and Accounts, compliance expertise, Information Technology, Human Resources and Business Process Outsourcing. We strive to provide innovative and practical solutions that can be easily implemented. As a solution provider, we empathize with our clients and prioritize understanding their business and tackling their challenges as if they were our own. !')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at 0.0.0.0:5000:" + app.get('port'))
})
