app.factory("__$api", ["$location", "__$ajax", function ($location, __$ajax) {
    var factory = {};
    var apiUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    factory.users = {
        signup: function (query, callback) {
            var apiPath = "/api/users/signup";
            __$ajax.request(apiUrl + apiPath, {method: "POST", data: query}, function (res) {
                callback(res);
            });
        },
        session: function (query, callback) {
            var apiPath = "/api/users/session";
            __$ajax.request(apiUrl + apiPath, {method: "POST", data: query}, function (res) {
                callback(res);
            });
        }
    };

    return factory;
}]);