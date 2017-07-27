(function () {
    'use strict';

    angular
        .module('myApp')
        .constant("baseURL", "http://localhost:3000/")
        .factory('userFactory', userFac);

    function userFac(baseURL, $resource, $localStorage, $http, $state) {
        var userService = {};
        var authToken = undefined;

        userService.login = login;
        userService.logout = logout;
        userService.loadUserCredentials = loadUserCredentials;

        return userService;

        // load data user before start page
        function loadUserCredentials() {
            if ($localStorage.userToken) {
                useCredentials($localStorage.userToken)
            }
        }

        function useCredentials(data) {
            authToken = data.token;
            $http.defaults.headers['x-access-token'] = authToken;
        }
        // store Data User
        function storeUserCredentials(data) {
            $localStorage.userToken = data;
            useCredentials(data);
        }
        // login User
        function login(loginData) {
            $resource(baseURL + "users/login")
                .save(loginData, function (res) {
                    storeUserCredentials(res);
                    $state.go('home.mainPage');
                    location.reload();
                }, function (res) {
                    alert('Wrong Password');
                });
        }
        //clear Data User
        function clearCredentitals() {
            authToken = undefined;
            $http.defaults.headers.common['x-access-token'] = authToken;
            delete $localStorage.userToken;
            $state.go('home');
            window.location.replace('/');
        }
        //logout user
        function logout() {
            $resource(baseURL + "users/logout")
                .get(function (res) {
                    clearCredentitals();
                });
        }

        loadUserCredentials();

    }

})();
