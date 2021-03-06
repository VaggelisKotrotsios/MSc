angular.module('mscApp').controller('usersController',function($scope, $window,  $routeParams, $http , $location, USER_ID) {

    // Register
    $scope.signup = function () {
        var data = $.param({
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            email: $scope.email,
            country: $scope.country,
            city: $scope.city,
            password: $scope.password,
            address: $scope.address,
            action: "signup"
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('./api/users.php', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                if (data.success) {
                    $window.location.href = data.url;
                }
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            })
    };

    // Sign In
    $scope.signin = function () {
        var data = $.param({
            email: $scope.email,
            password: $scope.password,
            action: "login"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('./api/users.php', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                if (data.success) {
                    $window.location.href = data.url;
                }
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    };

    // Get the logged in user
    $scope.getUser = function() {
        $http({
            method: 'GET',
            url: './api/users.php',
            params: { "action" : "user" }

        }).then(function (response) {

            // on success
            $scope.user = response.data;

        }, function (response) {

            // on error
            console.log(response.data,response.status);

        });
    };

    // Get the user profile
    $scope.getProfile = function() {
        $http({
            method: 'GET',
            url: './api/users.php',
            params: { "action" : "profile" , "userId" : $routeParams.id }

        }).then(function (response) {

            // on success
            $scope.bookCase = response.data.data.bookcase;
            $scope.profile = response.data.data.profile;

        }, function (response) {

            // on error
            console.log(response.data,response.status);

        });
    };

    // Get Locations
    $scope.getLocations = function() {
        $http({
            method: 'GET',
            url: './api/users.php',
            params: {
                "action" : "getLocations"
            }

        }).then(function (response) {

            // on success
            $scope.countries = response.data.data.countries;
            $scope.states = response.data.data.states;

        }, function (response) {
            // on error
            console.log(response.data,response.status);

        });
    };

    // logout user
    $scope.logout = function() {
        $http({
            method: 'GET',
            url: './api/users.php',
            params: { "action" : "logout" }

        }).then(function (response) {

            // on success
            $scope.user = response.data;
            $window.location.href = "./";

        }, function (response) {

            // on error
            console.log(response.data,response.status);

        });
    };

    // Add a button action
    $scope.addButtonAction = function (action) {
        var date = new Date();
        date = date.toISOString()
        var data = $.param({
            action: action,
            datestamp: date,
            userId: USER_ID
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('./api/metrics.php', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            })
    };
});