app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "/view/jade/main.html"})
        .when("/signin", {templateUrl: "/view/jade/signin.html"})
        .when("/signup", {templateUrl: "/view/jade/signup.html"})
        .otherwise("/");
}]);