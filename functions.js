// Namespace

var mr = {};

// Cache

mr.cache = {};

// Storage

mr.storage = {

    get: function (key, def) {
        //alert('mr.storage.get');
        value = localStorage[key];
        if(value) {
            if(value.toLowerCase() == 'true' || value.toLowerCase() == 'yes') { value = true; }
            if(value.toLowerCase() == 'false' || value.toLowerCase() == 'false') { value = false; }
        } else {
            value = def;
        };
        return value;
    },

    set: function (key, value) {
        //alert('mr.storage.set');
        localStorage[key] = value;
    }

};

// Initialisation

mr.init = {

    defaultConfig: function () {
        //alert('mr.init.defaultConfig');
        if(mr.storage.get('server_host') === undefined) { mr.storage.set('server_host', 'localhost'); }
        if(mr.storage.get('server_port') === undefined) { mr.storage.set('server_port', '8080'); }
        if(mr.storage.get('server_username') === undefined) { mr.storage.set('server_username', 'xbmc'); }
        if(mr.storage.get('server_password') === undefined) { mr.storage.set('server_password', 'password'); }        
    },

    loadConfig: function () {
        //alert('mr.init.loadConfig');
        mr.init.defaultConfig();
    },

    events: function () {
        //alert('mr.init.events');
        $('.buttonAction').click(function () {
            var action = $(this).attr('id');
            var action_code = mr_keymaps.xbmc.actions[action];
            var command = 'Action(' + action_code + ')';
            mr.ajax.sendRequest(command);
        });
    },
    
    common: function () {
        //alert('mr.init.common');    
        mr.init.loadConfig();
        mr.init.events();
    },
    
    popup: function () {
        //alert('mr.init.popup');
        mr.init.common();
    },

    options: function () {
        //alert('mr.init.options');
        mr.init.common();
    }

};

// AJAX

mr.ajax = {

    buildUrl: function () {
        //alert('mr.ajax.buildUrl');
        var host = mr.storage.get('server_host');
        var port = mr.storage.get('server_port');
        var url = '';
        url = url + 'http://xbmc:xbmc@';
        url = url + host + ':' + port + '/';
        url = url + 'xbmcCmds/xbmcHttp?command=';
        return url;
    },

    sendRequest: function (command) {
        //alert('mr.ajax.sendRequest');
        var url = mr.ajax.buildUrl();
        var callUrl = url + command;
        $.get(callUrl, function(data) {});
    }

};
