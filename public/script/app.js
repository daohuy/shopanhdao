(function () {
    'user strict';

    angular
        .module('myApp', ['ui.router', 'ngResource', 'ngStorage', 'permission', 'permission.ui', 'ngFileUpload'])
        .run(run)
        .config(config)

    ;

    function config($stateProvider, $urlRouterProvider, ) {

        $urlRouterProvider.otherwise('/home');


        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'header': {
                        templateUrl: '/views/header.html',
                        controller: 'headerController',
                        controllerAs: 'items'
                    },
                    'content': {
                        templateUrl: '/views/content.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    },
                    'footer': {
                        templateUrl: '/views/footer.html'
                    }
                }
            })
            //AODAI
            .state('home.aodai', {
                url: '/aodai',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/menu_aodai.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    }
                }
            })

            .state('home.aodai.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/detail_aodai.html',
                        controller: 'aodaiController',
                        controllerAs: 'items'
                    }
                }
            })
            //DRESS
            .state('home.dress', {
                url: '/dress',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/menu_dress.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    }
                }
            })

            .state('home.dress.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/detail_dress.html',
                        controller: 'dressController',
                        controllerAs: 'items'
                    }
                }
            })
            //SHIRTS
            .state('home.shirts', {
                url: '/shirts',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/menu_shirts.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    }
                }
            })

            .state('home.shirts.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/detail_shirt.html',
                        controller: 'shirtsController',
                        controllerAs: 'items'
                    }
                }
            })
            //TROUSERS
            .state('home.trousers', {
                url: '/trousers',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/menu_trousers.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    }
                }
            })

            .state('home.trousers.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/detail_trouser.html',
                        controller: 'trousersController',
                        controllerAs: 'items'
                    }
                }
            })

            //BUY NOW
            .state('home.buynow', {
                url: '/buy',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/buyNow.html',
                        controller: 'headerController',
                        controllerAs: 'items'
                    }
                },
                data: {
                    permissions: {
                        only: 'isBag'
                    }
                }
            })
            //ORDER SUCCESS
            .state('home.success', {
                url: '/success',
                views: {
                    'content@': {
                        templateUrl: '/viewItems/orderSuccess.html'
                    }
                }
            })
            // USER 
            .state('home.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/login.html',
                        controller: 'userController',
                        controllerAs: 'user'
                    }
                },
                data: {
                    permissions: {
                        only: 'signOut'
                    }
                }
            })
            .state('home.mainPage', {
                url: '/main',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/mainPage.html',
                        controller: 'userController',
                        controllerAs: 'user'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })

            .state('home.listItems', {
                url: '/list',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/menu_items.html',
                        controller: 'itemsController',
                        controllerAs: 'items'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
            
            .state('home.listItems.aodai', {
                url: '/aodai',
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
        
            .state('home.listItems.aodai.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/detail_aodai.html',
                        controller: 'aodaiController',
                        controllerAs: 'items'
                    }
                }
            })
            
            .state('home.listItems.dress', {
                url: '/dress',
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
        
            .state('home.listItems.dress.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/detail_dress.html',
                        controller: 'dressController',
                        controllerAs: 'items'
                    }
                }
            })
            
            .state('home.listItems.shirts', {
                url: '/shirts',
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
        
            .state('home.listItems.shirts.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/detail_shirt.html',
                        controller: 'shirtsController',
                        controllerAs: 'items'
                    }
                }
            })
        
            .state('home.listItems.trousers', {
                url: '/trousers',
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
        
            .state('home.listItems.trousers.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/detail_trouser.html',
                        controller: 'trousersController',
                        controllerAs: 'items'
                    }
                }
            })
        
            .state('home.customer', {
                url: '/customer',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/menu_customer.html',
                        controller: 'customerController',
                        controllerAs: 'user'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })

            .state('home.customer.detail', {
                url: '/:id',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/detail_customer.html',
                        controller: 'customerController',
                        controllerAs: 'user'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })

            .state('home.upload', {
                url: '/upload',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/upload.html',
                        controller: 'uploadController',
                        controllerAs: 'user'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
            .state('home.uploadSuccess', {
                url: '/uploadSuccess',
                views: {
                    'content@': {
                        templateUrl: '/viewUser/uploadSuccess.html'
                    }
                },
                data: {
                    permissions: {
                        only: 'signIn'
                    }
                }
            })
    }

    function run(PermPermissionStore, $localStorage, $http, $rootScope, $state, $anchorScroll) {
        PermPermissionStore.definePermission('isBag', function () {
            if ($localStorage.BAG) {
                return true
            } else {
                return false
            }
        });

        PermPermissionStore.definePermission('signIn', function () {
            if ($localStorage.userToken) {
                return true
            } else {
                return false
            }
        });

        PermPermissionStore.definePermission('signOut', function () {
            if ($localStorage.userToken) {
                return false
            } else {
                return true
            }
        });

        if ($localStorage.userToken) {
            $http.defaults.headers.common['authentication'] = $localStorage.userToken.token;
            //console.log('Token after add $http authentication : ', $http.defaults.headers.common['authentication']);
        }

        /*$rootScope.checkState = function () {
            //console.log($state.current.name);
            if ($state.current.name === 'home') {
                $state.go('home', {}, {
                    reload: true
                });
            }
        }
        */
        // auto scroll toppage
        $rootScope.$on("$locationChangeSuccess", function () {
            $anchorScroll();
        });

    }

})();
