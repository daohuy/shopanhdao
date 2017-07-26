(function () {
    'user strict';

    angular
        .module('myApp', ['ui.router', 'ngResource', 'ngStorage'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {

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
                        templateUrl: '/viewItems/detail_shirts.html',
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
                        templateUrl: '/viewItems/detail_trousers.html',
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
                }
            })
            //ORDER SUCCESS
            .state('home.success', {
                url : '/success',
                views : {
                    'content@' : {
                        templateUrl : '/viewItems/orderSuccess.html'
                    }
                }
            })
        ;
    }


})();
