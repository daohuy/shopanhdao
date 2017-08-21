(function () {
    'use strict';

    angular
        .module('myApp')
        //.constant("baseURL", "http://localhost:8080/")
        //.constant("baseURL", "http://35.202.183.187:8080/")
        .constant("baseURL", "http://shopanhdao.ml/")
        .factory('userFactory', userFac);

    function userFac(baseURL, $resource, $localStorage, $http, $state, Upload) {
        var userService = {};
        var authToken = undefined;

        userService.login = login;
        userService.logout = logout;
        userService.loadUserCredentials = loadUserCredentials;
        userService.uploadItem = uploadItem;
        userService.customerResource = customerResource;
        userService.removeBill = removeBill;
        userService.delivery = delivery;

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
                    bootbox.alert({
                        message: 'Bạn Đã Đăng Nhập Thành Công !',
                        size: 'small',
                        backdrop: true,
                        callback: function () {
                            $state.transitionTo("home.mainPage", {}, {
                                reload: true
                            });
                        }
                    });
                }, function (res) {
                    console.log(res);
                    bootbox.alert({
                        message: 'ID Không Có Hoặc Sai Mật Khẩu, Xin Mời Thử Lại !',
                        backdrop: true,
                        size: 'small'
                    });
                });
        }
        //clear Data User
        function clearCredentitals() {
            authToken = undefined;
            $http.defaults.headers.common['authentication'] = authToken;
            delete $localStorage.userToken;
            $state.transitionTo('home', {}, {
                reload: true
            });
            //window.location.replace('/'); 
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
                    uploadFile(files, select, id);
                    $state.go('home.uploadSuccess');
                }, function (res) {
                    console.log(res);
                    bootbox.alert({
                        message: 'Đăng Sản Phẩm Thất Bại, Xin Mời Thử Lại Sau !',
                        backdrop: true,
                        size: 'small'
                    });
                })

        }

        function uploadFile(files, select, id) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    Upload.rename(files[i], select + '_' + id + '_' + i)
                    Upload.upload({
                        url: baseURL + 'upload',
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

        function customerResource() {
            return $resource(baseURL + "customer/:cusId", {
                cusId: "@cusId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            })
        }

        function removeBill(id) {
            console.log(id)
            bootbox.confirm({
                message: 'Bạn Có Chắc Là Muốn Xoá Đơn Hàng Này Chứ ?',
                buttons: {
                    confirm: {
                        label: 'Xoá Đi !',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: 'Khoan, Để Suy Nghĩ Lại !',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    console.log(result);
                    if (result == true) {
                        customerResource()
                            .delete({
                                cusId: id
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Đã Xoá Đơn Hàng ' + id,
                                    backdrop: true
                                });
                                $state.transitionTo('home.customer', {}, {
                                    reload: true
                                });
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Xoá Đơn Hàng Thất Bại, Xin Mời Thử Lại !',
                                    backdrop: true
                                });
                            });
                    } else {
                        console.log(result);
                    };

                }
            });
        }

        function delivery(id) {
            console.log(id);

            bootbox.confirm({
                message: 'Bạn Chắc Chắc Đã Giao Hàng Rồi Chứ ?',
                buttons: {
                    confirm: {
                        label: 'Đã Giao Rồi !',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: 'Chưa Để Gọi Cho Shipper Đã !',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    console.log(result);
                    if (result == true) {
                        customerResource().update({
                            cusId: id
                        }, {
                            done: true
                        }, function(res) {
                            bootbox.alert({
                                message : 'Đã Xác Nhận Giao Rồi !',
                                backdrop : true
                            });
                            $state.transitionTo('home.customer', {}, {reload:true});
                        }, function(res) {
                            bootbox.alert({
                                message : 'Xác Nhận Thất Bại, Mời Thử Lại ! ',
                                backdrop : true
                            });
                        });
                    } else {
                        console.log(result);
                    }
                }
            });

        }

        loadUserCredentials();

    }

})();
