var request = require('request');

var MusixMatch = function(apiKey){
    this.apiKey = apiKey;
    this.baseUrl = 'http://api.musixmatch.com/ws/1.1/';
}

MusixMatch.prototype.request = function(full_url, cb){
    request(full_url ,function(err, req, body){
        if(err) cb(err);
       if(body) cb( JSON.parse(body) );
    });
}
MusixMatch.prototype.postrequest = function(baseurl,uri,params,cb){
    request.post({
        url: baseurl+uri,
        body: params
    } ,function(err, req, body){
        if(err) cb(err);
       if(body) cb(JSON.parse(body));
    });
}
MusixMatch.prototype.buildParams = function(params){
    var _params='?';
    for(var i in params){
        _params += i+'='+params[i]+'&';
    }
    _params += 'apikey='+this.apiKey;
    return _params;
}
MusixMatch.prototype.chart = function(){
    var that = this;
    this.artists = function(){
        this.get = function(params, cb){
            var uri = 'chart.artists.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    },
    this.tracks = function(){
        this.get = function(params, cb){
            var uri = 'chart.tracks.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    }
}
MusixMatch.prototype.track = function(){
    var that = this;
    this.search = function(params,cb){
        var uri= 'track.search';
        var params = that.buildParams(params);
        that.request(that.baseUrl+uri+params,cb);
    },
    this.get = function(){
        var uri= 'track.get';
        var params = that.buildParams(params);
        that.request(that.baseUrl+uri+params,cb);
    },
    this.subtitle = function() {
        this.get = function(params,cb){
            var uri = 'track.subtitle.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    },
    this.lyrics = function(){
        this.get = function(params,cb){
            var uri = 'track.lyrics.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl,uri,params,cb);
        },
        this.post = function(params,cb){
            var uri = 'track.lyrics.post';
            var params = that.buildParams(params);
            that.postrequest(that.baseUrl,uri,params,cb);
        },
        this.feedback = function(){
            this.post = function(params,cb){
                var uri = 'track.feedback.post';
                var params = that.buildParams(params);
                that.postrequest(that.baseUrl,uri,params,cb);
            }
        }
    },
    this.snippet = function(){
        this.get = function(params,cb){
            var uri = 'track.snippet.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    };
    return this;

}
MusixMatch.prototype.matcher = function(){
    var that = this;
    this.lyrics = function(){
        this.get = function(){
            var uri = 'match.lyrics.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    },
    this.track = function(){
        this.get = function(){
            var uri = 'matcher.tracks.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    },
    this.subtitle= function(){
        this.get= function(){

            var uri = 'matcher.subtitle.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    }
    return this;
}
MusixMatch.prototype.artist = function(){
    var that = this;
    this.get = function(){
            var uri = 'artist.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
    },
    this.search = function(){
            var uri = 'artist.search';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
    },
    this.albums = function(){
        this.get = function(){
            var uri = 'artist.albums.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    },
    this.related = function() {
        this.get = function(params,cb){
            var uri = 'artist.related.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    }
    return this;
}
MusixMatch.prototype.album = function(){
    var that = this;
    this.get = function(params,cb){
            var uri = 'album.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
    },
    this.tracks = function() {
        this.get = function(params,cb){
            var uri = 'album.tracks.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    }
    return this;
}
MusixMatch.prototype.tracking = function(){
    var that = this;
    this.url = function(){
        this.get = function(){
            var uri = 'tracking.url.get';
            var params = that.buildParams(params);
            that.request(that.baseUrl+uri+params,cb);
        }
    }
    return this;
}

MusixMatch.prototype.utf8 = function(string){
    return string.toString('utf8');
}

var musix = new MusixMatch('8c5f9546ae78820af62a54c39ab9771c');

search = {};
search.q_lyrics='sunshine';
search.page=1;

musix.track().search(search,function(result){
    console.log(result);
    var tracks = result.message.body.track_list;
    for(var i in tracks){
        console.log(tracks[i])
    }
})







