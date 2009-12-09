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
            mr.ajax.doAction(action);
        });
        $(document).bind('keydown', 'up', function () { mr.ajax.doAction('ACTION_MOVE_UP'); });
        $(document).bind('keydown', 'down', function () { mr.ajax.doAction('ACTION_MOVE_DOWN'); });
        $(document).bind('keydown', 'left', function () { mr.ajax.doAction('ACTION_MOVE_LEFT'); });
        $(document).bind('keydown', 'right', function () { mr.ajax.doAction('ACTION_MOVE_RIGHT'); }); 
        $(document).bind('keydown', 'return', function () { mr.ajax.doAction('ACTION_SELECT_ITEM'); });                                       
        $(document).bind('keydown', '/', function () { mr.ajax.doAction('ACTION_PARENT_DIR'); }); 
        $(document).bind('keydown', 'backspace', function () { mr.ajax.doAction('ACTION_PREVIOUS_MENU'); }); 
        $(document).bind('keydown', '0', function () { mr.ajax.doAction('REMOTE_0'); });         
        $(document).bind('keydown', '1', function () { mr.ajax.doAction('REMOTE_1'); });
        $(document).bind('keydown', '2', function () { mr.ajax.doAction('REMOTE_2'); });
        $(document).bind('keydown', '3', function () { mr.ajax.doAction('REMOTE_3'); });
        $(document).bind('keydown', '4', function () { mr.ajax.doAction('REMOTE_4'); });
        $(document).bind('keydown', '5', function () { mr.ajax.doAction('REMOTE_5'); });
        $(document).bind('keydown', '6', function () { mr.ajax.doAction('REMOTE_6'); });
        $(document).bind('keydown', '7', function () { mr.ajax.doAction('REMOTE_7'); });
        $(document).bind('keydown', '8', function () { mr.ajax.doAction('REMOTE_8'); });
        $(document).bind('keydown', '9', function () { mr.ajax.doAction('REMOTE_9'); });                                                                 
        $(document).bind('keydown', 's', function () { mr.ajax.doAction('ACTION_STOP'); });        
        $(document).bind('keydown', 'p', function () { mr.ajax.doAction('ACTION_PLAYER_PLAY'); });    
        $(document).bind('keydown', 'h', function () { mr.ajax.doAction('ACTION_PAUSE'); });            
        $(document).bind('keydown', '[', function () { mr.ajax.doAction('ACTION_PREV_ITEM'); }); 
        $(document).bind('keydown', ']', function () { mr.ajax.doAction('ACTION_NEXT_ITEM'); }); 
        $(document).bind('keydown', ',', function () { mr.ajax.doAction('ACTION_PLAYER_REWIND'); }); 
        $(document).bind('keydown', '.', function () { mr.ajax.doAction('ACTION_PLAYER_FORWARD'); }); 
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

// Utils

mr.utils = {

    getActionCode: function(ref) {
        return mr_keymaps.xbmc.actions[ref];
    }

};

// AJAX

mr.ajax = {

    buildUrl: function () {
        //alert('mr.ajax.buildUrl');
        var host = mr.storage.get('server_host');
        var port = mr.storage.get('server_port');
        var username = mr.storage.get('server_username', '');
        var password = mr.storage.get('server_password', '');
        var url = '';
        url = url + 'http://';
        if(username != '') { url = url + username; }
        if(password != '') { url = url + ':' + password; }
        if(username != '') { url = url + '@'; }
        url = url + host + ':' + port + '/';
        url = url + 'xbmcCmds/xbmcHttp?command=';
        return url;
    },

    sendRequest: function (command) {
        //alert('mr.ajax.sendRequest');
        var url = mr.ajax.buildUrl();
        var callUrl = url + command;
        $.get(callUrl, function(data) {});
    },
    
    doAction: function (action) {
        //alert('mr.ajax.doAction');
        var command = 'Action(' + mr.utils.getActionCode(action) + ')';
        mr.ajax.sendRequest(command);        
    }

};
