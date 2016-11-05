app.controller("SigninCtrl", ["$scope", "$location", "__$api", "__$dialog", function ($scope, $location, __$api, __$dialog) {
    $scope.users = {
        userId: "",
        passwd: ""
    };

    $scope.signin = function () {
        var keys = Object.keys($scope.users);
        var message = "";

        for (var i = 0; i < keys.length; i++) {
            if ($scope.users[keys[i]] == "") {
                switch (keys[i]) {
                    case "userId" :
                        message = "아이디를 입력해주세요.";
                        break;
                    case "passwd" :
                        message = "비밀번호 입력해주세요.";
                        break;
                }

                __$dialog.alertDialog("로그인", message);
                return;
            }
        }

        var query = $scope.users;
        query.method = "create";

        __$api.users.session(query, function (res) {
            if (res.status) {
                localStorage.token = res.contents;
                $location.path("/");
            }
            else if (!(res.status) && (res.code == 2 || res.code == 3))
                __$dialog.alertDialog("로그인", "회원이 아니거나 아이디 혹은 비밀번호가 틀렸습니다.");
            else
                __$dialog.alertDialog("로그인", "서버의 문제로 로그인을 실패하였습니다. 관리자에게 문의해주세요.");
        });
    };
}]);