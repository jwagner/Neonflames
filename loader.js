(function(){
    window.loader = {};

    loader.Loader = function Loader(root){
        this.root = root || '';
        this.pending = 0;
        this.total = 0;
        this.failed = 0;
        this.resources = {};
    }
    loader.Loader.prototype = {
        load: function(resources) {
            for(var i = 0; i < resources.length; i++) {
                var resource = resources[i];
                // allows loading in multiple stages
                if(resource in this.resources){
                    continue;
                }
                this.pending ++;
                this.total ++;
                if(/\.(jpe?g|gif|png)$/.test(resource)){
                    this._loadImage(resource);
                }
                else if(/\.(og(g|a)|mp3)$/.test(resource)){
                    this._loadAudio(resource);
                }
                else if(/\.json$/.test(resource)){
                    this._loadJSON(resource);
                }
                else {
                    this._loadData(resource);
                }
            }

            if(this.pending === 0 && this.onready){
                var self = this;
                // always call AFTER the mainloop
                // multiple load calls can result in
                // multiple onready() calls!
                window.setTimeout(function () {
                    if(self.onready){
                        self.onready();
                    }
                }, 1);
            }
        },
        onready: null,
        _loadImage: function(src) {
            var self = this;
            var img = document.createElement('img');
            img.onload = function() {
                self._success(src, img);
            }
            img.onerror = function (e) {
                self._error(src, e);
            }
            img.src = this.root + src;
        },
        _loadJSON: function(src){
            var self = this;
            $.getJSON(this.root + src)
                .success(function(data) { self._success(src, data); })
                .error(function(error) { self._error(src, error); });
        },
        _loadData: function(src){
            var self = this;
            $.get(this.root + src)
                .success(function(data) { self._success(src, data); })
                .error(function(error) { self._error(src, error); });
        },
        _success: function(src, data) {
            this.resources[src] = data;
            this.pending --;
            if(this.pending === 0 && this.onready){
                this.onready();
            }
        },
        _error: function(src, error) {
            this.pending --;
            this.failed ++;
            this.resources[src] = null;
            error.src = src;
            throw error;
        }
    };

})();
