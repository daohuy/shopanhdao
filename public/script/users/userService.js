(function () {
    'use strict';

    angular
        .module('myApp')
        //.constant("baseURL", "http://localhost:3000/")
        .constant("baseURL", "https://shopanhdao-174606.appspot.com/")
        .factory('userFactory', userFac);

    function userFac(baseURL, $resource, $localStorage, $http, $state, Upload) {
        var userService = {};
        var authToken = undefined;

        userService.login = login;
        userService.logout = logout;
        userService.loadUserCredentials = loadUserCredentials;
        userService.uploadItem = uploadItem;

        return userService;

        // load data user before start page
        function loadUserCredentials() {
            if ($localStorage.userToken) {
                useCredentials($localStorage.userToken)
            }
        }

        function useCredentials(data) {
            authToken = data.token;
            $http.defaults.headers.common['authentication'] = authToken;
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
            $http.defaults.headers.common['authentication'] = authToken;
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

        function uploadItem(files, select, form, id) {
            var image = [];
            var a = '/img/items/' + select + '_' + id + '_';
            for (var i = 0; i < files.length; i++) {
                image.push(a + i + '.jpg');
            }
            form.image = image;
            $resource(baseURL + select)
                .save(form, function (res) {
                    alert('UPLOAD SUCCESS !');
                    uploadFile(files, select, id);
                    $state.go('home.uploadSuccess');
                }, function (res) {
                    console.log(res);
                    alert('UPLOAD FAIL !');
                })

        }

        function uploadFile(files, select, id) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    Upload.rename(files[i], select + '_' + id + '_' + i)
                    Upload.upload({
                        url: 'http://localhost:3000/upload',
                        data: {
                            file: files[i]
                        }
                    }).then(function (res) {
                        console.log('Upload File Success');
                    }, function (res) {
                        console.log('Upload File Fail', res);
                    })
                }
            };
        }

        loadUserCredentials();

    }

})();
