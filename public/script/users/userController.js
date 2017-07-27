(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('userController', userCont);

    function userCont(userFactory, $resource, $localStorage) {
        var user = this;

        user.userLogin = {
            username: '',
            password: ''
        };
        user.login = login;
        user.logout = logout;
        
        user.signIn = true;
        user.username = 'Huy';
        
        console.log('userController');
        
        function login() {
            userFactory.login(user.userLogin)
        }

        function logout() {
            userFactory.logout()
        }

    }

})();
