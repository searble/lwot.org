app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "/view/jade/main.html"})
        .when("/signin", {templateUrl: "/view/jade/users/signin.html"})
        .when("/signup", {templateUrl: "/view/jade/users/signup.html"})
        .otherwise("/");
}]);