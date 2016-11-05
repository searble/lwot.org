app.controller("SignupCtrl", ["$scope", "$location", "__$api", "__$dialog", function ($scope, $location, __$api, __$dialog) {
    $scope.users = {
        userId: "",
        passwd: "",
        chkPasswd: "",
        email: ""
    };

    $scope.signup = function () {
        var keys = Object.keys($scope.users);
        var message = "";

        for (var i = 0; i < keys.length; i++) {
            if ($scope.users[keys[i]] == "") {
                switch (keys[i]) {
                    case "user_id" :
                        message = "아이디를 입력해주세요.";
                        break;
                    case "passwd" :
                        message = "비밀번호 입력해주세요.";
                        break;
                    case "chkPasswd" :
                        message = "비밀번호 확인을 입력해주세요.";
                        break;
                    case "email" :
                        message = "이메일을 입력해주세요.";
                        break;
                }

                __$dialog.alertDialog("회원가입", message);
                return;
            }
        }

        if ($scope.users.passwd != $scope.users.chkPasswd) {
            __$dialog.alertDialog("회원가입 ", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            $scope.users.passwd = "";
            $scope.users.chkPasswd = "";
            return;
        }
        else if (!((/^[0-9a-zA-Z]([\-\_\.]*[0-9a-zA-Z])*\@[0-9a-zA-Z]([\-\_\.]*[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gim).test($scope.users.email))) {
            __$dialog.alertDialog("회원가입 ", "이메일을 정확히 입력해주세요.");
            $scope.users.email = "";
            return;
        }
        else if ($scope.users.user_id.length > 24) {
            __$dialog.alertDialog("회원가입 ", "아이디가 24자를 초과하였습니다.");
            $scope.users.user_id = "";
            return;
        }

        __$api.users.signup($scope.users, function (res) {
            if (res.status) {
                __$dialog.alertDialog("회원가입", "회원가입이 완료되었습니다.", {
                    callback: function () {
                        $location.path("/users/signin");
                    }
                });
            }
            else {
                if (res.code == 2)
                    __$dialog.alertDialog("회원가입", "이미 존재하는 아이디입니다.");
                else
                    __$dialog.alertDialog("회원가입", "회원가입을 실패하였습니다. 관리자에게 문의해주세요.");
            }
        });
    };
}]);
