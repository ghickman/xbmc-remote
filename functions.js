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
            var command = action;
            if(action == "dpad-left") { command = "Action(1)"; } 
            if(action == "dpad-right") { command = "Action(2)"; } 
            if(action == "dpad-up") { command = "Action(3)"; } 
            if(action == "dpad-down") { command = "Action(4)"; } 
            if(action == "page-up") { command = "Action(5)"; } 
            if(action == "page-down") { command = "Action(6)"; }             
            if(action == "select") { command = "Action(7)"; }      
            if(action == "parent-dir") { command = "Action(9)"; } 
            if(action == "previous-menu") { command = "Action(10)"; } 
            if(action == "show-info") { command = "Action(11)"; } 
            if(action == "toggle-gui") { command = "Action(18)"; } 

            if(action == "step-back-small") { command = "Action(21)"; } 
            if(action == "step-forward-small") { command = "Action(20)"; }   
            if(action == "rewind") { command = "Action(78)"; } 
            if(action == "ffwd") { command = "Action(77)"; }                         
            if(action == "previous") { command = "Action(15)"; }
            if(action == "next") { command = "Action(14)"; }
            if(action == "stop") { command = "Action(13)"; }
            if(action == "play") { command = "Action(79)"; }
            if(action == "pause") { command = "Action(12)"; }
            if(action == "mute") { command = "Action(91)"; }
            if(action == "volume-up") { command = "Action(88)"; }                                   
            if(action == "volume-down") { command ="Action(89)"; }
            if(action == "keypad-0") { command ="Action(58)"; }
            if(action == "keypad-1") { command ="Action(59)"; }
            if(action == "keypad-2") { command ="Action(60)"; }
            if(action == "keypad-3") { command ="Action(61)"; }
            if(action == "keypad-4") { command ="Action(62)"; }
            if(action == "keypad-5") { command ="Action(63)"; }
            if(action == "keypad-6") { command ="Action(64)"; }
            if(action == "keypad-7") { command ="Action(65)"; }
            if(action == "keypad-8") { command ="Action(66)"; }
            if(action == "keypad-9") { command ="Action(67)"; }                                                                                                
                        
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
