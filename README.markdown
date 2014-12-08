## Tileify WMS Proxy

This is a node application that uses [tileify-wms](https://github.com/JasonSanford/tileify-wms) to create a simple proxy for serving up WMS map services as map tiles that can be easily added to any slippy map (Leaflet, OpenLayers, Google Maps).

[View a demo](http://tileify-wms.herokuapp.com/)

### Install - Run

```
cd /path/to/tileify-wms-proxy
npm install
npm start
```

### Deployment

#### The Easy Way

Click this button.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/JasonSanford/tileify-wms-proxy)

#### The Slightly Harder But Still Really Easy Way

The `Procfile` makes this application easy to deploy to [heroku](https://www.heroku.com/).

```
cd /path/to/tileify-wms-proxy
heroku create
git push heroku master
```

### Usage

After running your application visit the application root (`http://localhost:5000/`) for some documentation and an interactive demo.

The tiling proxy can be found at `http://localhost:5000/tiles/{z}/{x}/{y}`. Those funny looking letters are placholders for the tiles located at specific zoom levels and coordinates. Your [mapping library](http://leafletjs.com/reference.html#tilelayer) should automatically replace these with actual values at runtime.

There is one required URL parameter to add, `url`. This is the WMS map service.

This value you add to the URL **should be URL encoded!**

You can URL encode by doing:

```javascript
var wms_url = 'http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer';
var encoded = encodeURIComponent(wms_url);
console.log(encoded);
// http%3A%2F%2Fgis.srh.noaa.gov%2Farcgis%2Fservices%2FNDFDTemps%2FMapServer%2FWMSServer
```

An example URL looks like:

    http://localhost:5000/{z}/{x}/{y}?url=http%3A%2F%2Fgis.srh.noaa.gov%2Farcgis%2Fservices%2FNDFDTemps%2FMapServer%2FWMSServer

#### Additional URL Parameters

In addition to the required `url` URL parameter, you can also pass a `&redirect=true` parameter that will perform an HTTP redirect to the map server instead of serving it itself.

Also accepted are any [WMS URL parameters](http://docs.geoserver.org/stable/en/user/services/wms/reference.html) supported by your WMS server. This software makes no attempt to enforce the (somewhat confusing) WMS URL parameters across the various versions implemented in the wild. But good luck!

I've deployed an instance of this application at Heroku. You're free to use it as you wish. In the examples above just use the `tileify-wms.herokuapp.com` domain instead of `localhost:5000`.

http://tileify-wms.herokuapp.com
