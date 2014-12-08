var express = require('express'),
    request = require('request'),
    TileifyWMS = require('tileify-wms');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, resp) {
  resp.sendfile('public/index.html');
});

app.get('/tiles/:z/:x/:y', function(req, resp) {
  var z = parseInt(req.params.z, 10);
  var x = parseInt(req.params.x, 10);
  var y = parseInt(req.params.y, 10);

  // pull out proxy query params
  var wms_server_url = req.query.url;
  var redirect = req.query.redirect && req.query.redirect.toLowerCase() !== "false";

  // grab all other query params intended for the wms server
  var url_param_config = req.query;
  delete url_param_config.url;
  delete url_param_config.redirect;

  var tiler = new TileifyWMS(url_param_config);
  var url = tiler.getTileUrl(wms_server_url, x, y, z);

  if (redirect) {
    resp.redirect(url);
  } else {
    req.pipe(request(url)).pipe(resp);
  }
});

app.listen(app.get('port'), function() {
  console.log('Running at port: ' + app.get('port'));
});