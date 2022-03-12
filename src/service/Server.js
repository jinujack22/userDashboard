var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getCustomers', function (req, res) {
    fs.readFile(__dirname + "/" + "Customers.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://localhost:", host, port)
})