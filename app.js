var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');
//var engines = require('consolidate');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/views')))
// view engine setup
app.set('views', path.join(__dirname + 'views'));
app.engine('html', require('ejs').renderFile);
//app.engine('html', engines.mustache);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
var responseString = '';
app.post('/q', function(req, res) {
  console.log(req.body.select2);
var drug_name = req.body.search;
console.log(req.body.radSize);
var api_path = selectDatabase(req.body.select2,req.body.search, req.body.search2, req.body.radSize);
 var jsonString = {"widget": {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": {
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
}};
//var string = "{'key':'value'}";
//var obj = JSON.parse(string);
//var responseObject = JSON.stringify(jsonString);
performRequest(res, drug_name, api_path);
//console.log("JJJJJ " + responseString);
//res.send(JSON.stringify(responseString));
});
function selectDatabase(databaseSelected, drug_searched, twoside_secondary_drug, isdrugName){
  var path = "";
  switch (databaseSelected) {
    case "fda":
      if(isdrugName == "drugname")
        path = '/ade_starai_webapi-1.0/fda_ade/?drug_name='+ drug_searched;
      else {
        path = '/ade_starai_webapi-1.0/fda_ade/di/?drug_indication='+ drug_searched;
      }
      break;
    case "os":
      path = '/ade_starai_webapi-1.0/offsides_ade/?drug_name='+ drug_searched;
      break;
    case "ts":
      path = '/ade_starai_webapi-1.0/twosides_ade/?drug_pairs='+ drug_searched + "::" + twoside_secondary_drug;
      break;
    case "mc":
      path = '/ade_starai_webapi-1.0/medcanada_ade/?drug_name='+ drug_searched;
      break;
    default:
      path = '/ade_starai_webapi-1.0/fda_ade/?drug_name='+ drug_searched;
      break;
  }
    return path;
}
function performRequest(response , drug_name, api_path) {
  // var dataString = JSON.stringify(data);
  // var headers = {};
  //
  // if (method == 'GET') {
  //   endpoint += '?' + querystring.stringify(data);
  // }
  // else {
  //   headers = {
  //     'Content-Type': 'application/json',
  //     'Content-Length': dataString.length
  //   };
  // }
  // var options = {
  //   host: host,
  //   path: endpoint,
  //   method: method,
  //   headers: headers
  // };
console.log(api_path);
var options = {
  host: "nils.soic.indiana.edu",
  port: 8080,
  path: api_path,
  method: 'GET'
};

var req = http.request(options, (res) => {
  responseString = '';
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', function(data) {
      responseString += data;
    });
  res.on('end', () => {
    console.log('No more data in response.');
    //console.log(responseString);
    //console.log("JJJJJ " + responseString);
    response.send(JSON.stringify(responseString));

  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});
req.end();
}
module.exports = app;
