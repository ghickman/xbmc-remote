// Namespace
var mr = {};

// Cache
mr.cache = {};

// Storage
mr.storage = {
    get: function (key, def) {
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
        localStorage[key] = value;
    }
};

// Initialisation
mr.init = {
    defaultConfig: function () {
        if(mr.storage.get('server_host') === undefined) { mr.storage.set('server_host', 'localhost'); }
        if(mr.storage.get('server_port') === undefined) { mr.storage.set('server_port', '8080'); }
        if(mr.storage.get('server_username') === undefined) { mr.storage.set('server_username', 'xbmc'); }
        if(mr.storage.get('server_password') === undefined) { mr.storage.set('server_password', 'password'); }
    },

    loadConfig: function () {
        mr.init.defaultConfig();
    },

    events: function () {
        // Buttons
        $('.buttonAction').click(function () {
            var button = $(this);
            var action = button.attr('id');
            var success = mr.ajax.doAction(action);
            var statusMsg;
            if(success) {
                statusMsg = 'Successful';
            } else {
                statusMsg = 'Failed';
            };
            $('#status span').html(statusMsg).show().fadeOut();
        });

        // Keyboard
        $(document).bind('keydown', 'p', function () { mr.ajax.doAction('ACTION_PLAYER_PLAY'); });
        $(document).bind('keydown', ',', function () { mr.ajax.doAction('ACTION_PLAYER_REWIND'); });
        $(document).bind('keydown', '.', function () { mr.ajax.doAction('ACTION_PLAYER_FORWARD'); });

    },

    common: function () {
        mr.init.loadConfig();
        mr.init.events();
    },

    popup: function () {
        mr.init.common();
    },

    options: function () {
        mr.init.loadConfig();
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
        var url = mr.ajax.buildUrl();
        var callUrl = url + command;
        var success = false;
        $.ajax({
            type: "GET",
            url: callUrl,
            async: false,
            success: function (data) {
                success = data.indexOf('OK') > 0;
            }
        });
        return success;
    },

    doAction: function (action) {
        //alert('mr.ajax.doAction');
        var command = 'Action(' + mr.utils.getActionCode(action) + ')';
        var request = mr.ajax.sendRequest(command);
        return request;
    }

};
