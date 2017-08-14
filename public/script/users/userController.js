(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('userController', userCont)
        .controller('uploadController', uploadCont)
        .controller('customerController', customerCont)
    ;

    function userCont(userFactory, $resource, $localStorage) {
        var user = this;

        user.userLogin = {
            username: '',
            password: ''
        };

        user.login = login;
        user.logout = logout;

        if ($localStorage.userToken) {
            console.log('Log IN', $localStorage.userToken.User);
            user.user = $localStorage.userToken.User;
        } else {
            console.log('Log Out');
            user.user = {}
        }

        function login() {
            userFactory.login(user.userLogin)
        }

        function logout() {
            userFactory.logout()
        }

    }

    function uploadCont(userFactory, $resource, $localStorage, itemsFactory) {
        var user = this;
        //items.files ; items.select ; items.form
        user.uploadItems = uploadItems;
        user.test = test;

        function uploadItems() {
            console.log('Upload');
            userFactory.uploadItem(user.files, user.select, user.form, user.form._id);
        }
        
        function test() {
            console.log(itemsFactory.aodaiResource().query());
        }
    }

    function customerCont(userFactory, $stateParams) {
        var user = this;
        
        user.customers = userFactory
            .customerResource()
            .query(function(res) {
                user.customers = res;
                console.log(user.customers);
            }, function(res) {
                console.log(res);
            });
        
        user.customer = userFactory
            .customerResource()
            .get({
                cusId : $stateParams.id 
            }, function(res) {
                user.customer = res;
                console.log(user.customer);
            }, function(res) {
                console.log(res)
            })
        
    }
    
})();
