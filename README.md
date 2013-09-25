musixmatch
==========

first whack at a nodejs client for MusixMatch https://developer.musixmatch.com/documentation


each the api endpoints are mapped to a musixMatch function

 ```javascript
var musixMatch = require("./musixmatch.js");
var musix = new musixMatch.MusixMatch('API_KEY_HERE');

musix.track().search({page:1, q:"sunshine"},function(n){
    console.log(n.message.body.track_list);
});
 ```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/adkatrit/musixmatch/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

