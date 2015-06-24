'use strict';

(function(){
    var VCAP_SERVICES = <%= ENV["VCAP_SERVICES"] %>;

    
    window.getCfRoute = function(serviceName) {
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                if (instance.name === serviceName) {
                    return location.protocol+'//'+instance.credentials.url;
                }
            }
        }
        window.logger.error('Could not find a url for the service name ' + serviceName);
        return serviceName;
    };
    
    window.getRoutes = function () {
        var routes = {};
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                if(! instance.credentials.uri){
                    continue;
                }
                if(instance.credentials.uri.match(/^http/)){
                    routes[instance.name] = instance.credentials.uri;
                }else{
                    routes[instance.name] = location.protocol + '//' + instance.credentials.uri;
                }
            }
        }
        return routes;
    };

    window.getUaaInfo = function() {
        return {
            uaaServer: '<%= ENV["UAA_SERVER"] %>',
            clientId: '<%= ENV["CLIENT_ID"] %>'
        };
    };

})();
