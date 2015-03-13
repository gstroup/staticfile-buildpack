'use strict';

window.VCAP_SERVICES = <%= ENV["VCAP_SERVICES"] %>;

window.getCfRoute = function(serviceName) {
    for (var serviceId in window.VCAP_SERVICES) {
        var service = window.VCAP_SERVICES[serviceId];
        for (var instanceIndex in service) {
            var instance = service[instanceIndex];
            if (instance.name === serviceName) {
                return instance.credentials.url;
            }
        }
    }
    window.logger.error('Could not find a url for the service name ' + serviceName);
    return serviceName;
};
