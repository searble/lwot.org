app.factory("__$ajax", ["$http", function ($http) {
    var factory = {};

    factory.request = function (url, options, callback) {
        options = options || {};

        var defaultOptions = {
            method: "GET",
            data: {},
            stringify: false
        };

        var keys = Object.keys(defaultOptions);

        for (var i = 0; i < keys.length; i++)
            options[keys[i]] = (typeof options[keys[i]] === "undefined") ? defaultOptions[keys[i]] : options[keys[i]];

        if (options.stringify)
            options.data = {data: JSON.stringify(options.data)};

        var reqObj = {
            url: url,
            method: options.method
        };

        if (options.method == "GET" || options.method == "DELETE")
            reqObj.params = options.data;
        else
            reqObj.data = options.data;

        $http(reqObj).success(function (res) {
            callback(res, null);
        }).error(function (res) {
            callback(null, res);
        });
    };

    return factory;
}]);

app.factory("__$dialog", ["$mdDialog", function ($mdDialog) {
    var factory = {};

    factory.alertDialog = function (title, contents, options) {
        options = options || {};

        var defaultOptions = {
            okTitle: "확인",
            callback: function () {
            }
        };

        var keys = Object.keys(defaultOptions);

        for (var i = 0; i < keys.length; i++)
            options[keys[i]] = (typeof options[keys[i]] === "undefined") ? defaultOptions[keys[i]] : options[keys[i]];

        var dialogObj = $mdDialog.alert()
            .title(title)
            .textContent(contents)
            .ok(options.okTitle)
            .clickOutsideToClose(true);

        $mdDialog.show(dialogObj).then(options.callback);
    };

    factory.confirmDialog = function (title, contents, options) {
        options = options || {};

        var defaultOptions = {
            okTitle: "확인",
            cancelTitle: "취소",
            ok: function () {
            },
            cancel: function () {
            }
        };

        var keys = Object.keys(defaultOptions);

        for (var i = 0; i < keys.length; i++)
            options[keys[i]] = (typeof options[keys[i]] === "undefined") ? defaultOptions[keys[i]] : options[keys[i]];

        var dialogObj = $mdDialog.confirm()
            .title(title)
            .textContent(contents)
            .ok(options.okTitle)
            .cancel(options.cancelTitle);

        $mdDialog.show(dialogObj).then(options.ok, options.cancel);
    };

    return factory;
}]);